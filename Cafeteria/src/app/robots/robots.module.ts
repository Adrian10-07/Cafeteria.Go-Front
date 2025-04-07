import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRobotComponent } from './create-robot/create-robot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRobotComponent } from './list-robot/list-robot.component';



@NgModule({
  declarations: [
    CreateRobotComponent,
    ListRobotComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RobotsModule { }
