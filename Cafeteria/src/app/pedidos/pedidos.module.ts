import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidoModalComponent } from './pedido-modal/pedido-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    PedidosListComponent,
    PedidoModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
      ],
  exports:[
    PedidosListComponent
  ]
})
export class PedidosModule { }
