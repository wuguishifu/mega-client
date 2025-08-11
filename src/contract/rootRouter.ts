import { apiRouter } from './api';
import { c } from './contract';

export const rootRouter = c.router(
  {
    api: apiRouter,
  },
  {
    strictStatusCodes: true,
  },
);
