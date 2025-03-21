import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
