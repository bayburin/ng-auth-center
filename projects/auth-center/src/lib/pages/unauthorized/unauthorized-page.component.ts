import { Component, OnInit } from '@angular/core';

import { AuthFacade } from './../../facades/auth.facade';

@Component({
  selector: 'ac-unauthorized',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPageComponent implements OnInit {
  constructor(private authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.authFacade.logout();
  }

  login(): void {
    this.authFacade.loginWithRedirect();
  }
}
