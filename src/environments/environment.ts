// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientId: '82',
    // redirectUrl: 'https://localhost.iss-reshetnev.ru:4200/oauth2/callback',
    redirectUrl: 'http://localhost:4200/oauth2/callback',
    serverUrl: 'http://localhost:3000/api/v1/auth/token',
    appName: 'Орбита',
    jwtOptions: {
      allowedDomains: ['localhost:3000'],
      disallowedRoutes: []
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
