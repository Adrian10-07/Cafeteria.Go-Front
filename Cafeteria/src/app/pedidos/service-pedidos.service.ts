import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicePedidosService {

  private apiUrl = 'http://107.23.119.217:8080/pedidos';

  constructor(private http: HttpClient) { }

  // Crear un nuevo pedido
  createPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, pedido);
  }

  // Agregar un producto a un pedido
  addProductInPedido(idPedido: string, product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${idPedido}`, product);
  }

  // Obtener todos los pedidos
  getAllPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Obtener un pedido por su ID
  getPedidoById(idPedido: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idPedido}`);
  }

  // Eliminar un pedido por su ID
  deletePedido(idPedido: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idPedido}`);
  }

  // Actualizar un pedido por su ID
  updatePedido(idPedido: string, pedido: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idPedido}`, pedido);
  }
}
