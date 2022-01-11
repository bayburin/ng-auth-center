import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthorizeForbiddenPageComponent } from './authorize-forbidden-page.component';

describe('AuthorizeForbiddenPageComponent', () => {
  let component: AuthorizeForbiddenPageComponent;
  let fixture: ComponentFixture<AuthorizeForbiddenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizeForbiddenPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeForbiddenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
