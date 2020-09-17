import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthState } from '../../store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class RequestStateGuard implements CanActivate {
  constructor(
    private authState: AuthState,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authState.getRequestState$().pipe(
      map(requestState => {
        if (requestState.isValid(state.root.queryParams.state)) {
          return true;
        }

        this.router.navigate(['oauth2', 'authorize_forbidden']);
        return false;
      })
    );
  }
}
