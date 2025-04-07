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
    const socket = new WebSocket('ws://localhost:3010/ws');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const idPedido = data.idPedido;

      // Abre el modal con el idPedido
      this.dialog.open(PedidoModalComponent, {
        data: { idPedido },
        width: '400px'
      });
    };

    socket.onerror = (error) => {
      console.error('Error en el WebSocket', error);
    };
  }

  abrirModalPrueba(): void {
    // Aquí simulamos que recibimos un idPedido desde WebSocket
    const idSimulado = '1'; // Puedes cambiar este ID a uno real de tu base

    this.dialog.open(PedidoModalComponent, {
      data: { idPedido: idSimulado },
      width: '400px'
    });
  }


}
