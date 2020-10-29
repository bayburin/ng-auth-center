import { NgModule, ModuleWithProviders, Optional, Inject } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './pages/layout/layout.component';
import { CallbackPageComponent } from './pages/callback/callback-page.component';
import { AuthorizeForbiddenPageComponent } from './pages/authorize-forbidden/authorize-forbidden-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized/unauthorized-page.component';

import { AuthRouterModule } from './auth-center-routing.module';

import { CONFIG, defaultConfig } from './auth-center.config';
import { IConfig } from './interfaces/config.interface';
import { FakeBackendInterceptor } from './interceptors/fake-backend/fake-backend.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { AuthState } from './store/auth.state';
import { jwtOptionsFactory } from './factories/jwt-options.factory';
import { MaterialModule } from './material.module';

export const jwtModule = JwtModule.forRoot({
  jwtOptionsProvider: {
    provide: JWT_OPTIONS,
    useFactory: jwtOptionsFactory,
    deps: [AuthState, CONFIG]
  }
});

@NgModule({
  declarations: [
    LayoutComponent,
    CallbackPageComponent,
    AuthorizeForbiddenPageComponent,
    UnauthorizedPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AuthRouterModule,
    jwtModule
  ]
})
export class AuthCenterModule {
  static forRoot(config: IConfig): ModuleWithProviders<AuthCenterModule> {
    return {
      ngModule: AuthCenterModule,
      providers: [
        { provide: CONFIG, useValue: { ...defaultConfig, ...config } },
        // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ]
    };
  }

  constructor(@Optional() @Inject(CONFIG) config: IConfig) {
    if (!config) {
      return defaultConfig;
    }
  }
}
