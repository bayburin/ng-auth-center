import { Observable } from 'rxjs';
import { Params } from '@angular/router';

export abstract class AuthFacadeAbstract {
  /**
   * Флаг, показывающий, авторизован ли пользователь.
   */
  isLoading$: Observable<boolean>;

  /**
   * Объект, содержащий ошибку привыполнении запроса к серверу.
   */
  error$: Observable<any>;

  /**
   * Запускает процесс аутентификации и редиректит на ЦА.
   */
  abstract loginWithRedirect(): void;

  /**
   * После ответа от ЦА получает JWT, информацию о пользователе и редиректит на запрашиваемую пользователем страницу.
   */
  abstract initAuthenticateProcess(params: Params): void;

  /**
   * Выходит из приложения (Удаляет JWT и устанавливает false в isAuthenticated).
   */
  abstract logout(): void;

  /**
   * Возвращает имя приложения.
   */
  abstract getAppName(): string;
}
