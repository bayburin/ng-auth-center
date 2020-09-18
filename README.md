# ng-auth-center

Библиотека для авторизации по протоколу OAuth2 через Личный Кабинет на Angular 2+

<br>

## Установка

### С помощью yarn:

`yarn add @iss/ng-auth-center`

### С помощью npm:

`npm i @iss/ng-auth-center`

<br>

**Внимание!** Для корректной работы библиотеки должны быть установлены следующие зависимости:
1. @angular/cdk (установка: `npm i @angular/cdk` или `yarn add @angular/cdk`)
2. @angular/material (установка: `npm i @angular/material` или `yarn add @angular/material`)
3. @auth0/angular-jwt (установка: `npm i @angular/angular-jwt` или `yarn add @angular/angular-jwt`)

<br>

## Использование

Импортируйте `AuthCenterModule` и добавьте его в список импортов проекта. Вызовите метод `forRoot` и передайте атрибуты, необходимые для работы библиотеки (список атрибутов описан далее). Атрибуты лучше описать в файле `src/environment.ts`, чтобы в production режиме их можно было легко изменить.

Также убедитесь, что у вас импортирован `HttpClientModule` и `RouterModule`.

``` typescript
import { HttpClientModule } from '@angular/common/http';
import { AuthCenterModule } from '@iss/ng-auth-center';
import { AppRoutingModule } from './app-routing.module'; // <-- обычно файл с импортом RouterModule и маршрутами лежит отдельно от основного модуля.

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    // ...  
    HttpClientModule,
    AuthCenterModule.forRoot(environment.auth),
    AppRoutingModule // <-- Убедитесь, что файл с маршрутами импортируется ПОСЛЕ модуля AuthCenterModule.
  ],
})
export class AppModule { }

```

<br>

Импортируйте стили в файле `angular.json` в раздел вашего проекта.

``` json
"styles": [
  "node_modules/auth-center/assets/styles.scss",
  // ...
]
```

<br>

Библиотека предоставляет класс `AuthCenterGuard`, в котором реализован метод `canActivate` для активации маршрута, если пользователь авторизован. Для проверки авторизации в маршрутах импортируйте класс `AuthCenterGuard`. В случае, если пользователь не авторизован, он будет перенаправлен на страницу входа.

``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCenterGuard } from 'auth-center';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthCenterGuard] // <-- Пример использования AuthCenterGuard класса.
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

<br>

## Атрибуты для инициализации `AuthCenterModule`:

1. **authorizationServer** - адрес сервера авторизации (по умолчанию `https://auth-center.iss-reshetnev.ru/oauth/authorize`);
2. **serverUrl<sup>*</sup>** - адрес вашего сервера, который вернет вам JWT;
3. **cliendId<sup>*</sup>** - ID вашего приложения, выданный сервером авторизации;
4. **responseType** - запрашиваемый тип разрешения, может быть одним из следующих праметров: `code` - для запроса кода авторизации, `token` - для запроса токена доступа; (по умолчанию `code`);
5. **state** - используется для безопасности. Если его отправить, сервер авторизации вернет его обратно, чтобы вы могли убедиться, что это ответ именно на ваш запрос (по умолчанию пустая строка);
6. **redirectUrl<sup>*</sup>** - адрес, на который будет перенаправлен пользователь после успешной авторизации на сервере авторизации;
7. **scope** - cписок разрешений, необходимых приложению (по умолчанию пустой). Указывать через запятую без пробелов.
8. **appName<sup>*</sup>** - имя приложения которое будет отображаться на странице входа
9. **jwtOptions** - объект, содержащий два параметра `allowedDomains` и `disallowedRoutes`. 
    1. **allowedDomains** - список доменов, для которых будет добавляться заголовок `Authorization` с содержимым `Bearer <JWT>`
    2. **disallowedRoutes** - список адресов, на которые НЕ будет добавляться заголовок `Authorization`

<sup>*</sup> - атрибут обязателен

<br>

## `AuthHelper API`:

Библиотека предоставляет сервис `AuthHelper`, который содержит некоторые полезные функции:

### `isAuthenticated$: Observable<boolean>` - флаг, показывающий, авторизован ли пользователь.

``` typescript
import { AuthHelper } from 'auth-center';
//...
constructor(private authHelper: AuthHelper) {}
ngOnInit(): void {
  this.authHelper.isAuthenticated$.subscribe(isAuth => {
    console.log(isAuth);
  });
}
```

<br>

### `getJwtPayload(): any` - возвращает данные из JWT.

``` typescript
import { AuthHelper } from 'auth-center';
//...
constructor(private authHelper: AuthHelper) {}
ngOnInit(): void {
  console.log(this.authHelper.getJwtPayload());
}
```

<br>

### `logout(): void` - редиректит на страницу "/oauth2/unauthorized" для выхода из приложения.

``` typescript
import { AuthHelper } from 'auth-center';
//...
constructor(private authHelper: AuthHelper) {}
logoutClick(): void {
  this.authHelper.logout();
}
