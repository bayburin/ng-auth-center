import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { AuthState } from './../store/auth.state';
import { AuthHelperAbstract } from './auth.helper.abstract';

@Injectable({
  providedIn: 'root',
})
export class AuthHelper extends AuthHelperAbstract {
  constructor(private state: AuthState, private jwtHelper: JwtHelperService, private router: Router) {
    super();
    this.isAuthenticated$ = this.state.getIsAuthenticated$();
  }

  getJwtPayload(): any {
    const decoded = this.jwtHelper.decodeToken(this.state.getJwt());

    return decoded || null;
  }

  logout(): void {
    this.router.navigate(['oauth2', 'unauthorized']);
  }

  getRawJwt(): string {
    return this.state.getJwt();
  }
}
