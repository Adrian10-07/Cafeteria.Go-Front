import { Component } from '@angular/core';
import { MesaService } from '../service-tables.service';
import { Mesa } from '../tableModel';

@Component({
  selector: 'app-end-table',
  templateUrl: './end-table.component.html',
  styleUrls: ['./end-table.component.css']
})
export class EndTableComponent {
  mesaActual?: Mesa;

  constructor(private mesaService: MesaService) {}

  cambiarAEstatusDisponible() {
    const idMesaString = localStorage.getItem('IdMesa'); // Asegúrate de que esté almacenado así
    if (!idMesaString) {
      console.error('No se encontró el ID de la mesa en localStorage.');
      return;
    }

    const IdMesa = parseInt(idMesaString, 10);

    this.mesaService.getMesaById(IdMesa).subscribe({
      next: (mesa) => {
        mesa.Status = 'disponible'; // Cambia si el campo se llama diferente
        this.mesaService.updateMesa(IdMesa, mesa).subscribe({
          next: (respuesta) => {
            console.log('Mesa actualizada a disponible:', respuesta);
            this.mesaActual = respuesta;
          },
          error: (err) => {
            console.error('Error al actualizar la mesa:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener la mesa:', err);
      }
    });
  }
}
