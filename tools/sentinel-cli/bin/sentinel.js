#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SKILLS_REGISTRY = path.join(ROOT, 'extensions', 'registry', 'skills.json');
const AGENTS_REGISTRY = path.join(ROOT, 'extensions', 'registry', 'agents.json');
const TASK_MAP = path.join(ROOT, 'extensions', 'resolver', 'task-classification-map.json');
const SENTINEL_IDENTITY_FILE = path.join(ROOT, '.sentinel-ai', 'main', 'sentinel-identity.json');
const VALID_RISK_LEVELS = new Set(['low', 'medium', 'high']);
const RESERVED_ACTIVATION_NAMES = new Set([
  'sentinel',
  'setup-name',
  'identity',
  'install',
  'import',
  'resolve',
  'list',
  'help'
]);
const ACTIVATION_GREETINGS = ['hey', 'hi', 'hello', 'yo', 'ask'];
const STANDARD_SECTIONS = [
  'Purpose',
  'When to Use',
  'Inputs Needed',
  'Procedure',
  'Output Format',
  'Safety / Scope Rules',
  'Sentinel Governance Rules'
];

function banner() {
  return 'Sentinel CLI v1.0.0 | Core rules still win. Extensions are optional. Resolver is advisory. Imported skills cannot override Sentinel governance.';
}

function output(message) {
  process.stdout.write(`${message}\n`);
}

function error(message) {
  process.stderr.write(`${message}\n`);
}

function fail(message) {
  error(banner());
  error(`Error: ${message}`);
  process.exit(1);
}

function checkRepoRoot() {
  const sentinelCore = path.join(ROOT, '.sentinel-ai');
  const extensionsDir = path.join(ROOT, 'extensions');
  if (!fs.existsSync(sentinelCore)) {
    throw new Error('Missing .sentinel-ai/. Run this command from a Sentinel AI repository.');
  }
  if (!fs.existsSync(extensionsDir)) {
    throw new Error('Missing extensions/. This CLI requires the extension ecosystem scaffold.');
  }
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new Error(`Unable to read JSON from ${path.relative(ROOT, file)}: ${err.message}`);
  }
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeActivationDisplayName(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeActivationName(value) {
  return normalizeActivationDisplayName(value).toLowerCase();
}

function getSentinelIdentityPath() {
  return process.env.SENTINEL_IDENTITY_FILE
    ? path.resolve(process.env.SENTINEL_IDENTITY_FILE)
    : SENTINEL_IDENTITY_FILE;
}

function readSentinelIdentity() {
  const file = getSentinelIdentityPath();
  if (!fs.existsSync(file)) {
    return null;
  }

  const data = readJson(file);
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`Invalid Sentinel identity config in ${path.relative(ROOT, file)}: expected an object`);
  }

  const identity = data.sentinel_identity;
  if (!identity || typeof identity !== 'object' || Array.isArray(identity)) {
    throw new Error(`Invalid Sentinel identity config in ${path.relative(ROOT, file)}: missing sentinel_identity`);
  }

  return identity;
}

function validateActivationName(value) {
  const displayName = normalizeActivationDisplayName(value);
  if (!displayName) {
    throw new Error('Activation name must not be empty.');
  }
  if (displayName.length > 32) {
    throw new Error('Activation name must be 32 characters or fewer.');
  }
  if (!/^[A-Za-z0-9 _-]+$/.test(displayName)) {
    throw new Error('Activation name may only contain letters, numbers, spaces, hyphen, and underscore.');
  }

  const normalizedName = normalizeActivationName(displayName);
  if (!normalizedName) {
    throw new Error('Activation name must not be empty.');
  }
  if (RESERVED_ACTIVATION_NAMES.has(normalizedName)) {
    throw new Error(`Activation name "${displayName}" conflicts with a reserved system command.`);
  }
  if (normalizedName === 'sentinel') {
    throw new Error('Activation name "sentinel" is reserved. Choose a more specific name.');
  }

  return {
    displayName,
    normalizedName
  };
}

function saveSentinelIdentity(value) {
  checkRepoRoot();
  const { displayName, normalizedName } = validateActivationName(value);
  const file = getSentinelIdentityPath();
  const existing = fs.existsSync(file) ? readSentinelIdentity() : null;
  const now = new Date().toISOString();

  fs.mkdirSync(path.dirname(file), { recursive: true });
  writeJson(file, {
    sentinel_identity: {
      activation_name: displayName,
      normalized_activation_name: normalizedName,
      created_at: existing && existing.created_at ? existing.created_at : now,
      updated_at: now
    }
  });

  return readSentinelIdentity();
}

