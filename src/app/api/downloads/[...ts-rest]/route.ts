import { createNextHandler } from '@ts-rest/serverless/next';
import fs from 'fs';
import path from 'path';

import { rootRouter } from '../../../../contract/rootRouter';
import { errorHandler } from '../../../../server/errorHandler';

const handler = createNextHandler(
  rootRouter.api.downloads,
  {
    listDownloads: ({ query: { path: subDirectory } }) => {
      const downloadDir = process.env.DOWNLOAD_PATH;
      if (!downloadDir) {
        throw new Error('DOWNLOAD_PATH is not set');
      }

      const cleanedSubDirectory = subDirectory.replace(/\.\./g, '');
      const requestedPath = path.join(downloadDir, cleanedSubDirectory);

      const files = fs.readdirSync(requestedPath);

      return Promise.resolve({
        status: 200 as const,
        body: files.map((file) => ({
          name: file,
          path: `${cleanedSubDirectory}/${file}`,
          type: fs.statSync(`${downloadDir}/${cleanedSubDirectory}/${file}`).isDirectory() ? 'directory' : 'file',
        })),
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
