// src/app/services/mesa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from './tableModel';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private apiUrl = 'http://107.23.119.217:8080/mesa/'; // URL de la API

  constructor(private http: HttpClient) { }

  // Obtener todas las mesas
  getAllMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  // Crear una nueva mesa
  createMesa(mesa: Mesa): Observable<Mesa> {
    return this.http.post<Mesa>(this.apiUrl, mesa);
  }

  // Obtener mesa por ID
  getMesaById(IdMesa: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.apiUrl}${IdMesa}`);
  }

  // Actualizar mesa
  updateMesa(idMesa: number, mesa: Mesa): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.apiUrl}${idMesa}`, mesa);
  }

  // Eliminar mesa
  deleteMesa(IdMesa: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${IdMesa}`);
  }
}
