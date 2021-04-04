import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { MaterialModule } from '@app/material.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminInterceptor } from '@shared/interceptors/admin-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
