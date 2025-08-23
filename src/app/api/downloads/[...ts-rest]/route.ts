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
        status: 200,
        body: files.map((file) => ({
          name: file,
          path: `${cleanedSubDirectory}/${file}`,
          type: fs.statSync(`${downloadDir}/${cleanedSubDirectory}/${file}`).isDirectory() ? 'directory' : 'file',
        })),
      });
    },
    renameItem: ({ body: { oldPath, newPath } }) => {
      const downloadDir = process.env.DOWNLOAD_PATH;
      if (!downloadDir) {
        throw new Error('DOWNLOAD_PATH is not set');
      }

      if (oldPath.includes('..') || newPath.includes('..')) {
        throw new Error('Invalid path');
      }

      if (fs.existsSync(newPath)) {
        throw new Error('File already exists');
      }

      if (path.dirname(oldPath) !== path.dirname(newPath)) {
        throw new Error('Can only rename within the same directory');
      }

      const fullOldPath = path.join(downloadDir, oldPath);
      const fullNewPath = path.join(downloadDir, newPath);

      fs.renameSync(fullOldPath, fullNewPath);

      return Promise.resolve({
        status: 200,
        body: { renamed: true },
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

export { handler as GET, handler as POST };
