import { z } from 'zod';

import { c } from '../contract';
import { Transfer } from '../types/transfers';

export const transfersRouter = c.router(
  {
    getTransfers: {
      summary: 'Gets a list of active transfers',
      method: 'GET',
      path: '/get',
      responses: {
        200: z.object({
          transfers: z.array(Transfer),
        }),
      },
    },
  },
  { pathPrefix: '/transfers' },
);
