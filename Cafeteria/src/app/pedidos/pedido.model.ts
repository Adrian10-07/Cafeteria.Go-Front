export interface DetallesPedido {
    IdProducto: number;
    NombreProducto: string;
    Cantidad: number;
    PrecioUnitario: Float64Array;
    Subtotal: Float64Array
  }
  
  export interface Pedido {
    IdPedido: string;
    IdMesa: number;
    Nombre_cliente: string;
    Status: string;
    Total: number;
    Detalles: DetallesPedido[];
  }
  