import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Params } from '@angular/router';

import { AuthService } from './auth.service';
import { CONFIG } from '../auth-center.config';
import { defaultConfig } from './../auth-center.config';
import { RequestState } from '../models/request-state/request-state.model';
import { IConfig } from './../interfaces/config.interface';
import { IAuthData } from './../interfaces/auth-data.interface';

describe('AuthService', () => {
  let service: AuthService;
  let config: IConfig;
  let httpMock: HttpTestingController;
  const authData: IAuthData = { token: 'fake-jwt-token' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CONFIG, useValue: defaultConfig }],
    });

    service = TestBed.inject(AuthService);
    config = TestBed.inject(CONFIG);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#redirectToAuthorizationServer', () => {
    it('should open window with authentication page', () => {
      spyOn(window, 'open');
      const requestStateValue = 'fake-request-state';
      const state = new RequestState(requestStateValue);
      const url = `${config.authorizationServer}?client_id=${config.clientId}&response_type=${config.responseType}&state=${state.value}&redirect_uri=${config.redirectUrl}&scope=${config.scope}`;

      service.redirectToAuthorizationServer(state);
      expect(window.open).toHaveBeenCalledWith(url, '_self');
    });
  });

  describe('#getJwt', () => {
    it('should return Observable with auth data', () => {
      const params: Params = { code: 'fake-code' };

      service.getJwt(params).subscribe((result) => {
        expect(result).toEqual(authData);
      });

      httpMock
        .expectOne({
          method: 'POST',
          url: config.serverUrl,
        })
        .flush(authData);
    });
  });
});
