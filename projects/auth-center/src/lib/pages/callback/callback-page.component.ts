import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthFacade } from '../../facades/auth.facade';

@Component({
  selector: 'ac-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss']
})
export class CallbackPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private authFacade: AuthFacade,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.authFacade.isLoading$;
    this.error$ = this.authFacade.error$;

    const params = this.activatedRoute.snapshot.queryParams;

    this.authFacade.initAuthenticateProcess(params);
  }
}
