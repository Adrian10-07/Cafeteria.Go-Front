import { Component } from '@angular/core';
import { ServiceUsersService } from '../../users/service-users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  UserForm: FormGroup;
  isSubmitted = false; 

  constructor(
    private userService: ServiceUsersService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.UserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Mínimo 6 caracteres
    });
  }

  goToTables() {
    this.router.navigate(['/mesas']);
  }

  login() {
    this.isSubmitted = true; 

    if (this.UserForm.invalid) {
      if (this.UserForm.get('email')?.errors?.['required']) {
        Swal.fire({
          icon: 'warning',
          title: 'Campo requerido',
          text: 'Por favor, ingresa tu correo electrónico.',
          confirmButtonColor: '#885809',
        });
      } else if (this.UserForm.get('email')?.errors?.['email']) {
        Swal.fire({
          icon: 'warning',
          title: 'Correo inválido',
          text: 'Ingresa un correo electrónico válido (ej. usuario@dominio.com).',
          confirmButtonColor: '#885809',
        });
      } else if (this.UserForm.get('password')?.errors?.['required']) {
        Swal.fire({
          icon: 'warning',
          title: 'Campo requerido',
          text: 'Por favor, ingresa tu contraseña.',
          confirmButtonColor: '#885809',
        });
      } else if (this.UserForm.get('password')?.errors?.['minlength']) {
        Swal.fire({
          icon: 'warning',
          title: 'Contraseña corta',
          text: 'La contraseña debe tener al menos 6 caracteres.',
          confirmButtonColor: '#885809',
        });
      }
      return; // Detenemos la ejecución si hay errores
    }

    const email = this.UserForm.get('email')?.value;
    const password = this.UserForm.get('password')?.value;

    // Llamada al servicio de login
    this.userService.login(email, password).subscribe({
      next: (response: any) => {
        console.log('Respuesta completa del backend:', response);

        const token = response.token;
        const userType = response.user?.User_type;

        // Guardamos en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user_type', userType);

        // Mostramos SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Inicio de sesión exitoso.',
          confirmButtonColor: '#885809',
          timer: 1500, // Cierra automáticamente después de 1.5 segundos
          timerProgressBar: true,
        }).then(() => {
          console.log('Tipo de usuario:', userType);
          this.goToTables(); //  /mesas
        });
      },
      error: (err) => {
        console.error('Error en el login:', err);
        let errorMessage = 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.';

        if (err.status === 401) {
          errorMessage = 'Correo o contraseña incorrectos.';
        } else if (err.status === 500) {
          errorMessage = 'Error en el servidor. Contacta al administrador.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonColor: '#885809',
        });
      },
    });
  }

  get formControls() {
    return this.UserForm.controls;
  }
}