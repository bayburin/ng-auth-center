import { Component, OnInit } from '@angular/core';

import { AuthHelper } from 'auth-center';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authHelper: AuthHelper) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authHelper.logout();
  }
}
