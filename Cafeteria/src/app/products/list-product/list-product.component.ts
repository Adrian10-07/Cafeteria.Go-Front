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
    this.loadProducts(); // Cargar productos al iniciar el componente
  }

  // Cargar los productos desde el servicio
  loadProducts() {
    this.serviceProductService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  // Función para seleccionar/deseleccionar productos
  toggleProductSelection(product: Product) {
    const index = this.selectedProductIds.indexOf(product.IdProducto);

    if (index === -1) {
      // Producto no está seleccionado, lo añadimos
      this.selectedProductIds = [...this.selectedProductIds, product.IdProducto];
      this.selectedProducts.push(product);  
    } else {
      // Producto ya está seleccionado, lo eliminamos
      this.selectedProductIds = this.selectedProductIds.filter(id => id !== product.IdProducto);
      this.selectedProducts = this.selectedProducts.filter(p => p.IdProducto !== product.IdProducto);  
    }
  }

  // Filtrar los productos según el tipo seleccionado
  getFilteredProducts(): Product[] {
    return this.selectedType
      ? this.products.filter(product => product.Tipo === this.selectedType)
      : this.products;
  }

  // Abrir el modal de detalles de producto
  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  // Cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Añadir un producto seleccionado al pedido
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
      // Preparar el objeto de pedido basado en los productos seleccionados
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

      // Mostrar el objeto de pedido que se enviará a la API
      console.log('Objeto de pedido que se enviará a la API:', pedido);

      // Llamar al servicio para crear el pedido en la API
      this.servicePedidosService.createPedido(pedido).subscribe(response => {
        console.log('Pedido creado con éxito:', response);
        
        // Mostrar el mensaje de éxito usando SweetAlert
        Swal.fire({
          title: '¡Pedido realizado con éxito!',
          text: `Total: $${pedido.Total}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.selectedProducts = [];  // Vaciar la lista de productos seleccionados después de realizar el pedido
      }, error => {
        console.error('Error al crear el pedido:', error);
        
        // Mostrar el mensaje de error usando SweetAlert
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un error al realizar el pedido. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
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
}
