import z from 'zod';

import { c } from '../../contract';

export const serverSettingsRouter = c.router(
  {
    logInMega: {
      summary: 'Logs into a mega account on the server',
      method: 'POST',
      path: '/login',
      body: z.object({
        email: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.object({
          email: z.string(),
        }),
      },
    },
    logOutMega: {
      summary: 'Logs out of a mega account on the server',
      method: 'POST',
      path: '/logout',
      body: c.noBody(),
      responses: {
        200: c.noBody(),
      },
    },
    whoAmI: {
      summary: 'Gets the current mega account',
      method: 'GET',
      path: '/account',
      responses: {
        200: z.object({
          loggedIn: z.boolean(),
          email: z.string().optional(),
        }),
      },
    },
  },
  {
    pathPrefix: '/server',
  },
);
