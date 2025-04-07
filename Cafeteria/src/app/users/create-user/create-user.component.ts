import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { ServiceUsersService } from '../service-users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  UserForm: FormGroup;
  tipos: string[] = ['Administrador', 'Cajero'];

  constructor(
    private userService: ServiceUsersService,
    private fb: FormBuilder
  ) {
    this.UserForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_type: ['', Validators.required],
    });
  }

  addUser() {
    if (this.UserForm.valid) {
      const newUser: User = this.UserForm.value;
      this.userService.save(newUser).subscribe({
        next: () => {
          alert('Usuario agregado con éxito');
          console.log('Usuario agregado con éxito', newUser);

          this.UserForm.reset();
        },
        error: (err) => console.error('Error al agregar usuario', err),
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  login() {
    const email = this.UserForm.get('email')?.value;
    const password = this.UserForm.get('password')?.value;

    if (email && password) {
      this.userService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Respuesta completa del backend:', response); // Agregado para revisar

          // Suponiendo que la respuesta contiene un objeto con token y user_type
          const token = response.token;
          const userType = response.user?.User_type;

          // Guardar en localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user_type', userType);

          // Redireccionar o mostrar mensaje
          alert('Inicio de sesión exitoso');
          console.log('Tipo de usuario:', response.user?.User_type); // o response.user?.user_type

          // this.router.navigate(['/dashboard']); // Si querés redirigir
        },
        error: (err) => console.error('Error en el login', err),
      });
    } else {
      alert('Por favor, ingresa tu correo electrónico y contraseña.');
    }
  }
}
