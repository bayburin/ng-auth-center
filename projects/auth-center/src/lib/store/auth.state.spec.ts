import { TestBed } from '@angular/core/testing';

import { AuthState } from './auth.state';
import { IConfig } from './../interfaces/config.interface';
import { CONFIG } from '../auth-center.config';
import { defaultConfig } from './../auth-center.config';
import { RequestState } from '../models/request-state/request-state.model';

describe('AuthState', () => {
  let state: AuthState;
  let config: IConfig;
  const jwt = 'fake-jwt-token';
  const requestStateValue = 'fake-request-state';
  const returnUrl = 'fake-return-url';
  const error = { message: 'fake-error-message' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CONFIG, useValue: defaultConfig }]
    });

    config = TestBed.inject(CONFIG);
  });

  describe('isAuthenticated$ attribute', () => {
    it('should be false if jwt does not exist', () => {
      localStorage.removeItem(config.storageNaming.jwt);
      state = TestBed.inject(AuthState);

      state.getIsAuthenticated$().subscribe(result => {
        expect(result).toBeFalse();
      });
    });

    it('should be true if jwt exists', () => {
      localStorage.setItem(config.storageNaming.jwt, jwt);
      state = TestBed.inject(AuthState);

      state.getIsAuthenticated$().subscribe(result => {
        expect(result).toBeTrue();
      });
    });

    describe('#setIsAuthenticated', () => {
      it('should emit new value', () => {
        state = TestBed.inject(AuthState);
        state.setIsAuthenticated(true);

        state.getIsAuthenticated$().subscribe(result => {
          expect(result).toBeTrue();
        });
      });
    });
  });

  describe('requestState$ attribute', () => {
    describe('#getRequestState$', () => {
      beforeEach(() => {
        localStorage.setItem(config.storageNaming.state, requestStateValue);
        state = TestBed.inject(AuthState);
      });

      it('should get instance of RequestState model', () => {
        state.getRequestState$().subscribe(result => {
          expect(result).toBeInstanceOf(RequestState);
        });
      });

      it('should get initial value from localStorage', () => {
        state.getRequestState$().subscribe(result => {
          expect(result).toEqual(new RequestState(requestStateValue));
        });
      });
    });

    describe('#setRequestState', () => {
      beforeEach(() => {
        localStorage.removeItem(config.storageNaming.state);
        state = TestBed.inject(AuthState);
        state.setRequestState(new RequestState(requestStateValue));
      });

      it('should set new value in localStorage', () => {
        state.getRequestState$().subscribe(() => {
          expect(localStorage.getItem(config.storageNaming.state)).toEqual(requestStateValue);
        });
      });

      it('should emit new value', () => {
        state.getRequestState$().subscribe(result => {
          expect(result).toEqual(new RequestState(requestStateValue));
        });
      });
    });

    describe('#removeRequestState', () => {
      beforeEach(() => {
        state = TestBed.inject(AuthState);
        state.setRequestState(new RequestState(requestStateValue));
        state.removeRequestState();
      });

      it('should remove value from localStorage', () => {
        state.getRequestState$().subscribe(() => {
          expect(localStorage.getItem(config.storageNaming.state)).toBeNull();
        });
      });

      it('should emit null value', () => {
        state.getRequestState$().subscribe(result => {
          expect(result.value).toBeNull();
        });
      });
    });
  });

  describe('jwt$ attribute', () => {
    describe('initialize', () => {
      beforeEach(() => {
        localStorage.setItem(config.storageNaming.jwt, jwt);
        state = TestBed.inject(AuthState);
      });

      it('should get initial value from localStorage', () => {
        expect(state.getJwt()).toEqual(jwt);
      });
    });

    describe('#setJwt', () => {
      beforeEach(() => {
        localStorage.removeItem(config.storageNaming.jwt);
        state = TestBed.inject(AuthState);
        state.setJwt(jwt);
      });

      it('should set new value in localStorage', () => {
        expect(localStorage.getItem(config.storageNaming.jwt)).toEqual(jwt);
      });

      it('should emit new value', () => {
        expect(state.getJwt()).toEqual(jwt);
      });
    });

    describe('#removeJwt', () => {
      beforeEach(() => {
        state = TestBed.inject(AuthState);
        state.setJwt(jwt);
        state.removeJwt();
      });

      it('should remove value from localStorage', () => {
        expect(localStorage.getItem(config.storageNaming.jwt)).toBeNull();
      });

      it('should emit null value', () => {
        expect(state.getJwt()).toBeNull();
      });
    });
  });

  describe('returnUrl$ attribute', () => {
    describe('initialize', () => {
      beforeEach(() => {
        localStorage.setItem(config.storageNaming.returnUrl, returnUrl);
        state = TestBed.inject(AuthState);
      });

      it('should get initial value from localStorage', () => {
        expect(state.getReturnUrl()).toEqual(returnUrl);
      });
    });

    describe('#setReturnUrl', () => {
      beforeEach(() => {
        localStorage.removeItem(config.storageNaming.returnUrl);
        state = TestBed.inject(AuthState);
        state.setReturnUrl(returnUrl);
      });

      it('should set new value in localStorage', () => {
        expect(localStorage.getItem(config.storageNaming.returnUrl)).toEqual(returnUrl);
      });

      it('should emit new value', () => {
        expect(state.getReturnUrl()).toEqual(returnUrl);
      });
    });
  });

  describe('isLoading$ attribute', () => {
    beforeEach(() => {
      state = TestBed.inject(AuthState);
    });

    it('should be false', () => {
      state.getIsLoading$().subscribe(result => {
        expect(result).toBeFalse();
      });
    });

    it('should emit new value if its set', () => {
      state.setIsLoading(true);

      state.getIsLoading$().subscribe(result => {
        expect(result).toBeTrue();
      });
    });
  });

  describe('error$ attribute', () => {
    beforeEach(() => {
      state = TestBed.inject(AuthState);
    });

    it('should be null', () => {
      state.getError$().subscribe(result => {
        expect(result).toBeNull();
      });
    });

    it('should emit new value if its set', () => {
      state.setError(error);

      state.getError$().subscribe(result => {
        expect(result).toEqual(error);
      });
    });
  });
});
