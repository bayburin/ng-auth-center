import { Params } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthData } from './../interfaces/auth-data.interface';
import { RequestState } from '../models/request-state/request-state.model';

export abstract class AuthServiceAbstract {
  /**
   * Делает редирект для аутентификации пользователя в ЦА.
   */
  abstract redirectToAuthorizationServer(state: RequestState): void;

  /**
   * Делает POST запрос на сервер с полученным кодом для получения JWT.
   *
   * @param params - объект Params, содержащий атрибут "code".
   */
  abstract getJwt(params: Params): Observable<IAuthData>;
}
