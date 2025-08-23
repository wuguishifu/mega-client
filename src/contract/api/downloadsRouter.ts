import z from 'zod';

import { c } from '../contract';
import { Download } from '../types/downloads';

export const downloadsRouter = c.router(
  {
    listDownloads: {
      summary: 'Lists downloaded items',
      method: 'GET',
      path: '/get',
      query: z.object({
        path: z.string(),
      }),
      responses: {
        200: z.array(Download),
      },
    },
    renameItem: {
      summary: 'Renames an item',
      method: 'POST',
      path: '/rename',
      body: z.object({
        oldPath: z.string(),
        newPath: z.string(),
      }),
      responses: {
        200: z.object({
          renamed: z.boolean(),
        }),
      },
    },
  },
  {
    pathPrefix: '/downloads',
  },
);