function normalizeInputForActivation(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function activationNamePattern(normalizedName) {
  return escapeRegex(normalizedName).replace(/ /g, '\\s+');
}

function extractActivationMatch(text, regex, trigger) {
  const match = String(text || '').match(regex);
  if (!match) {
    return null;
  }

  return {
    activated: true,
    trigger,
    matchedText: match[0].trim(),
    remainingText: String(match[1] || '').trim()
  };
}

function detectActivationInput(inputText, identity) {
  const normalizedInput = normalizeInputForActivation(inputText);
  if (!normalizedInput) {
    return {
      activated: false,
      trigger: null,
      matchedText: '',
      remainingText: ''
    };
  }

  const canonical = extractActivationMatch(
    normalizedInput,
    /^activate\s+sentinel\s+ai(?:\s+(.*))?$/,
    'canonical'
  );
  if (canonical) {
    return canonical;
  }

  if (!identity || !identity.normalized_activation_name) {
    return {
      activated: false,
      trigger: null,
      matchedText: '',
      remainingText: ''
    };
  }

  const name = activationNamePattern(identity.normalized_activation_name);
  const patterns = [
    { regex: new RegExp(`^${name}$`), trigger: 'custom-name' },
    { regex: new RegExp(`^(?:${ACTIVATION_GREETINGS.join('|')})\\s+${name}(?:\\s+(.*))?$`), trigger: 'custom-greeting' },
    { regex: new RegExp(`^${name}\\s+activate(?:\\s+(.*))?$`), trigger: 'custom-name-activate' },
    { regex: new RegExp(`^activate\\s+${name}(?:\\s+(.*))?$`), trigger: 'custom-activate-name' }
  ];

  for (const pattern of patterns) {
    const result = extractActivationMatch(normalizedInput, pattern.regex, pattern.trigger);
    if (result) {
      return result;
    }
  }

  return {
    activated: false,
    trigger: null,
    matchedText: '',
    remainingText: ''
  };
}

async function promptForActivationName() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const answer = await new Promise((resolve) => {
      rl.question('What name should activate Sentinel AI? ', resolve);
    });
    return answer;
  } finally {
    rl.close();
  }
}

function parseFrontMatter(contents) {
  const trimmed = contents.replace(/^\uFEFF/, '');
  const match = trimmed.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*/);
  if (!match) {
    return {};
  }

  const metadata = {};
  const lines = match[1].split(/\r?\n/);
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) {
      metadata[key] = value;
    }
  }
  return metadata;
}

function isKebabCase(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function containsUnsafePath(content) {
  return /(?:[A-Za-z]:\\|\/(?:Users|home|root)\/|\/(?:Users|home|root)|~\/)/.test(content);
}

function containsPrivatePlaceholder(content) {
  return /(api[_-]?key|secret|token|password|private[_-]?key|sk-[A-Za-z0-9]{16,})/i.test(content);
}

function validateSkillMetadata(metadata, filePath) {
  const name = String(metadata.name || '').trim();
  const description = String(metadata.description || '').trim();
  const riskLevel = normalize(metadata.riskLevel || '');
  const warnings = [];

  if (!name) {
    throw new Error(`Invalid skill metadata in ${path.relative(ROOT, filePath)}: missing name`);
  }
  if (!isKebabCase(name)) {
    throw new Error(`Invalid skill metadata in ${path.relative(ROOT, filePath)}: name must be kebab-case`);
  }
  if (!description) {
    throw new Error(`Invalid skill metadata in ${path.relative(ROOT, filePath)}: missing description`);
  }
  if (metadata.riskLevel && !VALID_RISK_LEVELS.has(riskLevel)) {
    throw new Error(`Invalid skill metadata in ${path.relative(ROOT, filePath)}: riskLevel must be low, medium, or high`);
  }

  if (!metadata.version) {
    warnings.push('Missing recommended metadata: version');
  }
  if (!metadata.riskLevel) {
    warnings.push('Missing recommended metadata: riskLevel');
  }
  if (!metadata.inputsRequired) {
    warnings.push('Missing recommended metadata: inputsRequired');
  }
  if (metadata.sentinelCompatible === undefined) {
    warnings.push('Missing recommended metadata: sentinelCompatible');
  }

  return {
    metadata: {
      name,
      description,
      version: String(metadata.version || '0.1.0').trim() || '0.1.0',
      riskLevel: riskLevel || 'medium',
      inputsRequired: Array.isArray(metadata.inputsRequired) ? metadata.inputsRequired : [],
      sentinelCompatible: metadata.sentinelCompatible === true || normalize(metadata.sentinelCompatible) === 'true'
    },
    warnings
  };
}

function validateSkillContents(contents, filePath) {
  if (contents.includes('.sentinel-ai') && /(override|bypass|replace|take over)/i.test(contents)) {
    throw new Error(`Invalid skill contents in ${path.relative(ROOT, filePath)}: skills cannot override .sentinel-ai`);
  }
  if (containsUnsafePath(contents)) {
    throw new Error(`Invalid skill contents in ${path.relative(ROOT, filePath)}: contains absolute or unsafe system paths`);
  }
  if (containsPrivatePlaceholder(contents)) {
    throw new Error(`Invalid skill contents in ${path.relative(ROOT, filePath)}: contains obvious private data placeholders`);
  }
}

function validateSkill(skillPath) {
  const absSkillPath = path.isAbsolute(skillPath) ? skillPath : path.join(ROOT, skillPath);
  if (!fs.existsSync(absSkillPath)) {
    throw new Error(`Missing skill path: ${path.relative(ROOT, absSkillPath)}`);
  }

  const skillFile = fs.statSync(absSkillPath).isDirectory()
    ? path.join(absSkillPath, 'SKILL.md')
    : absSkillPath;

  if (!fs.existsSync(skillFile)) {
    throw new Error(`Missing SKILL.md at ${path.relative(ROOT, skillFile)}`);
  }

  const contents = fs.readFileSync(skillFile, 'utf8');
  validateSkillContents(contents, skillFile);
  const { metadata, warnings } = validateSkillMetadata(parseFrontMatter(contents), skillFile);

  return { skillFile, metadata, warnings };
}

function ensureRegistrySkill(entry) {
  if (!entry || entry.type !== 'skill') {
    throw new Error('Requested registry entry is not a skill.');
  }

  const absPath = path.join(ROOT, entry.path);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Registered skill path does not exist: ${entry.path}`);
  }

  const { metadata, warnings } = validateSkill(absPath);
  const normalizedRegistryName = normalize(entry.name);
  const normalizedMetadataName = normalize(metadata.name);
  if (normalizedRegistryName !== normalizedMetadataName) {
    throw new Error(`Skill metadata name mismatch for ${entry.name}`);
  }

  return { absPath, metadata, warnings };
}

function loadSkillsRegistry() {
  checkRepoRoot();
  return readJson(SKILLS_REGISTRY);
}

function loadTaskMap() {
  checkRepoRoot();
  return readJson(TASK_MAP);
}

function loadAgentRegistry() {
  checkRepoRoot();
  return readJson(AGENTS_REGISTRY);
}

function showSafetyReminder() {
  output(banner());
}

function getSkillSource(entryPath) {
  return 'sentinel-native';
}

function listSkills() {
  const skills = loadSkillsRegistry();
  const rows = skills.map((entry) => ({
    name: entry.name,
    type: entry.type,
    source: entry.source || getSkillSource(entry.path),
    status: entry.status || 'unknown',
    riskLevel: entry.riskLevel || 'unknown',
    path: entry.path,
    description: entry.description
  }));

  showSafetyReminder();
  output('Available skills:');
  output('name | type | source | status | riskLevel | path | description');
  for (const row of rows) {
    output(`${row.name} | ${row.type} | ${row.source} | ${row.status} | ${row.riskLevel} | ${row.path} | ${row.description}`);
  }
}

function parseInstallOptions(args) {
  const options = {
    dryRun: false,
    force: false,
    source: 'registry',
    type: null,
    name: null
  };

  const positional = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (arg === '--force') {
      options.force = true;
      continue;
    }
    if (arg === '--source') {
      const value = args[++i];
      if (!value) {
        throw new Error('Missing value for --source');
      }
      options.source = value;
      continue;
    }
    if (arg === '--type') {
      const value = args[++i];
      if (!value) {
        throw new Error('Missing value for --type');
      }
      options.type = value;
      continue;
    }
    if (arg === '--name') {
      const value = args[++i];
      if (!value) {
        throw new Error('Missing value for --name');
      }
      options.name = value;
      continue;
    }
    positional.push(arg);
  }

  return { options, positional };
}

function buildRegistryEntry(metadata, targetPath, type) {
  return {
    name: metadata.name,
    type: 'skill',
    version: metadata.version || '0.1.0',
    status: 'active',
    path: path.posix.join(targetPath.replace(/\\/g, '/'), 'SKILL.md'),
    description: metadata.description,
    riskLevel: metadata.riskLevel || 'medium',
    inputsRequired: Array.isArray(metadata.inputsRequired) ? metadata.inputsRequired : [],
    sentinelCompatible: true,
    source: 'sentinel-native'
  };
}

function ensureSafeTargetPath(targetPath) {
  const resolved = path.resolve(targetPath);
  const relative = path.relative(ROOT, resolved);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Unsafe target path: ${targetPath}`);
  }
  return resolved;
}

function removeDirectoryRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function copyDirectorySafe(sourceDir, targetDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySafe(sourcePath, targetPath);
      continue;
    }

    if (entry.isSymbolicLink()) {
      throw new Error(`Refusing to copy symlink: ${path.relative(ROOT, sourcePath)}`);
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
}

function writeSkillsRegistry(nextSkills) {
  fs.writeFileSync(SKILLS_REGISTRY, `${JSON.stringify(nextSkills, null, 2)}\n`);
}

function upsertRegistryEntry(entry, force) {
  const skills = readJson(SKILLS_REGISTRY);
  const index = skills.findIndex((item) => normalize(item.name) === normalize(entry.name));

  if (index >= 0 && !force) {
    throw new Error(`Skill registry entry already exists for ${entry.name}. Use --force to update.`);
  }

  const nextEntry = {
    name: entry.name,
    type: entry.type,
    version: entry.version,
    status: entry.status,
    path: entry.path,
    description: entry.description,
    riskLevel: entry.riskLevel,
    inputsRequired: entry.inputsRequired,
    sentinelCompatible: entry.sentinelCompatible
  };

  if (index >= 0) {
    skills[index] = nextEntry;
  } else {
    skills.push(nextEntry);
  }

  writeSkillsRegistry(skills);
}

function printWarnings(warnings) {
  for (const warning of warnings) {
    output(`Warning: ${warning}`);
  }
}

function normalizeTaskText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeTask(text) {
  const normalized = normalizeTaskText(text);
  if (!normalized) {
    return [];
  }
  return [...new Set(normalized.split(' ').filter(Boolean))];
}

function riskRank(level) {
  const normalized = normalize(level);
  if (normalized === 'low') {
    return 0;
  }
  if (normalized === 'medium') {
    return 1;
  }
  return 2;
}

