import { c } from '../contract';
import { downloadsRouter } from './downloadsRouter';
import { settingsRouter } from './settings';
import { transfersRouter } from './transfersRouter';

export const apiRouter = c.router(
  {
    transfers: transfersRouter,
    settings: settingsRouter,
    downloads: downloadsRouter,
  },
  {
    pathPrefix: '/api',
  },
);
