import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './list-table/list-table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListTableComponent,
    ListTableComponent,
    CreateTableComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ListTableComponent]
})
export class TableModule { }
