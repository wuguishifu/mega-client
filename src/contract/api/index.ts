import { c } from '../contract';
import { settingsRouter } from './settings';
import { transfersRouter } from './transfersRouter';

export const apiRouter = c.router(
  {
    transfers: transfersRouter,
    settings: settingsRouter,
  },
  {
    pathPrefix: '/api',
  },
);
