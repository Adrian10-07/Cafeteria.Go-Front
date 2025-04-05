import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListProductComponent } from './list-product/list-product.component'; // ✅ Importa el componente

@NgModule({
  declarations: [
    ListProductComponent, // ✅ Declara el componente aquí
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductsModule { }
