import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthHelper } from './auth.helper';
import { AuthState } from './../store/auth.state';
import { AuthStateStub, fakeToken } from './../store/auth.state.stub';
// import { CurrentUser } from './../models/current-user/current-user.model';

describe('AuthHelper', () => {
  let helper: AuthHelper;

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
  });

  // describe('#getCurrentUser', () => {
  //   let jwtHelper: JwtHelperService;
  //   let jwtSpy: jasmine.Spy;
  //   let authState: AuthState;

  //   beforeEach(() => {
  //     jwtHelper = TestBed.inject(JwtHelperService);
  //     authState = TestBed.inject(AuthState);
  //     jwtSpy = spyOn(authState, 'getJwt');
  //   });

  //   it('should call "decodeToken" with jwt from AuthState', () => {
  //     spyOn(jwtHelper, 'decodeToken');
  //     helper.getCurrentUser();

  //     expect(jwtHelper.decodeToken).toHaveBeenCalledWith(authState.getJwt());
  //   });

  //   it('should return null if jwt is empty', () => {
  //     jwtSpy.and.returnValue(null);

  //     expect(helper.getCurrentUser()).toBeNull();
  //   });

  //   it('should return CurrentUser instance if jwt is not empty', () => {
  //     jwtSpy.and.returnValue(fakeToken);

  //     expect(helper.getCurrentUser()).toBeInstanceOf(CurrentUser);
  //   });
  // });

  describe('#getJwtPayload', () => {
    let jwtHelper: JwtHelperService;
    let jwtSpy: jasmine.Spy;
    let authState: AuthState;

    beforeEach(() => {
      jwtHelper = TestBed.inject(JwtHelperService);
      authState = TestBed.inject(AuthState);
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
});
