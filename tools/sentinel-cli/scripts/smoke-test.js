const { spawnSync } = require('child_process');
const path = require('path');

const cwd = path.resolve(__dirname, '..');
const sentinel = process.execPath;
const cli = path.join(cwd, 'bin', 'sentinel.js');

function run(args) {
  const result = spawnSync(sentinel, [cli, ...args], {
    cwd,
    encoding: 'utf8'
  });

  if (result.error) {
    throw new Error(`${args.join(' ')} failed: ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(
      `${args.join(' ')} exited with code ${result.status}\nSTDOUT:\n${result.stdout || ''}\nSTDERR:\n${result.stderr || ''}`
    );
  }

  return result;
}

function expectContains(result, snippet) {
  const combined = `${result.stdout || ''}\n${result.stderr || ''}`;
  if (!combined.includes(snippet)) {
    throw new Error(`Expected output to include: ${snippet}\nActual output:\n${combined}`);
  }
}

function main() {
  const commands = [
    ['list', 'skills'],
    ['install', 'skill', 'readme-improver', '--dry-run'],
    ['import', 'skill', 'fixtures/example-local-skill', '--dry-run'],
    ['import', 'skill', 'fixtures/openai-style-skill', '--type', 'openai-compatible', '--dry-run'],
    ['resolve', 'Improve README onboarding'],
    ['resolve', 'Review authentication security'],
    ['resolve', 'Clean memory templates', '--explain'],
    ['resolve', 'Unknown random task']
  ];

  for (const args of commands) {
    const result = run(args);

    if (args[0] === 'import' && args[2] === 'fixtures/example-local-skill') {
      expectContains(result, 'Target path: extensions\\skills\\sentinel-native\\example-local-skill');
      expectContains(result, '"source": "sentinel-native"');
    }

    if (args[0] === 'import' && args[2] === 'fixtures/openai-style-skill') {
      expectContains(result, 'OpenAI-style input detected. Converting to Sentinel-native format.');
      expectContains(result, 'Target path: extensions\\skills\\sentinel-native\\openai-style-skill');
      expectContains(result, '"source": "sentinel-native"');
      if (result.stdout.includes('openai-compatible')) {
        throw new Error(`Unexpected openai-compatible path reference in output:\n${result.stdout}`);
      }
    }

    if (args[0] === 'resolve' && args[1] === 'Improve README onboarding') {
      expectContains(result, 'Match: readme-improver');
      expectContains(result, 'Mode: Light');
      expectContains(result, 'Risk level: low');
      expectContains(result, 'Recommended extension: readme-improver');
      expectContains(result, 'Type: skill');
      expectContains(result, 'Source: sentinel-native');
      expectContains(result, 'Path: extensions/skills/sentinel-native/README-improver/SKILL.md');
      expectContains(result, 'Reason: matched README');
      expectContains(result, 'Approval needed: No');
      expectContains(result, 'Core reminder: Core rules still win. Extensions are optional. Resolver is advisory.');
    }

    if (args[0] === 'resolve' && args[1] === 'Review authentication security') {
      expectContains(result, 'Match: security-reviewer');
      expectContains(result, 'Mode: Architect');
      expectContains(result, 'Risk level: high');
      expectContains(result, 'Recommended extension: security-reviewer');
      expectContains(result, 'Type: agent');
      expectContains(result, 'Source: sentinel-native');
      expectContains(result, 'Path: extensions/agents/security-reviewer.md');
      expectContains(result, 'Reason: matched security + auth keywords');
      expectContains(result, 'Approval needed: Yes');
      expectContains(result, 'Core reminder: Core rules still win. Extensions are optional. Resolver is advisory.');
    }

    if (args[0] === 'resolve' && args[1] === 'Clean memory templates') {
      expectContains(result, 'Match: memory-cleaner');
      expectContains(result, 'Mode: Architect');
      expectContains(result, 'Risk level: medium');
      expectContains(result, 'Recommended extension: memory-cleaner');
      expectContains(result, 'Type: skill');
      expectContains(result, 'Source: sentinel-native');
      expectContains(result, 'Path: extensions/skills/sentinel-native/memory-cleaner/SKILL.md');
      expectContains(result, 'Reason: matched clean memory + template keywords');
      expectContains(result, 'Explain:');
      expectContains(result, 'Matched keywords: clean memory, template');
      expectContains(result, 'Candidates considered:');
      expectContains(result, 'Scoring summary:');
      expectContains(result, 'Why chosen: matched clean memory + template keywords');
    }

    if (args[0] === 'resolve' && args[1] === 'Unknown random task') {
      expectContains(result, 'No extension match found.');
      expectContains(result, 'Mode: Light');
      expectContains(result, 'Risk level: low');
      expectContains(result, 'Recommendation: Proceed with Sentinel core only.');
      expectContains(result, 'Core reminder: Core rules still win. Extensions are optional. Resolver is advisory.');
    }
  }

  process.stdout.write('Smoke test passed\n');
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}