function riskLabelFromRank(rank) {
  if (rank <= 0) {
    return 'low';
  }
  if (rank === 1) {
    return 'medium';
  }
  return 'high';
}

function isComplexTask(taskText) {
  const normalized = normalizeTaskText(taskText);
  const complexTerms = [
    'refactor',
    'database',
    'auth',
    'security',
    'architecture',
    'migration',
    'payment',
    'production',
    'deploy'
  ];
  return complexTerms.some((term) => normalized.includes(term));
}

function loadOptionalRegistryArray(file, label, warnings) {
  if (!fs.existsSync(file)) {
    warnings.push(`Warning: Optional registry missing: ${label}`);
    return [];
  }

  const data = readJson(file);
  if (!Array.isArray(data)) {
    throw new Error(`Invalid registry format in ${path.relative(ROOT, file)}: expected an array`);
  }
  return data;
}

function loadResolverInputs() {
  checkRepoRoot();

  if (!fs.existsSync(TASK_MAP)) {
    throw new Error(`Required task classification map is missing: ${path.relative(ROOT, TASK_MAP)}`);
  }

  const warnings = [];
  const taskMap = readJson(TASK_MAP);
  if (!taskMap || typeof taskMap !== 'object' || Array.isArray(taskMap)) {
    throw new Error(`Invalid task classification map in ${path.relative(ROOT, TASK_MAP)}: expected an object`);
  }

  const skills = loadOptionalRegistryArray(SKILLS_REGISTRY, 'skills registry', warnings);
  const agents = loadOptionalRegistryArray(AGENTS_REGISTRY, 'agents registry', warnings);
  const extensions = loadOptionalRegistryArray(path.join(ROOT, 'extensions', 'registry', 'extensions.json'), 'extensions registry', warnings);

  return {
    taskMap,
    skills,
    agents,
    extensions,
    warnings
  };
}

function buildRegistryCandidate(entry, registryKind) {
  const type = entry.type || (registryKind === 'extensions' ? 'extension' : registryKind === 'agents' ? 'agent' : 'skill');
  const source = entry.source || (registryKind === 'extensions' ? 'registry' : 'sentinel-native');
  const status = normalize(entry.status || 'active') || 'active';
  const pathValue = entry.path || '';
  const pathExists = pathValue ? fs.existsSync(path.join(ROOT, pathValue)) : false;

  return {
    name: entry.name,
    type,
    source,
    path: pathValue,
    description: entry.description || '',
    riskLevel: normalize(entry.riskLevel || 'medium') || 'medium',
    status,
    pathExists,
    registryKind
  };
}

function buildTaskSignals(taskMap, taskText) {
  const normalizedTask = normalizeTaskText(taskText);
  const signals = [];

  for (const [key, rule] of Object.entries(taskMap)) {
    const keywords = Array.isArray(rule.keywords) ? rule.keywords : [];
    const matchedKeywords = keywords
      .map((keyword) => String(keyword || '').trim())
      .filter(Boolean)
      .filter((keyword) => normalizedTask.includes(normalizeTaskText(keyword)));

    if (matchedKeywords.length > 0) {
      signals.push({
        key,
        riskLevel: normalize(rule.riskLevel || 'low') || 'low',
        recommendedExtensions: Array.isArray(rule.recommendedExtensions) ? rule.recommendedExtensions : [],
        matchedKeywords
      });
    }
  }

  signals.sort((a, b) => riskRank(a.riskLevel) - riskRank(b.riskLevel));
  return signals;
}

function scoreRegistryCandidate(candidate, taskText, taskTokens, taskSignals) {
  const normalizedTask = normalizeTaskText(taskText);
  const candidateName = normalizeTaskText(candidate.name);
  const candidateDescription = normalizeTaskText(candidate.description);
  const candidateNameTokens = tokenizeTask(candidate.name);
  const candidateDescriptionTokens = tokenizeTask(candidate.description);

  let score = 0;
  const reasons = [];
  let exactNameMatch = false;
  const matchedKeywords = [];

  if (candidateName && normalizedTask === candidateName) {
    score += 6;
    exactNameMatch = true;
    reasons.push('exact name match');
  } else if (candidateName && normalizedTask.includes(candidateName)) {
    score += 4;
    exactNameMatch = true;
    reasons.push('name match');
  }

  const matchedNameTokens = candidateNameTokens.filter((token) => taskTokens.includes(token));
  if (matchedNameTokens.length > 0) {
    score += matchedNameTokens.length * 2;
    reasons.push(`name tokens: ${matchedNameTokens.join(', ')}`);
  }

  const matchedDescriptionTokens = taskTokens.filter((token) => candidateDescriptionTokens.includes(token));
  if (matchedDescriptionTokens.length > 0) {
    score += Math.min(3, matchedDescriptionTokens.length);
    reasons.push(`description tokens: ${matchedDescriptionTokens.join(', ')}`);
  }

  for (const signal of taskSignals) {
    const recommended = signal.recommendedExtensions.map((name) => normalizeTaskText(name));
    if (recommended.includes(candidateName)) {
      score += 8;
      matchedKeywords.push(...signal.matchedKeywords);
      reasons.push(`recommended by ${signal.key}`);
    }

    const signalKeywords = signal.matchedKeywords.map((keyword) => normalizeTaskText(keyword));
    const hits = signalKeywords.filter((keyword) => {
      return (
        candidateName.includes(keyword) ||
        candidateDescription.includes(keyword) ||
        candidateNameTokens.includes(keyword) ||
        candidateDescriptionTokens.includes(keyword)
      );
    });

    if (hits.length > 0) {
      score += hits.length * 2;
      matchedKeywords.push(...hits);
    }
  }

  if (candidate.status === 'active') {
    // active status is handled as a tie-breaker during ranking
  }

  return {
    ...candidate,
    score,
    exactNameMatch,
    matchedKeywords: [...new Set(matchedKeywords)],
    reasons: [...new Set(reasons)]
  };
}

