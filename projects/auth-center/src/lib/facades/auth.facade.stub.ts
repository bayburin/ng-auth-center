import { Params } from '@angular/router';

import { AuthFacadeAbstract } from './auth.facade.abstract';

export class AuthFacadeStub extends AuthFacadeAbstract {
  loginWithRedirect(): void {}
  initAuthenticateProcess(params: Params): void {}
  logout(): void {}
  getAppName(): string {
    return 'test';
  }
}
