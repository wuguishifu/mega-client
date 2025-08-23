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
  },
  {
    pathPrefix: '/downloads',
  },
);
