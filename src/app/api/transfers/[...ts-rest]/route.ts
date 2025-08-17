import { createNextHandler } from '@ts-rest/serverless/next';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import path from 'path';

import { rootRouter } from '../../../../contract/rootRouter';
import { exists } from '../../../../lib/utils/exists';
import { errorHandler } from '../../../../server/errorHandler';

const noop = () => {
  // empty
};

const spawnWithMaybeDockerExec = (command: string, args: string[]): ChildProcessWithoutNullStreams => {
  if (process.env.NODE_ENV === 'production') {
    return spawn('docker', ['exec', 'host', command, ...args]);
  }
  return spawn(command, args);
};

const handler = createNextHandler(
  rootRouter.api.transfers,
  {
    getTransfers: () => {
      return new Promise((resolve, reject) => {
        const transfer = spawnWithMaybeDockerExec('mega-exec', ['transfers', '--path-display-size=1000']);
        let stdout = '';
        let stderr = '';
        transfer.stdout.on('data', (data) => {
          stdout += data.toString();
        });
        transfer.stderr.on('data', (data) => {
          stderr += data.toString();
        });
        transfer.on('close', (code) => {
          if (code !== 0) {
            return reject(new Error(stderr || 'mega-transfers failed'));
          }

          const lines = stdout.split('\n').filter(exists);
          const dataLines = lines.filter((line) => !line.startsWith('TYPE'));
          const transfers = dataLines
            .map((line) => {
              // Example line:
              // ⇓    23             /Users/bo/Desktop/./...DR.H.265-playWEB.mkv 1.17% of    4.75 GB ACTIVE
              const match = line.match(/^(\S+)\s+(\S+)\s+(\S.+?)\s+(\d+\.\d+% of\s+\d+\.\d+ GB)\s+(.+)$/);

              if (!match) {
                return null;
              }

              const progressParts = match[4]
                .split('of')
                .map((part) => part.trim())
                .filter(exists);

              return {
                type: match[1],
                tag: match[2],
                sourcePath: match[3].trim(),
                progress: {
                  percent: Number(progressParts[0].replace('%', '')),
                  total: progressParts[1],
                },
                state: match[5].trim(),
              };
            })
            .filter(exists);
          resolve({
            status: 200,
            body: {
              transfers,
            },
          });
        });
      });
    },
    cancelTransfer: ({ params: { tag } }) => {
      return new Promise((resolve, reject) => {
        const transfer = spawnWithMaybeDockerExec('mega-exec', ['transfers', '-c', tag]);
        let stderr = '';
        transfer.stdout.on('data', noop);
        transfer.stderr.on('data', (data) => (stderr += data.toString()));
        transfer.on('close', (code) => {
          if (code !== 0) {
            return reject(new Error(stderr || 'mega-transfers failed with option -c'));
          }

          resolve({ status: 200, body: tag });
        });
      });
    },
    pauseTransfer: ({ params: { tag } }) => {
      return new Promise((resolve, reject) => {
        const transfer = spawnWithMaybeDockerExec('mega-exec', ['transfers', '-p', tag]);
        let stderr = '';
        transfer.stdout.on('data', noop);
        transfer.stderr.on('data', (data) => (stderr += data.toString()));
        transfer.on('close', (code) => {
          if (code !== 0) {
            return reject(new Error(stderr || 'mega-transfers failed with option -p'));
          }

          resolve({ status: 200, body: tag });
        });
      });
    },
    resumeTransfer: ({ params: { tag } }) => {
      return new Promise((resolve, reject) => {
        const transfer = spawnWithMaybeDockerExec('mega-exec', ['transfers', '-r', tag]);
        let stderr = '';
        transfer.stdout.on('data', noop);
        transfer.stderr.on('data', (data) => (stderr += data.toString()));
        transfer.on('close', (code) => {
          if (code !== 0) {
            return reject(new Error(stderr || 'mega-transfers failed with option -r'));
          }

          resolve({ status: 200, body: tag });
        });
      });
    },
    queueTransfer: ({ body: { url, downloadPath } }) => {
      return new Promise((resolve, reject) => {
        const baseLocation = process.env.DOWNLOAD_PATH || '.';
        const location = path.join(baseLocation, downloadPath || '.');

        const transfer = spawnWithMaybeDockerExec('mega-exec', ['get', '-q', url, location]);
        let stderr = '';
        transfer.stdout.on('data', noop);
        transfer.stderr.on('data', (data) => (stderr += data.toString()));
        transfer.on('close', (code) => {
          if (code !== 0) {
            return reject(new Error(stderr || 'mega-get failed'));
          }

          resolve({ status: 200, body: url });
        });
      });
    },
  },
  {
    handlerType: 'app-router',
    jsonQuery: true,
    responseValidation: true,
    errorHandler,
  },
);

export { handler as DELETE, handler as GET, handler as POST, handler as PUT };
