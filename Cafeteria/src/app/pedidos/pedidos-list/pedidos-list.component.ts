import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicePedidosService } from '../service-pedidos.service';
import { PedidoModalComponent } from '../pedido-modal/pedido-modal.component';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {
  pedidos: any[] = [];
  statusMessages: any[] = []; // <- array para los mensajes de status

  constructor(
    private service: ServicePedidosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPedidos();
    this.iniciarWebSocket();
  }

  getPedidos(): void {
    this.service.getAllPedidos().subscribe(
      (data) => this.pedidos = data,
      (error) => console.error('Error al obtener los pedidos', error)
    );
  }


  iniciarWebSocket(): void {
    const socket = new WebSocket('ws://54.81.41.160:3010/ws');
  
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('Mensaje WebSocket recibido:', msg);
  
      const tipo = msg.type;
      const data = msg.data;
  
      if (tipo === 'pedido' && data?.idPedido) {
        this.dialog.open(PedidoModalComponent, {
          data: { idPedido: data.idPedido },
          width: '400px'
        });
      } else if (tipo === 'sensor' && data?.status && data?.sensorId) {
        // Guardamos el status del sensor
        this.statusMessages.push({
          sensorId: data.sensorId,
          status: data.status
        });
      } else
      console.warn('Mensaje desconocido recibido por WebSocket:', msg);

    };
  
    socket.onerror = (error) => {
      console.error('Error en el WebSocket', error);
    };
  }
  




}
