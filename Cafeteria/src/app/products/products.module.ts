import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateProductComponent } from './create-product/create-product.component';



@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
