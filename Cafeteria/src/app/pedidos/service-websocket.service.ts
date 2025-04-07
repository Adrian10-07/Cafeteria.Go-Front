// servicio-websocket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private apiUrl = 'http://54.81.41.160:3010/ws/publicar';

  constructor(private http: HttpClient) {}

  publicarMensaje(mensaje: any): Observable<any> {
    return this.http.post(this.apiUrl, mensaje);
  }
}