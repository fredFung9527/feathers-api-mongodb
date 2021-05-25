import { ServiceAddons, Params } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy, AuthenticationRequest } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
import { Application } from './declarations';
import error from '@feathersjs/errors';
import axios from 'axios'

class MyJwtStrategy extends JWTStrategy {
  authenticate(authentication: AuthenticationRequest, params: Params): Promise<{
    accessToken: any;
    authentication: {
      strategy: string;
      accessToken: any;
      payload: any;
    };
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const setting = this.app?.get('authentication');
        const centralAuthenticationJWTURL = setting?.centralAuthenticationURL;
        if (!centralAuthenticationJWTURL) {
          throw new error.GeneralError('No Central Authentication URL Provided');
        }

        const { accessToken } = authentication;
        if (!accessToken) {
          throw new error.NotAuthenticated('No access token');
        }
        
        const result = await axios.post(centralAuthenticationJWTURL, {
          strategy: 'jwt',
          accessToken: accessToken
        });
        resolve(result.data);
      } catch (e) {
        reject(new error.NotAuthenticated(e?.response?.data?.message || e.message || 'Authentication Fail'));
      }
    })
  };
}

class MyLocalStrategy extends LocalStrategy {
  authenticate(data: AuthenticationRequest, params: Params): Promise<{
    [x: number]: any;
    authentication: {
      strategy: string;
    };
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const setting = this.app?.get('authentication');
        const centralAuthenticationJWTURL = setting?.centralAuthenticationURL;
        if (!centralAuthenticationJWTURL) {
          throw new error.GeneralError('No Central Authentication URL Provided');
        }

        const { email, password } = data;
        if (!email || !password) {
          throw new error.BadRequest('No Enough Information');
        }

        const result = await axios.post(centralAuthenticationJWTURL, {
          strategy: 'local',
          email,
          password
        });
        resolve(result.data);
      } catch (e) {
        reject(new error.NotAuthenticated(e?.response?.data?.message || e.message || 'Authentication Fail'));
      }
    });
  };
}

declare module './declarations' {
  interface ServiceTypes {
    'central-authentication': AuthenticationService & ServiceAddons<any>;
  }
}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new MyJwtStrategy());
  authentication.register('local', new MyLocalStrategy());

  app.use('/central-authentication', authentication);
  app.configure(expressOauth());
}
