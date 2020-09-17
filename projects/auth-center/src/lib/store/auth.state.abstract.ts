import { BehaviorSubject, Observable } from 'rxjs';

import { RequestState } from '../models/request-state/request-state.model';

export abstract class AuthStateAbstract {
  /**
   * Флаг, показывающий, авторизован ли пользователь.
   */
  protected isAuthenticated$: BehaviorSubject<boolean>;

  /**
   * Код проверки, генерируемый приложением и затем полученный от ЦА. Используется для проверки запроса на соответствие.
   */
  protected requestState$: BehaviorSubject<string>;

  /**
   * JWT, полученный от сервера авторизации. Содержит данные о пользователе.
   */
  protected jwt$: BehaviorSubject<string>;

  /**
   * URL, на который проиойдет редирект после успешного процесса авторизации.
   */
  protected returnUrl$: BehaviorSubject<string>;

  /**
   * Флаг, показывающий, что происходит обращение к серверу.
   */
  protected isLoading$: BehaviorSubject<boolean>;

  /**
   * Объект, содержащий ошибку привыполнении запроса к серверу.
   */
  protected error$: BehaviorSubject<any>;

  /**
   * Возвращает флаг isAuthenticated$.
   */
  abstract getIsAuthenticated$(): Observable<boolean>;

  /**
   * Устанавливает флаг isAuthenticated$.
   *
   * @param isAuthenticated - новый флаг isAuthenticated$.
   */
  abstract setIsAuthenticated(isAuthenticated: boolean): void;

  /**
   * Возвращает код проверки requestState$.
   */
  abstract getRequestState$(): Observable<RequestState>;

  /**
   * Устанавливает код проверки requestState$ в localStorage.
   *
   * @param requestState - объект RequestState, содержащий новй код проверки.
   */
  abstract setRequestState(requestState: RequestState): void;

  /**
   * Удаляет код проверки requestState$ из localStorage.
   */
  abstract removeRequestState(): void;

  /**
   * Возвращает JWT jwt$.
   */
  abstract getJwt(): string;

  /**
   * Устанавливает JWT jwt$ в localStorage.
   *
   * @param jwt - новый jwt$.
   */
  abstract setJwt(jwt: string): void;

  /**
   * Удаляет JWT jwt$ из localStorage.
   */
  abstract removeJwt(): void;

  /**
   * Возвращает адрес returnUrl$.
   */
  abstract getReturnUrl(): string;

  /**
   * Устанавливает новый адрес returnUrl$.
   *
   * @param url - новй адрес returnUrl$.
   */
  abstract setReturnUrl(url: string): void;

  /**
   * Возвращает флаг isLoading$.
   */
  abstract getIsLoading$(): Observable<boolean>;

  /**
   * Устанавливает флаг isLoading$.
   *
   * @param isLoading - новый флаг isLoading$.
   */
  abstract setIsLoading(isLoading: boolean): void;

  /**
   * Возвращает объект error$.
   */
  abstract getError$(): Observable<any>;

  /**
   * Устанавливает объект $error.
   *
   * @param error - новый объект error$.
   */
  abstract setError(error: any): void;
}
