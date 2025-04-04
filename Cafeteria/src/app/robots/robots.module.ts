import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRobotComponent } from './create-robot/create-robot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateRobotComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RobotsModule { }
