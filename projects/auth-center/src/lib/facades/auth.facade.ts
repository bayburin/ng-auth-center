import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Params, Router } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { AuthState } from './../store/auth.state';
import { RequestState } from '../models/request-state/request-state.model';
import { finalize } from 'rxjs/operators';
import { IConfig } from './../interfaces/config.interface';
import { CONFIG } from '../auth-center.config';
import { AuthFacadeAbstract } from './auth.facade.abstract';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade extends AuthFacadeAbstract {
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private router: Router,
    @Inject(CONFIG) private config: IConfig
  ) {
    super();
    this.isLoading$ = this.authState.getIsLoading$();
    this.error$ = this.authState.getError$();
  }

  loginWithRedirect(): void {
    const state = new RequestState();

    state.generateCode();
    this.authState.setRequestState(state);
    this.authService.redirectToAuthorizationServer(state);
  }

  initAuthenticateProcess(params: Params): void {
    if (params.error) {
      this.authState.setError({ error: params.error });

      return;
    }

    this.authState.setIsLoading(true);
    this.authState.removeRequestState();
    this.authService.getJwt(params).pipe(
      finalize(() => this.authState.setIsLoading(false))
    ).subscribe(
      data => {
        this.authState.setJwt(data.token);

        setTimeout(() => {
          this.authState.setIsAuthenticated(true);
          this.router.navigateByUrl(this.authState.getReturnUrl());
          this.authState.setReturnUrl('/');
        }, 1000);
      },
      error => {
        console.log(error);
        this.authState.setError(error);
      }
    );
  }

  logout(): void {
    this.authState.setIsAuthenticated(false);
    this.authState.removeJwt();
  }

  getAppName(): string {
    return this.config.appName;
  }
}
