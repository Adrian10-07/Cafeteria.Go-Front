import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './productModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductService {

  private apiUrl = 'http://107.23.119.217:8080/productos/'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Obtener un producto por ID
  getProductById(idProducto: number): Observable<Product> {
    const url = `${this.apiUrl}${idProducto}`;
    return this.http.get<Product>(url);
  }

  // Agregar un nuevo producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Eliminar un producto por ID
  deleteProduct(idProducto: number): Observable<void> {
    const url = `${this.apiUrl}${idProducto}`;
    return this.http.delete<void>(url);
  }

  // Actualizar un producto por ID
  updateProduct(idProducto: number, product: Product): Observable<Product> {
    const url = `${this.apiUrl}${idProducto}`;
    return this.http.put<Product>(url, product);
  }
}
