import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UnauthorizedPageComponent } from './unauthorized-page.component';
import { AuthFacade } from '../../facades/auth.facade';
import { AuthFacadeStub } from './../../facades/auth.facade.stub';

describe('UnauthorizedPageComponent', () => {
  let component: UnauthorizedPageComponent;
  let fixture: ComponentFixture<UnauthorizedPageComponent>;
  let authFacade: AuthFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorizedPageComponent],
      providers: [{ provide: AuthFacade, useClass: AuthFacadeStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedPageComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call "logout" method', () => {
    const spy = spyOn(authFacade, 'logout');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  describe('#login', () => {
    it('should call "loginWithRedirect" method', () => {
      const spy = spyOn(authFacade, 'loginWithRedirect');
      component.login();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });
});
