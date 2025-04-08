import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component'; // ✅ Importa el componente
import { CreateProductComponent } from './create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FormsModule } from '@angular/forms';
import { DatellesProductoComponent } from './datelles-producto/datelles-producto.component';
import { EndTableComponent } from '../table/end-table/end-table.component';
import { TableModule } from '../table/table.module';
import { PedidosModule } from '../pedidos/pedidos.module';


@NgModule({
  declarations: [
    CreateProductComponent,
    UpdateProductComponent,
    DatellesProductoComponent,
    ListProductComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    PedidosModule
    
  ]
})
export class ProductsModule { }
