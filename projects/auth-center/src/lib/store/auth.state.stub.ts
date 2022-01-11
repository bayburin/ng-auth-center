import { Observable, of } from 'rxjs';
import { AuthStateAbstract } from './auth.state.abstract';

import { RequestState } from '../models/request-state/request-state.model';

export const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF90biI6IjU0MzIxIiwidG4iOiIxMjM0NSIsImZpbyI6ItCk0L7RgNGC0L7Rh9C60LjQvdCwINCa0LvQsNCy0LTQuNGPINCY0LLQsNC90L7QstC90LAiLCJkZXB0IjoiNzE0IiwiYXV0aF9kYXRhIjp7ImFjY2Vzc190b2tlbiI6ImZha2Utand0LXRva2VuIiwiZXhwaXJlZF90aW1lIjoiMTIzNDU2In19.G4wgcZDQOLyCHD_lKpO5nNGwjMA68qDWUfpb41WWZbg';

export class AuthStateStub extends AuthStateAbstract {
  getIsAuthenticated$(): Observable<boolean> {
    return of(false);
  }
  setIsAuthenticated(isAuthenticated: boolean): void {}
  getRequestState$(): Observable<RequestState> {
    return of(new RequestState());
  }
  setRequestState(requestState: RequestState): void {}
  removeRequestState(): void {}
  getJwt(): string {
    return fakeToken;
  }
  setJwt(jwt: string): void {}
  removeJwt(): void {}
  getReturnUrl(): string {
    return '/';
  }
  setReturnUrl(url: string): void {}
  getIsLoading$(): Observable<boolean> {
    return of(false);
  }
  setIsLoading(isLoading: boolean): void {}
  getError$(): Observable<any> {
    return of({});
  }
  setError(error: any): void {}
}
