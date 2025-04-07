import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceUsersService } from '../../users/service-users.service';
import { User } from '../../users/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
}
