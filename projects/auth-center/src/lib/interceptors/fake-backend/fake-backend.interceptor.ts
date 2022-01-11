import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { materialize, dematerialize, delay, switchMap, mergeMap } from 'rxjs/operators';

import { CONFIG } from '../../auth-center.config';
import { IConfig } from './../../interfaces/config.interface';
import { IAuthData } from './../../interfaces/auth-data.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(@Inject(CONFIG) private config: IConfig) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const config = this.config;

    return of(null).pipe(mergeMap(handleRequest), materialize(), delay(1000), dematerialize());

    function handleRequest(): Observable<any> {
      switch (true) {
        case request.url === config.serverUrl && request.method === 'POST':
          return authorize();
        default:
          return next.handle(request);
      }
    }

    function authorize(): Observable<any> {
      // const body = {
      //   id_tn: 54321,
      //   tn: 12345,
      //   fio: 'Форточкина Клавдия Ивановна',
      //   dept: 714,
      //   auth_data: {
      //     access_token: 'fake-jwt-token',
      //     expired_time: 123456
      //   }
      // };
      const fakeToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF90biI6IjU0MzIxIiwidG4iOiIxMjM0NSIsImZpbyI6ItCk0L7RgNGC0L7Rh9C60LjQvdCwINCa0LvQsNCy0LTQuNGPINCY0LLQsNC90L7QstC90LAiLCJkZXB0IjoiNzE0IiwiYXV0aF9kYXRhIjp7ImFjY2Vzc190b2tlbiI6ImZha2Utand0LXRva2VuIiwiZXhwaXJlZF90aW1lIjoiMTIzNDU2In19.G4wgcZDQOLyCHD_lKpO5nNGwjMA68qDWUfpb41WWZbg';
      const body: IAuthData = { token: fakeToken };

      // return throwError({ message: 'Unauthorized' });
      return of(new HttpResponse({ body, status: 200 }));
    }
  }
}
