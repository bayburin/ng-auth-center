import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthFacade } from '../../facades/auth.facade';

@Component({
  selector: 'ac-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss'],
})
export class CallbackPageComponent implements OnInit {
  isLoading$ = this.authFacade.isLoading$;
  error$ = this.authFacade.error$;

  constructor(private authFacade: AuthFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;

    this.authFacade.initAuthenticateProcess(params);
  }
}
