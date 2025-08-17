import { serverSettingsRouter } from './serverSettingsRouter';
import { c } from '../../contract';

export const settingsRouter = c.router(
  {
    server: serverSettingsRouter,
  },
  {
    pathPrefix: '/settings',
  },
);