function summarizeCandidateReason(candidate) {
  if (candidate.reasons.includes('exact name match')) {
    return `matched registry name ${candidate.name}`;
  }

  if (candidate.reasons.some((reason) => reason.startsWith('recommended by'))) {
    const keywords = candidate.matchedKeywords.length > 0 ? candidate.matchedKeywords.join(' + ') : candidate.name;
    return `matched ${keywords} keywords`;
  }

  if (candidate.reasons.some((reason) => reason.startsWith('name tokens'))) {
    const keywords = candidate.reasons
      .filter((reason) => reason.startsWith('name tokens'))
      .map((reason) => reason.replace('name tokens: ', ''))
      .join(', ');
    return `matched registry name tokens ${keywords}`;
  }

  if (candidate.reasons.some((reason) => reason.startsWith('description tokens'))) {
    const keywords = candidate.reasons
      .filter((reason) => reason.startsWith('description tokens'))
      .map((reason) => reason.replace('description tokens: ', ''))
      .join(', ');
    return `matched description terms ${keywords}`;
  }

  return `matched registry entry ${candidate.name}`;
}

function resolveRegistryAware(taskText, explain) {
  const { taskMap, skills, agents, extensions, warnings } = loadResolverInputs();
  const taskTokens = tokenizeTask(taskText);
  const taskSignals = buildTaskSignals(taskMap, taskText);
  const registryCandidates = [
    ...skills.map((entry) => buildRegistryCandidate(entry, 'skills')),
    ...agents.map((entry) => buildRegistryCandidate(entry, 'agents')),
    ...extensions.map((entry) => buildRegistryCandidate(entry, 'extensions'))
  ];

  const scoredCandidates = registryCandidates.map((candidate) =>
    scoreRegistryCandidate(candidate, taskText, taskTokens, taskSignals)
  );

  scoredCandidates.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const aExact = a.exactNameMatch ? 1 : 0;
    const bExact = b.exactNameMatch ? 1 : 0;
    if (bExact !== aExact) {
      return bExact - aExact;
    }
    const aActive = a.status === 'active' ? 1 : 0;
    const bActive = b.status === 'active' ? 1 : 0;
    if (bActive !== aActive) {
      return bActive - aActive;
    }
    const aRisk = riskRank(a.riskLevel);
    const bRisk = riskRank(b.riskLevel);
    if (aRisk !== bRisk) {
      return aRisk - bRisk;
    }
    return a.name.localeCompare(b.name);
  });

  const best = scoredCandidates[0] || null;
  const bestScore = best ? best.score : 0;
  const tiedCandidates = scoredCandidates.filter((candidate) => candidate.score === bestScore && bestScore > 0);
  const hasTie = tiedCandidates.length > 1;

  const matchedRuleRisks = taskSignals.map((signal) => signal.riskLevel);
  const strongestRuleRisk = matchedRuleRisks.reduce((current, next) => (riskRank(next) > riskRank(current) ? next : current), 'low');
  const complex = isComplexTask(taskText);

  let resolvedRisk = best
    ? (riskRank(best.riskLevel) >= riskRank(strongestRuleRisk) ? best.riskLevel : strongestRuleRisk)
    : strongestRuleRisk;
  if (!best && complex) {
    resolvedRisk = 'medium';
  }
  if (!best && !taskSignals.length && !complex) {
    resolvedRisk = 'low';
  }

  let mode = riskRank(resolvedRisk) === 0 ? 'Light' : 'Architect';
  if (complex) {
    mode = 'Architect';
  }

  const noMatch = !best || bestScore <= 0;

  const approvalNeeded = Boolean(
    (best && (riskRank(resolvedRisk) === 2 || hasTie || !best.pathExists || best.status !== 'active')) ||
      (!best && complex && taskSignals.length > 0) ||
      (!best && taskSignals.length > 0 && strongestRuleRisk === 'high')
  );

  const reason = best ? summarizeCandidateReason(best) : 'no registry candidate matched the task';

  const explainData = explain
    ? {
        matchedKeywords: [...new Set(taskSignals.flatMap((signal) => signal.matchedKeywords))],
        candidatesConsidered: scoredCandidates.map((candidate) => ({
          name: candidate.name,
          type: candidate.type,
          score: candidate.score,
          riskLevel: candidate.riskLevel,
          status: candidate.status,
          source: candidate.source,
          path: candidate.path,
          pathExists: candidate.pathExists,
          reasons: candidate.reasons
        })),
        scoringSummary: scoredCandidates.slice(0, 5).map((candidate) => ({
          name: candidate.name,
          score: candidate.score,
          riskLevel: candidate.riskLevel,
          status: candidate.status
        })),
        chosenReason: reason,
        warnings
      }
    : null;

  return {
    mode,
    riskLevel: resolvedRisk,
    candidate: best,
    approvalNeeded,
    hasTie,
    warnings,
    explainData,
    reason,
    taskSignals,
    complex,
    hasAnyCandidate: scoredCandidates.length > 0,
    noMatch
  };
}

