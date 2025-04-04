import { Component, EventEmitter, Output } from '@angular/core';
import { MesaService } from '../service-tables.service';
import { Mesa } from '../tableModel';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent {
  @Output() mesaCreada = new EventEmitter<void>();

  constructor(private mesaService: MesaService) {}

  createMesa(): void {
    const nuevaMesa: Mesa = { Status: 'disponible' };

    this.mesaService.createMesa(nuevaMesa).subscribe({
      next: (mesaCreada) => {
        console.log('Mesa creada:', mesaCreada);
        this.mesaCreada.emit(); // 🚀 Emitimos evento
      },
      error: (err) => {
        console.error('Error al crear mesa:', err);
      }
    });
  }
}
