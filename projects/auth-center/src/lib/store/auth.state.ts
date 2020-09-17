import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CONFIG } from '../auth-center.config';
import { IConfig } from '../interfaces/config.interface';
import { RequestState } from '../models/request-state/request-state.model';
import { AuthStateAbstract } from './auth.state.abstract';

@Injectable({
  providedIn: 'root'
})
export class AuthState extends AuthStateAbstract {
  constructor(@Inject(CONFIG) private config: IConfig) {
    super();
    this.requestState$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.state));
    this.jwt$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.jwt));
    this.returnUrl$ = new BehaviorSubject(localStorage.getItem(this.config.storageNaming.returnUrl));
    this.isLoading$ = new BehaviorSubject(false);
    this.error$ = new BehaviorSubject(null);
    this.isAuthenticated$ = new BehaviorSubject(!!this.getJwt());
  }

  getIsAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated$.next(isAuthenticated);
  }

  getRequestState$(): Observable<RequestState> {
    return this.requestState$.asObservable().pipe(map(state => new RequestState(state)));
  }

  setRequestState(requestState: RequestState): void {
    localStorage.setItem(this.config.storageNaming.state, requestState.value);
    this.requestState$.next(requestState.value);
  }

  removeRequestState(): void {
    localStorage.removeItem(this.config.storageNaming.state);
    this.requestState$.next(null);
  }

  getJwt(): string {
    return this.jwt$.getValue();
  }

  setJwt(jwt: string): void {
    localStorage.setItem(this.config.storageNaming.jwt, jwt);
    this.jwt$.next(jwt);
  }

  removeJwt(): void {
    localStorage.removeItem(this.config.storageNaming.jwt);
    this.jwt$.next(null);
  }

  getReturnUrl(): string {
    return this.returnUrl$.getValue();
  }

  setReturnUrl(url: string): void {
    localStorage.setItem(this.config.storageNaming.returnUrl, url);
    this.returnUrl$.next(url);
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }

  getError$(): Observable<any> {
    return this.error$.asObservable();
  }

  setError(error: any): void {
    this.error$.next(error);
  }
}
