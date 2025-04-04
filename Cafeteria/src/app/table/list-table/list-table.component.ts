import { Component, OnInit } from '@angular/core';
import { MesaService } from '../service-tables.service';
import Swal from 'sweetalert2';
import { Mesa } from '../tableModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent implements OnInit {
  mesas: Mesa[] = [];
  loading: boolean = false;
  showModal: boolean = false;
  userName: string = ''; // Variable para el nombre del usuario
  selectedMesaId: number | null = null; // Para almacenar el IdMesa seleccionado

  constructor(private mesaService: MesaService, private router: Router) { }

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


  deleteMesa(IdMesa?: number): void {
    if (IdMesa == null) {  // Maneja undefined y null
      console.warn('ID de mesa indefinido, no se puede eliminar.');
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mesaService.deleteMesa(IdMesa).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'La mesa ha sido eliminada.',
              'success'
            );
            this.getMesas();
            this.closeModal();
          },
          error: (err) => {
            console.error('Error deleting mesa:', err);
          }
        });
      }
    });
  }
  proceedOrder(): void {
    if (this.userName.trim() !== '') {
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('IdMesa', this.selectedMesaId!.toString());

      this.router.navigate(['/productos']);
      
      this.closeModal();
    } else {
      alert('Por favor, ingresa tu nombre');
    }
  }
  openModal(IdMesa: number): void {
    this.selectedMesaId = IdMesa; 
    this.showModal = true; 
  }

  closeModal(): void {
    this.showModal = false; 
    this.userName = ''; 
  }
}  

