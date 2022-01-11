import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should redirect to "unauthorized" page if received 401 status', () => {
    const routerSpy = spyOn(router, 'navigate');
    const body = { message: 'unauthorized' };
    const response = { status: 401, statusText: 'Unauthorized' };

    http.get('http://test').subscribe(
      () => {},
      () => {
        expect(routerSpy).toHaveBeenCalledWith(['oauth2', 'unauthorized']);
      }
    );

    httpMock.expectOne({ url: 'http://test' }).flush(body, response);
  });

  it('should catch error', () => {
    const body = { message: 'unauthorized' };
    const response = { status: 500, statusText: 'Internal Server Error' };

    http.get('http://test').subscribe(
      () => {},
      (error) => {
        expect(error.error).toEqual(body);
      }
    );

    httpMock.expectOne({ url: 'http://test' }).flush(body, response);
  });
});
