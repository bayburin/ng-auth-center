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

Импортируйте `AuthCenterModule` и добавьте его в список импортов проекта. Вызовите метод `forRoot` и передайте атрибуты, необходимые для работы библиотеки (список атрибутов описан далее). Атрибуты лучше описать в файле `src/environment.ts`, чтобы в production режиме их можно было спокойно поменять.

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

Импортируйте стили в файле `angular.json` в раздел вашего проекта
``` json
"styles": [
  "node_modules/auth-center/assets/styles.scss", // <-- Файл, который необходимо импортировать
  // ...
]
```