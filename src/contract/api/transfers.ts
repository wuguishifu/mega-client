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
    cancelTransfer: {
      summary: 'Cancels a transfer',
      method: 'DELETE',
      path: '/cancel/:tag',
      pathParams: z.object({
        tag: z.string(),
      }),
      responses: {
        200: z.string(),
      },
    },
    pauseTransfer: {
      summary: 'Pauses a transfer',
      method: 'POST',
      path: '/pause/:tag',
      pathParams: z.object({
        tag: z.string(),
      }),
      body: c.noBody(),
      responses: {
        200: z.string(),
      },
    },
    resumeTransfer: {
      summary: 'Resumes a transfer',
      method: 'POST',
      path: '/resume/:tag',
      pathParams: z.object({
        tag: z.string(),
      }),
      body: c.noBody(),
      responses: {
        200: z.string(),
      },
    },
    queueTransfer: {
      summary: 'Queues a new transfer',
      method: 'POST',
      path: '/queue',
      body: z.object({
        url: z.string().url(),
        downloadPath: z.string().optional(),
      }),
      responses: {
        200: z.string(),
      },
    },
  },
  { pathPrefix: '/transfers' },
);
