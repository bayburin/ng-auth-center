# ng-auth-center

Библиотека для авторизации по протоколу OAuth2 через Личный Кабинет на Angular 2+

## Установка

### С помощью yarn:

`yarn add @iss/ng-auth-center`

### С помощью npm:

`npm i @iss/ng-auth-center`

**Внимание!** Для корректной работы библиотеки должны быть установлены следующие зависимости:
1. @angular/cdk (установка: `npm i @angular/cdk` или `yarn add @angular/cdk`)
2. @angular/material (установка: `npm i @angular/material` или `yarn add @angular/material`)
3. @auth0/angular-jwt (установка: `npm i @angular/angular-jwt` или `yarn add @angular/angular-jwt`)

## Использование

Импортируйте `AuthCenterModule` и добавьте его в список импорта проекта. Вызовите метод `forRoot` и передайте атрибуты, необходимые для работы авторизации.
Убедитесь, что у вас импортирован `HttpClientModule` и `RouterModule`.