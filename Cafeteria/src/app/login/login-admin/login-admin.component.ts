import { Component } from '@angular/core';
import { ServiceUsersService } from '../../users/service-users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import  '../../../../public/go-lang.png';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'] 
})
export class LoginAdminComponent {
  UserForm: FormGroup;

  constructor(
    private userService: ServiceUsersService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    // Inicializamos el formulario
    this.UserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  goToTables() {
    this.router.navigate(['/mesas']);
  }
  login() {
    const email = this.UserForm.get('email')?.value;
    const password = this.UserForm.get('password')?.value;

    if (email && password) {
      this.userService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Respuesta completa del backend:', response);

          const token = response.token;
          const userType = response.user?.User_type;

          localStorage.setItem('token', token);
          localStorage.setItem('user_type', userType);

          alert('Inicio de sesión exitoso');
          console.log('Tipo de usuario:', userType);
          this.goToTables();

          // this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error('Error en el login', err),
      });
    } else {
      alert('Por favor, ingresa tu correo electrónico y contraseña.');
    }
  }
}
