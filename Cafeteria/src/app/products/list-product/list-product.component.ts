import { Component } from '@angular/core';
import { ServiceProductService } from '../service-product.service';
import { ServicePedidosService } from '../../pedidos/service-pedidos.service';
import { Product } from '../productModel';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  products: Product[] = [];
  selectedProductIds: number[] = [];
  selectedType: string = '';
  selectedProducts: Product[] = [];

  isModalOpen: boolean = false;
  selectedProduct: Product | null = null;

  nombreCliente = localStorage.getItem('userName') || '';  
  idMesa = parseInt(localStorage.getItem('IdMesa') || '0');

  constructor(
    private serviceProductService: ServiceProductService,
    private servicePedidosService: ServicePedidosService
  ) {}

  ngOnInit() {
    this.loadProducts(); 
  }

  loadProducts() {
    this.serviceProductService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  toggleProductSelection(product: Product) {
    const index = this.selectedProductIds.indexOf(product.IdProducto);

    if (index === -1) {
      this.selectedProductIds = [...this.selectedProductIds, product.IdProducto];
      this.selectedProducts.push(product);  
    } else {
      this.selectedProductIds = this.selectedProductIds.filter(id => id !== product.IdProducto);
      this.selectedProducts = this.selectedProducts.filter(p => p.IdProducto !== product.IdProducto);  
    }
  }

  getFilteredProducts(): Product[] {
    return this.selectedType
      ? this.products.filter(product => product.Tipo === this.selectedType)
      : this.products;
  }

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addToOrder() {
    if (this.selectedProduct) {
      this.selectedProducts.push(this.selectedProduct);
      console.log('Producto añadido al pedido:', this.selectedProduct);
      this.closeModal(); // Cerrar el modal después de añadir el producto
    }
  }

  // Realizar el pedido
  placeOrder() {
    if (this.selectedProducts.length > 0) {
      const detallesPedido = this.selectedProducts.map(product => ({
        IdProducto: product.IdProducto,
        Nombre_producto: product.Nombre,  // Asegúrate de que el nombre de la columna en la DB sea "Nombre_producto"
        Cantidad: 1,  // Por defecto, cantidad 1. Puedes modificar esto si deseas permitir cambiar la cantidad.
        PrecioUnitario: product.Precio,
        Subtotal: product.Precio
      }));

      // Crear el objeto de pedido
      const pedido = {
        IdMesa: this.idMesa,
        Nombre_cliente: this.nombreCliente,
        Status: 'pendiente',  // Establecer el estado a "pendiente"
        Total: this.selectedProducts.reduce((sum, product) => sum + product.Precio, 0),  // Calcular el total
        Detalles: detallesPedido
      };

      console.log('Objeto de pedido que se enviará a la API:', pedido);

      this.servicePedidosService.createPedido(pedido).subscribe(
        response => {
          console.log('Pedido creado con éxito. Respuesta completa:', response);
      
          if (response && response.error) {
            console.error('Error en la respuesta:', response.error);
            Swal.fire({
              title: '¡Error!',
              text: response.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            return;
          }
      
          Swal.fire({
            title: '¡Pedido realizado con éxito!',
            text: `Total: $${pedido.Total}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
      
          this.selectedProducts = []; 
        },
        error => {
          console.error('Error al crear el pedido:', error);
      
          let errorMessage = error.error?.message || 'Hubo un error al realizar el pedido. Intenta nuevamente.';
      
          Swal.fire({
            title: '¡Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
      
    } else {
      // Si no hay productos seleccionados, mostrar un mensaje de advertencia
      Swal.fire({
        title: '¡Advertencia!',
        text: 'No hay productos seleccionados',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  
  iconMap: { [key: string]: string } = {
    'Bebidas frías': 'water_full',
    'Bebidas calientes': 'local_cafe',
    'Postres': 'cookie',
    'Desayuno': 'egg_alt',
    'Comida': 'dinner_dining'
  };
  
  getProductIcon(type: string): string {
    return this.iconMap[type] || 'fastfood';
  }
  
}
