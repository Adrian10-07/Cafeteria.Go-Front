import { Component } from '@angular/core';
import { ServiceProductService } from '../service-product.service';
import { Product } from '../productModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm: FormGroup;
  showModal = false; // Controla la visibilidad del modal
  tipos: string[] = ["Bebidas frías", "Bebidas calientes", "Postres", "Desayuno", "Comida"];

  constructor(private serviceProductService: ServiceProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      Nombre: ['', Validators.required],
      Precio: ['', [Validators.required, Validators.min(1)]],
      Descripcion: ['', Validators.required],
      Tipo: ['', Validators.required]
    });
  }

  openModal() {
    this.showModal = true;
    document.body.style.overflow = "hidden"; // Evita el scroll
  }
  
  closeModal() {
    this.showModal = false;
    document.body.style.overflow = "auto"; // Restaura el scroll
  }
  

  addProduct() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.serviceProductService.addProduct(newProduct).subscribe({
        next: () => {
          alert('Producto agregado con éxito');
          this.productForm.reset();
          this.closeModal();
        },
        error: (err) => console.error('Error al agregar producto', err)
      });
    }
  }
}
