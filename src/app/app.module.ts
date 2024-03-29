import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthCenterModule } from 'auth-center';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JsonInterceptor } from './interceptors/json.interceptor';
import { environment } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthCenterModule.forRoot(environment.auth),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
