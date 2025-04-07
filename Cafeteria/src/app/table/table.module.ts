import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './list-table/list-table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { DeleteTableComponent } from './delete-table/delete-table.component';
import { EndTableComponent } from './end-table/end-table.component';



@NgModule({
  declarations: [
    ListTableComponent,
    ListTableComponent,
    CreateTableComponent,
    TableComponent,
    DeleteTableComponent,
    EndTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ListTableComponent,
    EndTableComponent
  ]
})
export class TableModule { }
