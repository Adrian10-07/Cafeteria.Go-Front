import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { ListTableComponent } from './table/list-table/list-table.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { ChatComponent } from './websocket/chat/chat.component';


const routes: Routes = [
 {path:'',component: LoginComponent}, 
 {path:'mesas', component: ListTableComponent},
 {path:'productos', component: ListProductComponent},
 {path: 'chat', component: ChatComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
