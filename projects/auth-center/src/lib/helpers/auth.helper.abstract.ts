import { Observable } from 'rxjs';

import { CurrentUser } from './../models/current-user/current-user.model';

export abstract class AuthHelperAbstract {
  /**
   * Флаг, показывающий, авторизован ли пользователь.
   */
  isAuthenticated$: Observable<boolean>;

  /**
   * Возвращает текущего пользователя.
   */
  // abstract getCurrentUser(): CurrentUser;

  /**
   * Возвращает данные из JWT
   */
  abstract getJwtPayload(): any;

  /**
   * Редиректит на страницу "/oauth2/unauthorized" для выхода из приложения.
   */
  abstract logout(): void;

  /**
   * Возвращает сырой JWT.
   */
  abstract getRawJwt(): string;
}
