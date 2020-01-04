import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/HTTP';
import { AppComponent, PageNotFoundComponent } from './_components';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlSerializer } from '@angular/router';
import { TokenInterceptor, LowerCaseUrlSerializer } from './_helpers';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
   {
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