function splitFrontMatterAndBody(contents) {
  const trimmed = contents.replace(/^\uFEFF/, '');
  const match = trimmed.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontMatter: '', body: trimmed };
  }
  return { frontMatter: match[1], body: match[2] || '' };
}

function canonicalSectionName(title) {
  const normalized = String(title || '').trim().toLowerCase();
  if (normalized === 'safety rules' || normalized === 'safety / scope rules') {
    return 'Safety / Scope Rules';
  }
  if (normalized === 'sentinel governance rules') {
    return 'Sentinel Governance Rules';
  }
  for (const section of STANDARD_SECTIONS) {
    if (section.toLowerCase() === normalized) {
      return section;
    }
  }
  return null;
}

function extractSectionContent(body) {
  const lines = String(body || '').split(/\r?\n/);
  const sections = new Map();
  let current = null;
  let originalNotes = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const headingMatch = line.match(/^#{1,3}\s+(.*)$/);
    if (headingMatch) {
      const canonical = canonicalSectionName(headingMatch[1]);
      if (canonical) {
        current = canonical;
        if (!sections.has(current)) {
          sections.set(current, []);
        }
        continue;
      }

      current = 'Original Notes';
      if (!sections.has(current)) {
        sections.set(current, []);
      }
      sections.get(current).push(line);
      continue;
    }

    if (current) {
      sections.get(current).push(line);
      continue;
    }

    if (line.trim()) {
      originalNotes.push(line);
    }
  }

  if (originalNotes.length > 0) {
    sections.set('Original Notes', (sections.get('Original Notes') || []).concat(originalNotes));
  }

  return sections;
}

function normalizeSkillToSentinelNative(sourceSkillFile, targetName, sourceType) {
  const contents = fs.readFileSync(sourceSkillFile, 'utf8');
  validateSkillContents(contents, sourceSkillFile);
  const { metadata, warnings } = validateSkillMetadata(parseFrontMatter(contents), sourceSkillFile);
  const normalizedName = normalize(targetName || metadata.name);
  if (!isKebabCase(normalizedName)) {
    throw new Error('Normalized skill name must be kebab-case.');
  }

  const normalizedMetadata = {
    name: normalizedName,
    description: metadata.description,
    version: metadata.version || '0.1.0',
    riskLevel: metadata.riskLevel || 'medium',
    inputsRequired: Array.isArray(metadata.inputsRequired) ? metadata.inputsRequired : [],
    sentinelCompatible: true,
    source: 'local-import'
  };

  const { body } = splitFrontMatterAndBody(contents);
  const sections = extractSectionContent(body);
  const remaining = new Set(STANDARD_SECTIONS);
  const getSection = (section) => {
    const content = sections.get(section);
    if (content && content.join('').trim()) {
      remaining.delete(section);
      return content.join('\n').trim();
    }
    return '';
  };

  const originalNotes = [];
  if (sections.has('Original Notes')) {
    const notes = sections.get('Original Notes').join('\n').trim();
    if (notes) {
      originalNotes.push(notes);
      remaining.delete('Original Notes');
    }
  }

  for (const [section, lines] of sections.entries()) {
    if (!STANDARD_SECTIONS.includes(section) && section !== 'Original Notes') {
      const text = lines.join('\n').trim();
      if (text) {
        originalNotes.push(`## ${section}\n${text}`);
      }
    }
  }

  const bodySections = [];
  for (const section of STANDARD_SECTIONS) {
    const content = getSection(section);
    bodySections.push(`# ${section}`);
    if (content) {
      bodySections.push(content);
    } else if (section === 'Purpose') {
      bodySections.push('Explain the skill purpose here.');
    } else if (section === 'When to Use') {
      bodySections.push('Use this skill when the task fits its narrow scope.');
    } else if (section === 'Inputs Needed') {
      bodySections.push('- Task goal');
      bodySections.push('- Relevant context');
    } else if (section === 'Procedure') {
      bodySections.push('1. Confirm the task scope.');
      bodySections.push('2. Execute the minimal safe steps.');
    } else if (section === 'Output Format') {
      bodySections.push('Return concise, verifiable results.');
    } else if (section === 'Safety / Scope Rules') {
      bodySections.push('- Follow Sentinel core rules first.');
      bodySections.push('- Do not expand scope without permission.');
    } else if (section === 'Sentinel Governance Rules') {
      bodySections.push('- Sentinel core decides.');
      bodySections.push('- Extensions assist, they do not govern.');
    }
    bodySections.push('');
  }

  if (originalNotes.length > 0) {
    bodySections.push('# Original Notes');
    bodySections.push(originalNotes.join('\n\n'));
    bodySections.push('');
  }

  const markdown = [
    '---',
    `name: ${normalizedMetadata.name}`,
    `description: ${normalizedMetadata.description}`,
    `version: ${normalizedMetadata.version}`,
    `riskLevel: ${normalizedMetadata.riskLevel}`,
    `inputsRequired: []`,
    `sentinelCompatible: true`,
    `source: local-import`,
    '---',
    '',
    ...bodySections
  ].join('\n').replace(/\n+$/, '\n');

  return {
    metadata: normalizedMetadata,
    markdown,
    warnings,
    compatibilityWarning: sourceType && normalize(sourceType) === 'openai-compatible'
      ? 'OpenAI-style input detected. Converting to Sentinel-native format.'
      : null
  };
}

