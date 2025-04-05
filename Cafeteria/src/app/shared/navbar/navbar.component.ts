import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private location: Location){}

  goBack(): void {
    this.location.back();
  }
}
