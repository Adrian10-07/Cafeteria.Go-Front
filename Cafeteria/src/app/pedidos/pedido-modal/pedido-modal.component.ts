import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicePedidosService } from '../service-pedidos.service';
import { Pedido } from './pedido'; // asegúrate de tener el path correcto

@Component({
  selector: 'app-pedido-modal',
  templateUrl: './pedido-modal.component.html',
  styleUrls: ['./pedido-modal.component.css']
})
export class PedidoModalComponent implements OnInit {
  pedido: Pedido | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { idPedido: string },
    private pedidosService: ServicePedidosService,
    private dialogRef: MatDialogRef<PedidoModalComponent>
  ) {}

  ngOnInit(): void {
    this.pedidosService.getPedidoById(this.data.idPedido).subscribe({
      next: (data) => {
        this.pedido = {
          idPedido: data.IdPedido,
          idMesa: data.IdMesa,
          nombre_cliente: data.Nombre_cliente,
          status: data.Status,
          total: data.Total
        };
        console.log(data);

      }
      ,
      error: (err) => {
        console.error('Error al obtener pedido:', err);
      }
    });
  }

  aceptar(): void {
    const mensaje = { status: 'ok' };
    console.log('Pedido aceptado:', mensaje);
    this.dialogRef.close();
  }

  rechazar(): void {
    const mensaje = { status: 'rechazado' };
    console.log('Pedido rechazado:', mensaje);
    this.dialogRef.close();
  }
}
