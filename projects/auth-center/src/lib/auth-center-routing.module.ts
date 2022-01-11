import { Routes, RouterModule } from '@angular/router';

import { CallbackPageComponent } from './pages/callback/callback-page.component';
import { AuthorizeForbiddenPageComponent } from './pages/authorize-forbidden/authorize-forbidden-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized/unauthorized-page.component';

import { RequestStateGuard } from './guards/request-state/request-state.guard';

const routes: Routes = [
  {
    path: 'oauth2/callback',
    component: CallbackPageComponent,
    canActivate: [RequestStateGuard],
  },
  {
    path: 'oauth2/authorize_forbidden',
    component: AuthorizeForbiddenPageComponent,
  },
  {
    path: 'oauth2/unauthorized',
    component: UnauthorizedPageComponent,
  },
];

export const routerModule = RouterModule.forChild(routes);
