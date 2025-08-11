import { createNextHandler } from '@ts-rest/serverless/next';
import { spawn } from 'child_process';

import { rootRouter } from '../../../../contract/rootRouter';
import { dummyTransfers } from '../../../../lib/dummy';
import { exists } from '../../../../lib/utils/exists';
import { errorHandler } from '../../../../server/errorHandler';

const baseDownloadPath = process.env.DOWNLOAD_PATH || '';

const handler = createNextHandler(
  rootRouter.api.transfers,
  {
    getTransfers: () => {
      return new Promise((resolve, reject) => {
        if (process.env.USE_DUMMY_DATA === 'true') {
          return resolve({ status: 200, body: { transfers: dummyTransfers } });
        }

        const transfer = spawn('mega-transfers', ['--path-display-size=1000']);
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
                // sourcePath: match[3].trim().replace(baseDownloadPath, ''),
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
  },
  {
    handlerType: 'app-router',
    jsonQuery: true,
    responseValidation: true,
    errorHandler,
  },
);

export { handler as GET };
