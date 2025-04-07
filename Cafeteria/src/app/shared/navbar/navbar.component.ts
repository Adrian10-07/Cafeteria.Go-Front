import { Component } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(){}

  isMenuOpen = false; // Controla la visibilidad del menú hamburguesa

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menú toggled:', this.isMenuOpen); // Para depurar
  }

  goBack() {
    window.history.back(); // Retrocede en la navegación
  }

}
