import { Observable, of } from 'rxjs';

import { AuthServiceAbstract } from './auth.service.abstract';
import { IAuthData } from './../interfaces/auth-data.interface';

export class AuthServiceStub extends AuthServiceAbstract {
  redirectToAuthorizationServer(): void {}
  getJwt(): Observable<IAuthData> {
    return of({} as IAuthData);
  }
}
