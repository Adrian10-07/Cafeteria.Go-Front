import { Component } from '@angular/core';
import { MesaService } from '../service-tables.service';
import { Mesa } from '../tableModel';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent {
  constructor(private mesaService: MesaService) {}

  createMesa(): void {
    const nuevaMesa: Mesa = { status: 'disponible' };

    this.mesaService.createMesa(nuevaMesa).subscribe({
      next: (mesaCreada) => {
        console.log('Mesa creada:', mesaCreada);
      },
      error: (err) => {
        console.error('Error al crear mesa:', err);
      }
    });
  }
}
