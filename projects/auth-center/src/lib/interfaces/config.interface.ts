export interface IStorageNaming {
  jwt: string;
  state: string;
  returnUrl: string;
}

export interface IJwtOptions {
  allowedDomains: string[];
  disallowedRoutes: string[];
}

export interface IConfig {
  authorizationServer?: string;
  serverUrl: string;
  clientId: string;
  responseType?: string;
  state?: string;
  redirectUrl: string;
  scope?: string;
  storageNaming?: IStorageNaming;
  appName: string;
  jwtOptions?: IJwtOptions;
}
