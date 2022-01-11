import { Component, OnInit } from '@angular/core';

import { AuthFacade } from './../../facades/auth.facade';

@Component({
  selector: 'ac-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  appName: string;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.appName = this.authFacade.getAppName();
  }
}
