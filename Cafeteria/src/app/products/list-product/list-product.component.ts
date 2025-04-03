import { Component } from '@angular/core';
import { ServiceProductService } from '../service-product.service';
import { Product } from '../productModel';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  products: Product[] = [];
  selectedProductIds: number[] = [];
  selectedType: string = '';

  constructor(private serviceProductService: ServiceProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.serviceProductService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  toggleProductSelection(product: Product) {
    const index = this.selectedProductIds.indexOf(product.IdProduct);
    
    if (index === -1) {
      this.selectedProductIds = [...this.selectedProductIds, product.IdProduct]; 
    } else {
      this.selectedProductIds = this.selectedProductIds.filter(id => id !== product.IdProduct);
    }
  }

  getFilteredProducts(): Product[] {
    return this.selectedType
      ? this.products.filter(product => product.Tipo === this.selectedType)
      : this.products;
  }

  placeOrder() {
    if (this.selectedProductIds.length > 0) {
      console.log('Pedido realizado:', this.selectedProductIds);
      alert(`Pedido realizado con éxito. Productos: ${this.selectedProductIds.length}`);
      this.selectedProductIds = [];
    } else {
      alert('No hay productos seleccionados');
    }
  }
}
