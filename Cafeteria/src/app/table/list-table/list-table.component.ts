import { Component, OnInit } from '@angular/core';
import { MesaService } from '../service-tables.service';
import { Router } from '@angular/router';
import { Mesa } from '../tableModel';
@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent implements OnInit {
  mesas: Mesa[] = [];
  loading: boolean = false;

  constructor(private mesaService: MesaService) { }

  ngOnInit(): void {
    this.getMesas();
  }

  // Método para obtener todas las mesas
  getMesas(): void {
    this.loading = true;
    this.mesaService.getAllMesas().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);  // Verifica los datos que llegan
        this.mesas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching mesas:', err);
        this.loading = false;
      }
    });
  }
  

  // Método para eliminar una mesa
  deleteMesa(idMesa: number): void {
    if (confirm('¿Seguro que deseas eliminar esta mesa?')) {
      this.mesaService.deleteMesa(idMesa).subscribe({
        next: () => {
          this.getMesas(); // Volver a obtener la lista de mesas después de eliminar
        },
        error: (err) => {
          console.error('Error deleting mesa:', err);
        }
      });
    }
  }

}
