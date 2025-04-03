import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';



@NgModule({
  declarations: [
    LoginComponent,
    LoginAdminComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
