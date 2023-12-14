import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {UserComponent} from '../app/user/user.component';



const routes: Routes = [

  { path: 'login', component:  LoginComponent },
  { path: 'rawnews', component: UserComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
