const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  POLL_INTERVAL_MS,
  findPendingAction,
  createTaskWatcher,
  processTasksFile,
} = require('../app.js');

function makeTempFile(initialContent) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tasks-reader-'));
  const filePath = path.join(tempDir, 'tasks.json');
  fs.writeFileSync(filePath, initialContent, 'utf8');
  return filePath;
}

function captureStreams() {
  const stdout = [];
  const stderr = [];

  return {
    stdout: { write: (value) => stdout.push(value) },
    stderr: { write: (value) => stderr.push(value) },
    result: () => ({ stdout: stdout.join(''), stderr: stderr.join('') }),
  };
}

test('selects the first pending action in the order of the array', () => {
  const filePath = makeTempFile(JSON.stringify([
    { id: 1, action: 'sync_database', status: 'pending' },
    { id: 2, action: 'clear_cache', status: 'pending' },
    { id: 3, action: 'send_daily_reports', status: 'done' },
  ]));

  const output = captureStreams();
  const action = processTasksFile(filePath, output);

  assert.equal(action, 'sync_database');
  assert.equal(output.result().stdout, 'sync_database\n');
  assert.equal(output.result().stderr, '');
});

test('logs an explicit message when there is no pending task', () => {
  const filePath = makeTempFile(JSON.stringify([
    { id: 1, action: 'completed_action', status: 'done' },
  ]));

  const output = captureStreams();
  const action = processTasksFile(filePath, output);

  assert.equal(action, null);
  assert.equal(output.result().stdout, '');
  assert.match(output.result().stderr, /No pending task found/);
});

test('re-reads the file after it changes on disk', () => {
  const filePath = makeTempFile(JSON.stringify([
    { id: 1, action: 'old_action', status: 'pending' },
  ]));

  const firstOutput = captureStreams();
  const firstAction = processTasksFile(filePath, firstOutput);
  assert.equal(firstAction, 'old_action');

  fs.writeFileSync(filePath, JSON.stringify([
    { id: 2, action: 'new_action', status: 'pending' },
  ]), 'utf8');

  const secondOutput = captureStreams();
  const secondAction = processTasksFile(filePath, secondOutput);

  assert.equal(secondAction, 'new_action');
  assert.equal(secondOutput.result().stdout, 'new_action\n');
});

test('reports invalid JSON as a readable error', () => {
  const filePath = makeTempFile('{not valid json');
  const output = captureStreams();

  const action = processTasksFile(filePath, output);

  assert.equal(action, null);
  assert.match(output.result().stderr, /Unexpected token|JSON/);
});

test('handles a missing or unreadable file without crashing', () => {
  const filePath = path.join(os.tmpdir(), `missing-${Date.now()}.json`);
  const output = captureStreams();

  const action = processTasksFile(filePath, output);

  assert.equal(action, null);
  assert.match(output.result().stderr, /ENOENT|no such file|read/);
});

test('rejects a root JSON value that is not an array', () => {
  const filePath = makeTempFile(JSON.stringify({ action: 'wrong', status: 'pending' }));
  const output = captureStreams();

  const action = processTasksFile(filePath, output);

  assert.equal(action, null);
  assert.match(output.result().stderr, /array/i);
});

test('skips malformed tasks and continues scanning other entries', () => {
  const filePath = makeTempFile(JSON.stringify([
    { id: 1, status: 'pending' },
    { id: 2, action: 'valid_action', status: 'pending' },
    { id: 3, action: 'wrong_status', status: 'done' },
  ]));

  const output = captureStreams();
  const action = processTasksFile(filePath, output);

  assert.equal(action, 'valid_action');
  assert.match(output.result().stderr, /missing or invalid action/i);
  assert.equal(output.result().stdout, 'valid_action\n');
});

test('uses a polling interval of 5000 milliseconds', () => {
  assert.equal(POLL_INTERVAL_MS, 5000);
});

test('stops the watcher cleanly', () => {
  const filePath = makeTempFile(JSON.stringify([
    { id: 1, action: 'stop_me', status: 'pending' },
  ]));

  let timerId = null;
  const watcher = createTaskWatcher(filePath, {
    scheduler: (callback, delay) => {
      timerId = setTimeout(callback, delay);
      return timerId;
    },
    canceller: (id) => clearTimeout(id),
    logger: {
      stdout: { write: () => {} },
      stderr: { write: () => {} },
    },
  });

  watcher.start();
  watcher.stop();
  assert.equal(typeof timerId, 'object');
});

test('supports a custom tasks path through TASKS_FILE_PATH', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tasks-reader-env-'));
  const filePath = path.join(tempDir, 'custom-tasks.json');
  fs.writeFileSync(filePath, JSON.stringify([
    { id: 1, action: 'custom_path_task', status: 'pending' },
  ]), 'utf8');

  const previousValue = process.env.TASKS_FILE_PATH;
  process.env.TASKS_FILE_PATH = filePath;

  const output = captureStreams();
  const action = processTasksFile(undefined, output);

  process.env.TASKS_FILE_PATH = previousValue;

  assert.equal(action, 'custom_path_task');
  assert.equal(output.result().stdout, 'custom_path_task\n');
});

test('findPendingAction respects array order when several tasks are pending', () => {
  const tasks = [
    { id: 1, action: 'first', status: 'pending' },
    { id: 2, action: 'second', status: 'pending' },
  ];

  const logger = { error: { write: () => {} } };
  const action = findPendingAction(tasks, logger);

  assert.equal(action, 'first');
});
