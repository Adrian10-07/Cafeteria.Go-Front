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
  userName: string = ''; 
  selectedMesaId: number | null = null; 

  constructor(private mesaService: MesaService, private router: Router) { }

  ngOnInit(): void {
    this.getMesas();
  }

  isAuthorizedUser(): boolean {
    const userType = localStorage.getItem('user_type');
    return userType === 'Administrador' || userType === 'Cajero';
  }
  
  getMesas(): void {
    this.loading = true;
    this.mesaService.getAllMesas().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);  
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
    if (IdMesa == null) {  
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
  
      // 1. Buscar la mesa seleccionada
      const selectedMesa = this.mesas.find(mesa => mesa.IdMesa === this.selectedMesaId);
      if (selectedMesa) {
        // 2. Cambiar el estado de la mesa a "ocupado"
        const updatedMesa = { ...selectedMesa, Status: 'ocupada' };
  
        // 3. Hacer PUT para actualizarla
        this.mesaService.updateMesa(this.selectedMesaId!, updatedMesa).subscribe({
          next: () => {
            // 4. Navegar y cerrar modal solo si la actualización fue exitosa
            this.router.navigate(['/productos']);
            this.closeModal();
          },
          error: (err) => {
            console.error('Error al actualizar la mesa:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el estado de la mesa. Intenta de nuevo.',
              confirmButtonColor: '#d33'
            });
          }
        });
      } else {
        console.warn('No se encontró la mesa seleccionada.');
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre requerido',
        text: 'Por favor, ingresa tu nombre antes de continuar',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
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

