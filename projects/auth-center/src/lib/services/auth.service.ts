import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

import { CONFIG } from '../auth-center.config';
import { IConfig } from './../interfaces/config.interface';
import { RequestState } from '../models/request-state/request-state.model';
import { IAuthData } from './../interfaces/auth-data.interface';
import { AuthServiceAbstract } from './auth.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthServiceAbstract {
  constructor(private http: HttpClient, @Inject(CONFIG) private config: IConfig) {
    super();
  }

  redirectToAuthorizationServer(state: RequestState): void {
    const paramsObject = {
      client_id: this.config.clientId,
      response_type: this.config.responseType,
      state: state.value,
      redirect_uri: this.config.redirectUrl,
      scope: this.config.scope,
    };
    const paramsString = Object.entries(paramsObject)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    const url = `${this.config.authorizationServer}?${paramsString}`;

    window.open(url, '_self');
  }

  getJwt(params: Params): Observable<IAuthData> {
    const body = { code: params.code };

    return this.http.post<IAuthData>(this.config.serverUrl, body);
  }
}