function installSkill(args) {
  const { options, positional } = parseInstallOptions(args);
  const name = positional[0];
  if (!name) {
    throw new Error('Missing skill name.');
  }

  const source = normalize(options.source);
  if (!['registry', 'local'].includes(source)) {
    throw new Error('v0.2 only supports local registry skills. Network, git, and remote sources are disabled.');
  }

  const skills = loadSkillsRegistry();
  const entry = skills.find((item) => normalize(item.name) === normalize(name));
  if (!entry) {
    throw new Error(`Skill not found in local registry: ${name}`);
  }

  if (options.type) {
    const expectedType = normalize(entry.source || 'sentinel-native');
    if (normalize(options.type) !== expectedType) {
      throw new Error(`Requested type ${options.type} does not match registry skill type ${expectedType}.`);
    }
  }

  const { absPath, metadata, warnings } = ensureRegistrySkill(entry);

  showSafetyReminder();
  printWarnings(warnings);
  if (options.dryRun) {
    output(`Dry run: would validate and use skill "${metadata.name}" from ${path.relative(ROOT, absPath)}.`);
    output('No files would be written.');
    return;
  }

  if (options.force) {
    output(`Force flag noted for "${metadata.name}", but registry skills are not overwritten by install.`);
  }

  output(`Skill "${metadata.name}" is already registered and available at ${path.relative(ROOT, absPath)}.`);
  output('No local files were changed.');
}

function readSkillFolder(localPath) {
  const absSource = path.isAbsolute(localPath) ? localPath : path.resolve(process.cwd(), localPath);
  if (!fs.existsSync(absSource) || !fs.statSync(absSource).isDirectory()) {
    throw new Error(`Local skill folder does not exist: ${localPath}`);
  }

  const { skillFile, metadata, warnings } = validateSkill(absSource);
  return {
    absSource,
    skillFile,
    metadata,
    warnings
  };
}

function importSkill(args) {
  const { options, positional } = parseInstallOptions(args);
  const localPath = positional[0];
  if (!localPath) {
    throw new Error('Missing local path.');
  }

  const type = normalize(options.type || 'sentinel-native');
  if (!['sentinel-native', 'openai-compatible'].includes(type)) {
    throw new Error('Import type must be sentinel-native or openai-compatible.');
  }

  const imported = readSkillFolder(localPath);
  const targetName = options.name ? String(options.name).trim() : imported.metadata.name;
  if (!isKebabCase(targetName)) {
    throw new Error('Imported skill name must be kebab-case.');
  }

  const targetDir = path.join(ROOT, 'extensions', 'skills', 'sentinel-native', targetName);
  const absTarget = ensureSafeTargetPath(targetDir);
  const targetRelative = path.relative(ROOT, absTarget);
  const normalized = normalizeSkillToSentinelNative(imported.skillFile, targetName, type);
  const registryEntry = buildRegistryEntry(
    { ...normalized.metadata, name: targetName },
    targetRelative,
    type
  );

  showSafetyReminder();
  if (normalized.compatibilityWarning) {
    output(normalized.compatibilityWarning);
  }
  printWarnings([...imported.warnings, ...(normalized.warnings || [])].filter(Boolean));
  output(`Detected metadata: ${JSON.stringify(normalized.metadata)}`);
  output(`Target path: ${targetRelative}`);
  output(`Registry entry preview: ${JSON.stringify(registryEntry, null, 2)}`);
  output('- SKILL.md (normalized Sentinel-native output)');

  if (options.dryRun) {
    output('Dry run only. No files were written.');
    return;
  }

  const skills = readJson(SKILLS_REGISTRY);
  const existingIndex = skills.findIndex((item) => normalize(item.name) === normalize(targetName));
  if (existingIndex >= 0 && !options.force) {
    throw new Error(`Skill registry entry already exists for ${targetName}. Use --force to update.`);
  }

  if (fs.existsSync(absTarget)) {
    if (!options.force) {
      throw new Error(`Target already exists: ${targetRelative}. Use --force to overwrite.`);
    }
    removeDirectoryRecursive(absTarget);
  }

  fs.mkdirSync(absTarget, { recursive: true });
  fs.writeFileSync(path.join(absTarget, 'SKILL.md'), normalized.markdown, 'utf8');

  const finalEntry = {
    name: targetName,
    type: 'skill',
    version: normalized.metadata.version || '0.1.0',
    status: 'active',
    path: path.posix.join(targetRelative.replace(/\\/g, '/'), 'SKILL.md'),
    description: normalized.metadata.description,
    riskLevel: normalized.metadata.riskLevel || 'medium',
    inputsRequired: Array.isArray(normalized.metadata.inputsRequired) ? normalized.metadata.inputsRequired : [],
    sentinelCompatible: true,
    source: 'sentinel-native'
  };

  upsertRegistryEntry(finalEntry, existingIndex >= 0);
  output(`Imported skill "${targetName}" to ${targetRelative}.`);
  output('Registry synchronized.');
}

