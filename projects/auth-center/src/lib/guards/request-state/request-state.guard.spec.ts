import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

import { RequestStateGuard } from './request-state.guard';
import { AuthState } from './../../store/auth.state';
import { AuthStateStub } from './../../store/auth.state.stub';
import { RequestState } from '../../models/request-state/request-state.model';

describe('RequestStateGuard', () => {
  let guard: RequestStateGuard;
  let authState: AuthState;
  let requestState: RequestState;
  let isValidSpy: jasmine.Spy;
  let router: Router;
  let stubSnapshot: RouterStateSnapshot;
  let stubSnapshotProxy: any;
  const state = 'fake-state';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthState, useClass: AuthStateStub }]
    });

    guard = TestBed.inject(RequestStateGuard);
    authState = TestBed.inject(AuthState);
    requestState = new RequestState();
    spyOn(authState, 'getRequestState$').and.returnValue(of(requestState));
    isValidSpy = spyOn(requestState, 'isValid');
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    stubSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['root']);
    stubSnapshotProxy = new Proxy(stubSnapshot, {
      get(target, property) {
        if (property === 'root') {
          return {
            queryParams: { state }
          };
        }
      }
    });
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call "isValid" method with params from "state" attribute', () => {
    guard.canActivate(null, stubSnapshotProxy).subscribe(result => {
      expect(isValidSpy).toHaveBeenCalledWith(state);
    });
  });

  it('should return true if request state is valid', () => {
    isValidSpy.and.returnValue(true);

    guard.canActivate(null, stubSnapshotProxy).subscribe(result => {
      expect(result).toBeTrue();
    });
  });

  describe('when request state is invalid', () => {
    beforeEach(() => {
      isValidSpy.and.returnValue(false);
    });

    it('should redirect to authorize_forbidden page', () => {
      guard.canActivate(null, stubSnapshotProxy).subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['oauth2', 'authorize_forbidden']);
      });
    });

    it('should return false', () => {
      guard.canActivate(null, stubSnapshotProxy).subscribe(result => {
        expect(result).toBeFalse();
      });
    });
  });
});
