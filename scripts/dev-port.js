const net = require('net');
const { spawn } = require('child_process');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const startPort = Number(process.env.PORT || 3000);
const maxAttempts = 20;
const projectRoot = path.resolve(__dirname, '..');
const lockFile = path.join(projectRoot, '.next', 'dev', 'lock');

function getProjectNextDevPids() {
  try {
    const output = execSync('ps -eo pid,args', { stdio: ['ignore', 'pipe', 'ignore'] }).toString();

    return output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const match = line.match(/^(\d+)\s+(.*)$/);
        if (!match) return null;
        return { pid: Number(match[1]), args: match[2] };
      })
      .filter(Boolean)
      .filter(({ pid, args }) => {
        if (pid === process.pid) return false;
        return args.includes(`${projectRoot}/node_modules/.bin/next dev`) ||
          (args.includes('next dev') && args.includes(projectRoot));
      })
      .map(({ pid }) => pid);
  } catch {
    return [];
  }
}

function getLockOwnerPids() {
  try {
    if (!fs.existsSync(lockFile)) return [];

    const output = execSync(`lsof -t "${lockFile}"`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    return output
      .split('\n')
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value) && value > 0 && value !== process.pid);
  } catch {
    return [];
  }
}

function killPids(pids, signal = 'SIGTERM') {
  for (const pid of pids) {
    try {
      process.kill(pid, signal);
    } catch {
      // Ignore already-exited or inaccessible PIDs
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cleanupStaleDevState() {
  const existingNextPids = getProjectNextDevPids();

  if (existingNextPids.length > 0) {
    console.log(`ℹ Stopping previous dev process(es): ${existingNextPids.join(', ')}`);
    killPids(existingNextPids, 'SIGTERM');
    await sleep(400);
    killPids(getProjectNextDevPids(), 'SIGKILL');
  }

  const lockOwners = getLockOwnerPids();
  if (lockOwners.length > 0) {
    console.log(`ℹ Releasing lock from process(es): ${lockOwners.join(', ')}`);
    killPids(lockOwners, 'SIGTERM');
    await sleep(300);
    killPids(getLockOwnerPids(), 'SIGKILL');
  }

  if (fs.existsSync(lockFile) && getLockOwnerPids().length === 0) {
    fs.rmSync(lockFile, { force: true });
    console.log('ℹ Removed stale .next/dev/lock');
  }
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port, '0.0.0.0');
  });
}

async function findAvailablePort(port, attemptsLeft) {
  if (attemptsLeft <= 0) {
    throw new Error('No available port found in range.');
  }

  const free = await isPortFree(port);
  if (free) return port;
  return findAvailablePort(port + 1, attemptsLeft - 1);
}

async function start() {
  try {
    await cleanupStaleDevState();

    const port = await findAvailablePort(startPort, maxAttempts);

    if (port !== startPort) {
      console.log(`⚠ Port ${startPort} is busy. Starting on ${port} instead.`);
    }

    const child = spawn('next', ['dev', '-p', String(port)], {
      stdio: 'inherit',
      shell: true,
      env: process.env,
    });

    child.on('exit', (code) => process.exit(code ?? 0));
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Failed to start dev server');
    process.exit(1);
  }
}

start();
