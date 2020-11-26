import { Observable } from 'rxjs';

export abstract class AuthHelperAbstract {
  /**
   * Флаг, показывающий, авторизован ли пользователь.
   */
  isAuthenticated$: Observable<boolean>;

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
