import { c } from '../contract';
import { transfersRouter } from './transfers';

export const apiRouter = c.router(
  {
    transfers: transfersRouter,
  },
  {
    pathPrefix: '/api',
  },
);
