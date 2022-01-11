import { Component } from '@angular/core';

import { AuthFacade } from './../../facades/auth.facade';

@Component({
  selector: 'ac-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  appName = this.authFacade.getAppName();

  constructor(private authFacade: AuthFacade) {}
}
