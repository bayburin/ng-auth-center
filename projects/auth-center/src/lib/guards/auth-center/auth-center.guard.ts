import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthState } from './../../store/auth.state';
import { AuthFacade } from './../../facades/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthCenterGuard implements CanActivate {
  constructor(private authState: AuthState, private authFacade: AuthFacade) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authState.getIsAuthenticated$().pipe(
      map((isAuthenticated) => !!isAuthenticated),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.authState.setReturnUrl(state.url);
          // this.router.navigate(['oauth2', 'unauthorized']);
          this.authFacade.loginWithRedirect();
        }
      })
    );
  }
}
