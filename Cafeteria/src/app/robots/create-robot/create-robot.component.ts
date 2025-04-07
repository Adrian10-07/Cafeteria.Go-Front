import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceRobotsService } from '../service-robots.service';
import { Robots } from '../robots';

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrl: './create-robot.component.css',
})
export class CreateRobotComponent {
  RobotForm: FormGroup;
  showModal = false; // Controla la visibilidad del modal

  constructor(
    private robotService: ServiceRobotsService,
    private fb: FormBuilder
  ) {
    this.RobotForm = this.fb.group({
      IdRobot: ['', Validators.required],
      Alias: ['', Validators.required],
    });
  }

  openModal() {
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Evita el scroll
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = 'auto'; // Restaura el scroll
  }

  addProduct() {
    if (this.RobotForm.valid) {
      const newProduct: Robots = this.RobotForm.value;
      this.robotService.addRobot(newProduct).subscribe({
        next: () => {
          alert('Robot agregado con éxito');
          this.RobotForm.reset();
          this.closeModal();
        },
        error: (err) => console.error('Error al agregar Robot', err),
      });
    }
  }
}
