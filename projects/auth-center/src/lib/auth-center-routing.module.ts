import { Inject, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { CONFIG } from './auth-center.config';
import { IConfig } from './interfaces/config.interface';

import { CallbackPageComponent } from './pages/callback/callback-page.component';
import { AuthorizeForbiddenPageComponent } from './pages/authorize-forbidden/authorize-forbidden-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized/unauthorized-page.component';

import { RequestStateGuard } from './guards/request-state/request-state.guard';

const routes: Routes = [
  {
    path: 'oauth2/callback',
    component: CallbackPageComponent,
    canActivate: [RequestStateGuard]
  },
  {
    path: 'oauth2/authorize_forbidden',
    component: AuthorizeForbiddenPageComponent
  },
  {
    path: 'oauth2/unauthorized',
    component: UnauthorizedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRouterModule {
  constructor(router: Router, @Inject(CONFIG) config: IConfig) {
    const routerConfig = router.config;
    const registeredPath = config.redirectUrl.replace(/^(.*\/\/)?[^\/]+\//, '');

    if (routerConfig.every(route => route.path !== registeredPath)) {
      routerConfig.unshift({
        path: config.redirectUrl.replace(/^(.*\/\/)?[^\/]+\//, ''),
        redirectTo: 'oauth2/callback',
      });
      router.resetConfig(routerConfig);
    }
  }
}
