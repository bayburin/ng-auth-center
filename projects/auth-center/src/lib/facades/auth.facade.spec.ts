import { of, throwError } from 'rxjs';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthFacade } from './auth.facade';
import { AuthService } from './../services/auth.service';
import { AuthServiceStub } from './../services/auth-service.stub';
import { CONFIG } from '../auth-center.config';
import { defaultConfig } from './../auth-center.config';
import { IConfig } from './../interfaces/config.interface';
import { AuthState } from './../store/auth.state';
import { AuthStateStub } from './../store/auth.state.stub';

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let config: IConfig;
  let authState: AuthState;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: AuthState, useClass: AuthStateStub },
        { provide: CONFIG, useValue: defaultConfig },
      ],
    });

    facade = TestBed.inject(AuthFacade);
    config = TestBed.inject(CONFIG);
    authState = TestBed.inject(AuthState);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('#loginWithRedirect', () => {
    beforeEach(() => {
      spyOn(authState, 'setRequestState');
      spyOn(authService, 'redirectToAuthorizationServer');

      facade.loginWithRedirect();
    });

    it('should call "setRequestState" method', () => {
      expect(authState.setRequestState).toHaveBeenCalled();
    });

    it('should call "redirectToAuthorizationServer" method', () => {
      expect(authService.redirectToAuthorizationServer).toHaveBeenCalled();
    });
  });

  describe('#initAuthenticateProcess', () => {
    let params: any;

    beforeEach(() => {
      spyOn(authState, 'setIsLoading');
      spyOn(authState, 'removeRequestState');
      spyOn(router, 'navigateByUrl');
      params = { code: 'fake-code', error: null };
    });

    describe('if received error', () => {
      beforeEach(() => {
        params.error = 'access_denied';
        spyOn(authState, 'setError');
        facade.initAuthenticateProcess(params);
      });

      it('should set error', () => {
        expect(authState.setError).toHaveBeenCalledWith({ error: params.error });
      });

      it('should stop processing', () => {
        expect(authState.setIsLoading).not.toHaveBeenCalled();
      });
    });

    describe('common part', () => {
      beforeEach(() => {
        spyOn(authService, 'getJwt').and.callThrough();

        facade.initAuthenticateProcess(params);
      });

      it('should call "setIsLoading" method with true and false values', () => {
        expect(authState.setIsLoading).toHaveBeenCalledWith(true);
        expect(authState.setIsLoading).toHaveBeenCalledWith(false);
      });

      it('should call "removeRequestState" method', () => {
        expect(authState.removeRequestState).toHaveBeenCalled();
      });

      it('should call "getJwt" method', () => {
        expect(authService.getJwt).toHaveBeenCalledWith(params);
      });
    });

    describe('when "getJwt" Observable returns true', () => {
      const response = { token: 'fake-jwt' };

      beforeEach(() => {
        spyOn(authService, 'getJwt').and.returnValue(of(response));
        spyOn(authState, 'setJwt');
        spyOn(authState, 'setIsAuthenticated');
      });

      it('should call "setJwt" method', () => {
        facade.initAuthenticateProcess(params);

        expect(authState.setJwt).toHaveBeenCalledWith(response.token);
      });

      it('should call "setIsAuthenticated" method', fakeAsync(() => {
        facade.initAuthenticateProcess(params);
        tick(1010);

        expect(authState.setIsAuthenticated).toHaveBeenCalledWith(true);
      }));

      it('should redirect to url received from "returnUrl" attribute', fakeAsync(() => {
        facade.initAuthenticateProcess(params);
        const newUrl = 'fake-new-url';
        spyOn(authState, 'getReturnUrl').and.returnValue(newUrl);
        tick(1010);

        expect(router.navigateByUrl).toHaveBeenCalledWith(newUrl);
      }));

      it('should set new "returnUrl"', fakeAsync(() => {
        facade.initAuthenticateProcess(params);
        spyOn(authState, 'setReturnUrl');
        tick(1010);

        expect(authState.setReturnUrl).toHaveBeenCalledWith('/');
      }));
    });

    describe('when "getJwt" Observable returns false', () => {
      it('should call "setError" method', () => {
        const error = { message: 'error message' };
        spyOn(authService, 'getJwt').and.returnValue(throwError(error));
        spyOn(authState, 'setError');
        facade.initAuthenticateProcess(params);

        expect(authState.setError).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('#logout', () => {
    beforeEach(() => {
      spyOn(authState, 'setIsAuthenticated');
      spyOn(authState, 'removeJwt');

      facade.logout();
    });

    it('should call "setIsAuthenticated" method with false value', () => {
      expect(authState.setIsAuthenticated).toHaveBeenCalledWith(false);
    });

    it('should call "removeJwt"', () => {
      expect(authState.removeJwt).toHaveBeenCalled();
    });
  });

  describe('#getAppName', () => {
    it('should return "appName" attribute', () => {
      expect(facade.getAppName()).toEqual(config.appName);
    });
  });
});
