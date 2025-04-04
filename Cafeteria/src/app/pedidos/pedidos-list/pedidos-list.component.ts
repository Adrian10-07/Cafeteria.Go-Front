import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido.model';
import { ServicePedidosService } from '../service-pedidos.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private service: ServicePedidosService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    this.service.getAllPedidos().subscribe(
      (data: Pedido[]) => {
        this.pedidos = data;
      },
      (error) => {
        console.error('Error al obtener los pedidos', error);
      }
    );
  }
}
