import { AuthState } from '../store/auth.state';
import { IConfig } from './../interfaces/config.interface';

export function jwtOptionsFactory(authState: AuthState, config: IConfig) {
  return {
    tokenGetter: () => {
      return authState.getJwt();
    },
    skipWhenExpired: true,
    allowedDomains: config.jwtOptions.allowedDomains,
    disallowedRoutes: config.jwtOptions.disallowedRoutes,
  };
}
