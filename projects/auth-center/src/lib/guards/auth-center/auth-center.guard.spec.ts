import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { AuthCenterGuard } from './auth-center.guard';
import { AuthFacade } from '../../facades/auth.facade';
import { AuthFacadeStub } from './../../facades/auth.facade.stub';
import { AuthState } from './../../store/auth.state';
import { AuthStateStub } from './../../store/auth.state.stub';

describe('AuthCenterGuard', () => {
  let guard: AuthCenterGuard;
  let authState: AuthState;
  let authFacade: AuthFacade;
  let stubSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthFacade, useClass: AuthFacadeStub },
        { provide: AuthState, useClass: AuthStateStub }
      ]
    });

    guard = TestBed.inject(AuthCenterGuard);
    authState = TestBed.inject(AuthState);
    authFacade = TestBed.inject(AuthFacade);
    stubSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['url']);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if "getIsAuthenticated$" method returns true', () => {
    spyOn(authState, 'getIsAuthenticated$').and.returnValue(of(true));

    guard.canActivate(null, stubSnapshot).subscribe(result => {
      expect(result).toBeTrue();
    });
  });

  describe('when "getIsAuthenticated$" method returns false', () => {
    beforeEach(() => {
      spyOn(authState, 'getIsAuthenticated$').and.returnValue(of(false));
      spyOn(authState, 'setReturnUrl');
      spyOn(authFacade, 'loginWithRedirect');
    });

    it('should call "setReturnUrl" method', () => {
      guard.canActivate(null, stubSnapshot).subscribe(() => {
        expect(authState.setReturnUrl).toHaveBeenCalledWith(stubSnapshot.url);
      });
    });

    it('should call "loginWithRedirect" method', () => {
      guard.canActivate(null, stubSnapshot).subscribe(() => {
        expect(authFacade.loginWithRedirect).toHaveBeenCalled();
      });
    });
  });
});
