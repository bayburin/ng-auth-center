import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthHelper } from './auth.helper';
import { AuthState } from './../store/auth.state';
import { AuthStateStub } from './../store/auth.state.stub';

describe('AuthHelper', () => {
  let helper: AuthHelper;
  let authState: AuthState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: AuthState, useClass: AuthStateStub }
      ]
    });

    helper = TestBed.inject(AuthHelper);
    authState = TestBed.inject(AuthState);
  });

  describe('#getJwtPayload', () => {
    let jwtHelper: JwtHelperService;
    let jwtSpy: jasmine.Spy;

    beforeEach(() => {
      jwtHelper = TestBed.inject(JwtHelperService);
      jwtSpy = spyOn(jwtHelper, 'decodeToken');
    });

    it('should call "decodeToken" with jwt from AuthState', () => {
      helper.getJwtPayload();

      expect(jwtSpy).toHaveBeenCalledWith(authState.getJwt());
    });

    it('should return null if jwt is empty', () => {
      spyOn(authState, 'getJwt').and.returnValue(null);

      expect(helper.getJwtPayload()).toBeNull();
    });

    it('should return payload object if jwt is not empty', () => {
      const payload = { foo: 'bar' };
      jwtSpy.and.returnValue(payload);

      expect(helper.getJwtPayload()).toEqual(payload);
    });
  });

  describe('#logout', () => {
    let router: Router;

    beforeEach(() => {
      router = TestBed.inject(Router);
    });

    it('should redirect to "unauthorized" page', () => {
      spyOn(router, 'navigate');
      helper.logout();

      expect(router.navigate).toHaveBeenCalledWith(['oauth2', 'unauthorized']);
    });
  });

  describe('#getRawJwt', () => {
    it('should return raw jwt string', () => {
      const jwt = 'raw jwt';
      spyOn(authState, 'getJwt').and.returnValue(jwt);

      expect(helper.getRawJwt()).toEqual(jwt);
    });
  });
});
