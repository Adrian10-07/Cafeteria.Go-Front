import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListProductComponent } from './list-product/list-product.component'; // ✅ Importa el componente
import { CreateProductComponent } from './create-product/create-product.component';

@NgModule({
  declarations: [
    CreateProductComponent,
    ListProductComponent, // ✅ Declara el componente aquí
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductsModule { }
