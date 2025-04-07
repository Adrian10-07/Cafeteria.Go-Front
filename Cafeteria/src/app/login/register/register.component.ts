import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceUsersService } from '../../users/service-users.service';
import { User } from '../../users/user';
import Swal from 'sweetalert2'; // ✅ Importación añadida

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  UserForm: FormGroup;

  constructor(
    private userService: ServiceUsersService,
    private fb: FormBuilder
  ) {
    this.UserForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_type: ['Cajero', Validators.required],
    });
  }

  addUser() {
    if (this.UserForm.valid) {
      const newUser: User = this.UserForm.value;
      this.userService.save(newUser).subscribe({
        next: () => {
          // 🔁 Reemplazo de alert con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado con éxito',
            text: `${newUser.name} ha sido registrado correctamente.`,
            confirmButtonColor: '#3085d6',
          });

          console.log('Usuario agregado con éxito', newUser);
          this.UserForm.reset();
        },
        error: (err) => {
          console.error('Error al agregar usuario', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al agregar el usuario',
            confirmButtonColor: '#d33',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonColor: '#f8bb86',
      });
    }
  }
}
