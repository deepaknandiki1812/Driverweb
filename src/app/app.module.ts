// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { AppComponent } from './app.component';


// @NgModule({
//   declarations: [
//     AppComponent,
    
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

// src/app/app.module.ts


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { DriverListComponent } from './module/driver/driver-list/driver-list.component';
import { AppComponent } from './app.component';
import { DriverCreateComponent } from './module/driver/driver-create/driver-create.component';

import { CustomerListComponent } from './module/customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './module/customer/customer-edit/customer-edit.component';
import { CustomerCreateComponent } from './module/customer/customer-create/customer-create.component';
import { DriverEditComponent } from './module/driver/driver-edit/driver-edit.component';
import { DriverDeleteComponent } from './module/driver/driver-delete/driver-delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { CustomerDeleteComponent } from './module/customer/customer-delete/customer-delete.component';



import { UserEditComponent } from './module/user/user-edit/user-edit.component';
import { UserCreateComponent } from './module/user/user-create/user-create.component';
import { UserDeleteComponent } from './module/user/user-delete/user-delete.component';
import { UserListComponent } from './module/user/user-list/user-list.component';
import { LoginComponent } from './module/login/login/login.component';
import { DriverViewComponent } from './module/driver/driver-view/driver-view.component';



@NgModule({
  declarations: [
    AppComponent,
    DriverCreateComponent,
    DriverListComponent,
    DriverEditComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerEditComponent,
    DriverDeleteComponent,
    FilterPipe,
    CustomerDeleteComponent,
    UserCreateComponent,
    UserDeleteComponent,
    UserEditComponent,
    UserListComponent,
    LoginComponent,
    DriverViewComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
