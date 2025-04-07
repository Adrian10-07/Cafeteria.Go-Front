import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListProductComponent } from './list-product/list-product.component'; // ✅ Importa el componente
import { CreateProductComponent } from './create-product/create-product.component';
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FormsModule } from '@angular/forms';
import { DatellesProductoComponent } from './datelles-producto/datelles-producto.component';
import { EndTableComponent } from '../table/end-table/end-table.component';
import { TableModule } from '../table/table.module';

>>>>>>> 8d8da9db8ef4f7694c0c6b9bfa8062268b3a45ea

@NgModule({
  declarations: [
    CreateProductComponent,
<<<<<<< HEAD
    ListProductComponent, // ✅ Declara el componente aquí
=======
    UpdateProductComponent,
    DatellesProductoComponent,
    
>>>>>>> 8d8da9db8ef4f7694c0c6b9bfa8062268b3a45ea
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
<<<<<<< HEAD
=======
    TableModule
    
>>>>>>> 8d8da9db8ef4f7694c0c6b9bfa8062268b3a45ea
  ]
})
export class ProductsModule { }
