import { Component, Input } from '@angular/core';
import { MesaService } from '../service-tables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.css']
})
export class DeleteTableComponent {
  @Input() idMesa!: number; // Recibe el ID desde el modal padre

  constructor(private mesaService: MesaService) {}

  deleteMesa(): void {
    if (!this.idMesa) {
      Swal.fire('Error', 'No hay una mesa seleccionada', 'error');
      return;
    }

    Swal.fire({
      title: '¿Eliminar esta mesa?',
      text: `ID de mesa: ${this.idMesa}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.mesaService.deleteMesa(this.idMesa).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La mesa fue eliminada con éxito', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la mesa', 'error');
          }
        });
      }
    });
  }
}
