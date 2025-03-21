import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './list-table/list-table.component';
import { CreateTableComponent } from './create-table/create-table.component';



@NgModule({
  declarations: [
    ListTableComponent,
    ListTableComponent,
    CreateTableComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [ListTableComponent]
})
export class TableModule { }
