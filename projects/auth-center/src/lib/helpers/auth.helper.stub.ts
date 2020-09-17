import { AuthHelperAbstract } from './auth.helper.abstract';

export class AuthHelperStub extends AuthHelperAbstract {
  getJwtPayload(): any { return { }; }
  logout(): void { }
}
