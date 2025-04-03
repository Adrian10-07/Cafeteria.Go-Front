import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject('ws://localhost:8080/ws');

    // Verificar recepción de mensajes
    this.socket$.subscribe(
      (msg) => console.log("📩 Mensaje recibido:", msg),
      (err) => console.error("❌ Error en WebSocket:", err)
    );
  }

  sendMessage(msg: string) {
    console.log("📤 Enviando mensaje:", msg);
    this.socket$.next(msg);
  }

  getMessages() {
    return this.socket$;
  }

  closeConnection() {
    this.socket$.complete();
  }
}
