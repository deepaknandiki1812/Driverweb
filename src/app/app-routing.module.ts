import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverListComponent } from './module/driver/driver-list/driver-list.component';
import { DriverCreateComponent } from './module/driver/driver-create/driver-create.component';
import { DriverEditComponent } from './module/driver/driver-edit/driver-edit.component';
import { CustomerListComponent } from './module/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './module/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './module/customer/customer-edit/customer-edit.component';
import { DriverDeleteComponent } from './module/driver/driver-delete/driver-delete.component';
import { UserListComponent } from './module/user/user-list/user-list.component';
import { UserCreateComponent } from './module/user/user-create/user-create.component';
import { UserEditComponent } from './module/user/user-edit/user-edit.component';
import { LoginComponent } from './module/login/login/login.component';
import { DriverViewComponent } from './module/driver/driver-view/driver-view.component';


const routes: Routes = [
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'drivers', component: DriverListComponent },
  { path: 'drivers/new', component: DriverCreateComponent },
  { path: 'drivers/edit', component: DriverEditComponent },
  { path: 'drivers/delete', component: DriverDeleteComponent},

  {path: 'customers', component: CustomerListComponent},
  {path: 'customers/new', component: CustomerCreateComponent},
  {path: 'customers/edit', component: CustomerEditComponent},

  {path: 'users', component:UserListComponent},
  {path: 'users/new', component: UserCreateComponent},
  {path: 'users/edit', component: UserEditComponent},

  { path: 'register', component: UserCreateComponent }, 
   {path: 'drivers/view', component: DriverViewComponent}


  
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


