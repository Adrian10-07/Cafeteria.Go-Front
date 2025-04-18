import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsModule } from './products/products.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from './table/table.module';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './websocket/chat/chat.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RobotsModule } from './robots/robots.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatCardModule } from '@angular/material/card';     // Opcional para estructura
import { UsersModule } from './users/users.module';
import { MenuComponent } from './shared/menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ChatComponent,
    MenuComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ProductsModule,
    TableModule,
    LoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RobotsModule,
    PedidosModule,
    FormsModule,
    UsersModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