function resolveTask(args) {
  const parsed = [];
  let explain = false;
  for (const arg of args) {
    if (arg === '--explain') {
      explain = true;
      continue;
    }
    parsed.push(arg);
  }

  const task = parsed.join(' ').trim();
  if (!task) {
    throw new Error('Missing task text.');
  }

  const result = resolveRegistryAware(task, explain);
  showSafetyReminder();

  if (result.warnings.length > 0) {
    printWarnings(result.warnings);
  }

  if (result.noMatch) {
    output('No extension match found.');
    output(`Mode: ${result.mode}`);
    output(`Risk level: ${result.riskLevel}`);
    output('Recommendation: Proceed with Sentinel core only.');
    output('Core reminder: Core rules still win. Extensions are optional. Resolver is advisory.');
    if (result.explainData) {
      output('Explain:');
      output(`Matched keywords: ${result.explainData.matchedKeywords.length > 0 ? result.explainData.matchedKeywords.join(', ') : 'none'}`);
      output('Candidates considered:');
      if (result.explainData.candidatesConsidered.length === 0) {
        output('none');
      } else {
        for (const item of result.explainData.candidatesConsidered.slice(0, 10)) {
          output(`- ${item.name} | ${item.type} | score=${item.score} | risk=${item.riskLevel} | status=${item.status} | source=${item.source}`);
        }
      }
      output('Scoring summary:');
      if (result.explainData.scoringSummary.length === 0) {
        output('none');
      } else {
        for (const item of result.explainData.scoringSummary) {
          output(`- ${item.name}: score=${item.score}, risk=${item.riskLevel}, status=${item.status}`);
        }
      }
      output('Why chosen: no registry candidate matched the task.');
    }
    return;
  }

  const candidate = result.candidate;
  output(`Match: ${candidate.name}`);
  output(`Mode: ${result.mode}`);
  output(`Risk level: ${result.riskLevel}`);
  output(`Recommended extension: ${candidate.name}`);
  output(`Type: ${candidate.type}`);
  output(`Source: ${candidate.source}`);
  output(`Path: ${candidate.path || 'missing'}`);
  output(`Reason: ${result.reason}`);
  output(`Approval needed: ${result.approvalNeeded ? 'Yes' : 'No'}`);
  output('Core reminder: Core rules still win. Extensions are optional. Resolver is advisory.');

  if (result.explainData) {
    output('Explain:');
    output(`Matched keywords: ${result.explainData.matchedKeywords.length > 0 ? result.explainData.matchedKeywords.join(', ') : 'none'}`);
    output('Candidates considered:');
    for (const item of result.explainData.candidatesConsidered.slice(0, 10)) {
      output(`- ${item.name} | ${item.type} | score=${item.score} | risk=${item.riskLevel} | status=${item.status} | source=${item.source}`);
    }
    output('Scoring summary:');
    for (const item of result.explainData.scoringSummary) {
      output(`- ${item.name}: score=${item.score}, risk=${item.riskLevel}, status=${item.status}`);
    }
    output(`Why chosen: ${result.explainData.chosenReason}`);
  }
}

async function setupActivationName() {
  showSafetyReminder();
  const answer = await promptForActivationName();
  const identity = saveSentinelIdentity(answer);
  output(`Sentinel activation name saved: ${identity.activation_name}`);
  output(
    `You can now activate Sentinel AI by saying: "hey ${identity.normalized_activation_name}" or "${identity.normalized_activation_name} activate"`
  );
  output('The original phrase "Activate Sentinel AI" still works.');
}

function usage() {
  showSafetyReminder();
  output('Usage:');
  output('  sentinel list skills');
  output('  sentinel install skill <name> [--dry-run] [--force] [--source registry|local] [--type sentinel-native|openai-compatible]');
  output('  sentinel import skill <local-path> [--dry-run] [--force] [--type sentinel-native|openai-compatible] [--name custom-name]');
  output('  sentinel resolve "<task>" [--explain]');
  output('  sentinel setup-name');
  output('  sentinel identity setup');
}

async function main() {
  try {
    const argv = process.argv.slice(2);
    const command = argv[0];
    const subcommand = argv[1];

    if (!command || command === '--help' || command === '-h') {
      usage();
      return;
    }

    if (command === 'list' && subcommand === 'skills') {
      listSkills();
      return;
    }

    if (command === 'install' && subcommand === 'skill') {
      installSkill(argv.slice(2));
      return;
    }

    if (command === 'import' && subcommand === 'skill') {
      importSkill(argv.slice(2));
      return;
    }

    if (command === 'resolve') {
      resolveTask(argv.slice(1));
      return;
    }

    if (command === 'setup-name') {
      await setupActivationName();
      return;
    }

    if (command === 'identity' && subcommand === 'setup') {
      await setupActivationName();
      return;
    }

    throw new Error(`Unknown command: ${argv.join(' ') || '(empty)'}`);
  } catch (err) {
    fail(err.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  ACTIVATION_GREETINGS,
  RESERVED_ACTIVATION_NAMES,
  detectActivationInput,
  getSentinelIdentityPath,
  normalizeActivationDisplayName,
  normalizeActivationName,
  normalizeInputForActivation,
  readSentinelIdentity,
  saveSentinelIdentity,
  validateActivationName
};
