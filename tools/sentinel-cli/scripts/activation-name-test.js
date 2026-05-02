const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const cliModule = require('../bin/sentinel.js');

const cwd = path.resolve(__dirname, '..');
const sentinel = process.execPath;
const cli = path.join(cwd, 'bin', 'sentinel.js');

function runCli(args, input, identityFile) {
  const result = spawnSync(sentinel, [cli, ...args], {
    cwd,
    encoding: 'utf8',
    input,
    env: {
      ...process.env,
      SENTINEL_IDENTITY_FILE: identityFile
    }
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `${args.join(' ')} exited with code ${result.status}\nSTDOUT:\n${result.stdout || ''}\nSTDERR:\n${result.stderr || ''}`
    );
  }

  return result;
}

function withTempIdentityFile(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sentinel-identity-'));
  const identityFile = path.join(dir, 'sentinel-identity.json');
  try {
    fn(identityFile);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function readStoredIdentity(identityFile) {
  return JSON.parse(fs.readFileSync(identityFile, 'utf8')).sentinel_identity;
}

function run() {
  withTempIdentityFile((identityFile) => {
    const setupResult = runCli(['setup-name'], 'Nova\n', identityFile);
    assert.ok(setupResult.stdout.includes('Sentinel activation name saved: Nova'));
    assert.ok(setupResult.stdout.includes('"hey nova"'));

    const firstIdentity = readStoredIdentity(identityFile);
    assert.strictEqual(firstIdentity.activation_name, 'Nova');
    assert.strictEqual(firstIdentity.normalized_activation_name, 'nova');
    assert.ok(firstIdentity.created_at);
    assert.ok(firstIdentity.updated_at);

    const updateResult = runCli(['identity', 'setup'], 'Astra\n', identityFile);
    assert.ok(updateResult.stdout.includes('Sentinel activation name saved: Astra'));

    const secondIdentity = readStoredIdentity(identityFile);
    assert.strictEqual(secondIdentity.activation_name, 'Astra');
    assert.strictEqual(secondIdentity.normalized_activation_name, 'astra');
    assert.strictEqual(secondIdentity.created_at, firstIdentity.created_at);
    assert.ok(secondIdentity.updated_at);
  });

  withTempIdentityFile((identityFile) => {
    process.env.SENTINEL_IDENTITY_FILE = identityFile;
    try {
      const identity = cliModule.saveSentinelIdentity('Nova');
      assert.strictEqual(cliModule.readSentinelIdentity().activation_name, 'Nova');
      assert.strictEqual(identity.normalized_activation_name, 'nova');

      assert.strictEqual(cliModule.detectActivationInput('hey nova', identity).activated, true);
      assert.strictEqual(cliModule.detectActivationInput('Hi Nova', identity).activated, true);
      assert.strictEqual(cliModule.detectActivationInput('nova activate', identity).activated, true);
      assert.strictEqual(cliModule.detectActivationInput('activate nova', identity).activated, true);
      assert.strictEqual(cliModule.detectActivationInput('ask nova', identity).activated, true);
      assert.strictEqual(cliModule.detectActivationInput('yo nova', identity).activated, true);
      assert.strictEqual(cliModule.detectActivationInput('nova', identity).activated, true);
      assert.strictEqual(cliModule.detectActivationInput('hey nova improve docs', identity).remainingText, 'improve docs');
      assert.strictEqual(cliModule.detectActivationInput('Activate Sentinel AI', identity).activated, true);

      assert.strictEqual(cliModule.detectActivationInput('supernova mode', identity).activated, false);
      assert.strictEqual(cliModule.detectActivationInput('renovation task', identity).activated, false);
      assert.strictEqual(cliModule.detectActivationInput('innovation project', identity).activated, false);

      assert.throws(() => cliModule.validateActivationName(''), /must not be empty/i);
      assert.throws(() => cliModule.validateActivationName('sentinel'), /reserved/i);
      assert.throws(() => cliModule.validateActivationName('resolve'), /reserved/i);
      assert.throws(() => cliModule.validateActivationName('name!'), /may only contain/i);
      assert.throws(() => cliModule.validateActivationName('123456789012345678901234567890123'), /32 characters/i);
    } finally {
      delete process.env.SENTINEL_IDENTITY_FILE;
    }
  });
}

if (require.main === module) {
  try {
    run();
    process.stdout.write('Activation name tests passed\n');
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}

module.exports = {
  run
};
