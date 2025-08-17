import { createNextHandler } from '@ts-rest/serverless/next';
import { spawn } from 'child_process';
import { once } from 'events';

import { rootRouter } from '../../../../../contract/rootRouter';
import { errorHandler } from '../../../../../server/errorHandler';

const noop = () => {
  // empty
};

const handler = createNextHandler(
  rootRouter.api.settings.server,
  {
    logInMega: async ({ body: { email, password } }) => {
      const login = spawn('mega-exec', ['login', email, password]);

      let stderr = '';
      login.stdout.on('data', noop);
      login.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      await once(login, 'close');

      if (login.exitCode !== 0) {
        throw new Error(stderr || 'mega-login failed');
      }

      return {
        status: 200,
        body: {
          email,
        },
      };
    },
    logOutMega: async () => {
      const logout = spawn('mega-exec', ['logout']);

      let stderr = '';
      logout.stdout.on('data', noop);
      logout.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      await once(logout, 'close');

      if (logout.exitCode !== 0) {
        throw new Error(stderr || 'mega-logout failed');
      }

      return {
        status: 200,
        body: undefined,
      };
    },
    whoAmI: async () => {
      const whoami = spawn('mega-exec', ['whoami']);

      let stdout = '';
      whoami.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      let stderr = '';
      whoami.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      await once(whoami, 'close');

      if (stderr.includes('Not logged in')) {
        return {
          status: 200,
          body: {
            loggedIn: false,
          },
        };
      }

      if (whoami.exitCode !== 0) {
        throw new Error(stderr || 'mega-whoami failed');
      }

      return {
        status: 200,
        body: {
          loggedIn: true,
          // stdout is in the form: `Account e-mail: bramer.bo@gmail.com`
          email: stdout.split(':')[1].trim(),
        },
      };
    },
  },
  {
    handlerType: 'app-router',
    jsonQuery: true,
    responseValidation: true,
    errorHandler,
  },
);

export { handler as POST, handler as GET };
