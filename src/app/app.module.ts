import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TableModule } from 'ngx-easy-table';

import { InMemoryWebApiModule } from "angular-in-memory-web-api";  
import { BackendService } from "./backend.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './contact-list/table.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { CreateForm } from './contact-list/create-form/create-form.component';
import { Login } from './contact-list/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ContactDetailComponent,
    CreateForm,
    Login
  ],
  imports: [
    BrowserModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // InMemoryWebApiModule.forRoot(BackendService),
    // InMemoryW ebApiModule.forRoot(BackendService,  {delay: 0, passThruUnknownUrl: true}),
    
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
