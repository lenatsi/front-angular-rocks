import { SignUpComponent } from './signUp/signUp.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/auth/auth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignUpComponent},
] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
