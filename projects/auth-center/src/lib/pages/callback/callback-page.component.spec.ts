import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthFacadeStub } from './../../facades/auth.facade.stub';
import { AuthFacade } from './../../facades/auth.facade';
import { CallbackPageComponent } from './callback-page.component';
import { ActivatedRoute } from '@angular/router';

describe('CallbackPageComponent', () => {
  let component: CallbackPageComponent;
  let fixture: ComponentFixture<CallbackPageComponent>;
  let authFacade: AuthFacade;
  let stubActivatedRoute;
  let stubActivatedRouteProxy;
  const queryParams = { code: 'fake-code' };

  beforeEach(async(() => {
    stubActivatedRoute = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', ['snapshot']);
    stubActivatedRouteProxy = new Proxy(stubActivatedRoute, {
      get(target, property) {
        if (property === 'snapshot') {
          return { queryParams };
        }
      }
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthFacade, useClass: AuthFacadeStub },
        { provide: ActivatedRoute, useValue: stubActivatedRouteProxy }
      ],
      declarations: [CallbackPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackPageComponent);
    component = fixture.componentInstance;

    authFacade = TestBed.inject(AuthFacade);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call "initAuthenticateProcess" method', () => {
    const spy = spyOn(authFacade, 'initAuthenticateProcess');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(queryParams);
  });
});
