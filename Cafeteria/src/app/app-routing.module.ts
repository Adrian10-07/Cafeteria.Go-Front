import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { ListTableComponent } from './table/list-table/list-table.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { ChatComponent } from './websocket/chat/chat.component';
import { RegisterComponent } from './login/register/register.component';
import { CreateRobotComponent } from './robots/create-robot/create-robot.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';
import { LoginAdminComponent } from './login/login-admin/login-admin.component';


const routes: Routes = [
 {path:'',component: LoginAdminComponent}, 
 {path:'mesas', component: ListTableComponent},
 {path:'productos', component: ListProductComponent},
 {path: 'chat', component: ChatComponent},
 {path: 'robots', component: CreateRobotComponent},
 {path: 'pedidos', component: PedidosListComponent },
 {path: 'CreateCajero', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
