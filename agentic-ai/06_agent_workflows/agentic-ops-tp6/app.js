const fs = require('fs');
const path = require('path');

const POLL_INTERVAL_MS = 5000;

function ensureOutputTarget(target, fallback) {
  if (typeof target === 'function') {
    return target;
  }

  if (target && typeof target.write === 'function') {
    return target;
  }

  return fallback || process.stdout;
}

function getTaskFilePath(customPath) {
  if (customPath) {
    return path.resolve(customPath);
  }

  return path.resolve(process.env.TASKS_FILE_PATH || '/app/tasks.json');
}

function writeStreamMessage(stream, message) {
  const target = ensureOutputTarget(stream, process.stderr);

  if (typeof target === 'function') {
    target(`${message}\n`);
    return;
  }

  target.write(`${message}\n`);
}

function formatError(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function findPendingAction(tasks, logger = console) {
  if (!Array.isArray(tasks)) {
    throw new TypeError('Root JSON value must be an array.');
  }

  for (const [index, task] of tasks.entries()) {
    if (!task || typeof task !== 'object' || Array.isArray(task)) {
      writeStreamMessage(logger.error, `Invalid task entry at index ${index}: entry must be an object.`);
      continue;
    }

    const hasStatus = Object.prototype.hasOwnProperty.call(task, 'status');
    const hasAction = Object.prototype.hasOwnProperty.call(task, 'action');
    const status = task.status;
    const action = task.action;

    if (!hasStatus || typeof status !== 'string') {
      writeStreamMessage(logger.error, `Invalid task entry at index ${index}: missing or invalid status.`);
      continue;
    }

    if (!hasAction || typeof action !== 'string' || action.trim() === '') {
      writeStreamMessage(logger.error, `Invalid task entry at index ${index}: missing or invalid action.`);
      continue;
    }

    if (status === 'pending') {
      return action;
    }
  }

  return null;
}

function readTasksFile(filePath) {
  const resolvedPath = getTaskFilePath(filePath);
  const fileContent = fs.readFileSync(resolvedPath, 'utf8');
  return JSON.parse(fileContent);
}

function processTasksFile(filePath, options = {}) {
  const stdout = options.stdout || process.stdout;
  const stderr = options.stderr || process.stderr;
  const logger = {
    error: stderr,
  };

  try {
    const tasks = readTasksFile(filePath);
    const action = findPendingAction(tasks, logger);

    if (action === null) {
      writeStreamMessage(stderr, 'No pending task found');
      return null;
    }

    writeStreamMessage(stdout, action);
    return action;
  } catch (error) {
    writeStreamMessage(stderr, formatError(error));
    return null;
  }
}

function createTaskWatcher(filePath, options = {}) {
  const logger = options.logger || console;
  const scheduler = options.scheduler || ((callback, delay) => setTimeout(callback, delay));
  const canceller = options.canceller || clearTimeout;
  const taskPath = getTaskFilePath(filePath);
  let timerId = null;
  let isStopped = false;

  const scheduleNextTick = () => {
    if (timerId !== null) {
      canceller(timerId);
      timerId = null;
    }

    if (isStopped) {
      return;
    }

    timerId = scheduler(() => {
      if (!isStopped) {
        tick();
      }
    }, POLL_INTERVAL_MS);
  };

  function tick() {
    if (isStopped) {
      return;
    }

    processTasksFile(taskPath, {
      stdout: logger.stdout || process.stdout,
      stderr: logger.stderr || process.stderr,
    });

    scheduleNextTick();
  }

  return {
    start() {
      isStopped = false;

      if (timerId !== null) {
        canceller(timerId);
        timerId = null;
      }

      processTasksFile(taskPath, {
        stdout: logger.stdout || process.stdout,
        stderr: logger.stderr || process.stderr,
      });

      scheduleNextTick();

      return this;
    },
    stop() {
      isStopped = true;

      if (timerId !== null) {
        canceller(timerId);
        timerId = null;
      }

      return this;
    },
  };
}

if (require.main === module) {
  const filePath = getTaskFilePath();
  const watcher = createTaskWatcher(filePath, {
    logger: {
      stdout: process.stdout,
      stderr: process.stderr,
    },
  });

  const shutdown = () => {
    watcher.stop();
    process.exit(0);
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
  watcher.start();
}

module.exports = {
  POLL_INTERVAL_MS,
  findPendingAction,
  getTaskFilePath,
  processTasksFile,
  readTasksFile,
  createTaskWatcher,
};
