import { EditGroupComponent } from './dashboard/editGroup/editGroup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongsComponent } from './songs/songs.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups/groups.component';
import { SignUpComponent } from './signUp/signUp.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './dashboard/list/list.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignUpComponent},
  {path: "groups", component: GroupsComponent},
  {path: "songs", component: SongsComponent},
  {path: "detail/:id", component: DetailsComponent},

  {path: "dashboard", component: DashboardComponent, children: [
    {path: "", redirectTo:"home", pathMatch: "full"},
    {path: "home", component: ListComponent},
    {path: "edit", component: EditGroupComponent},
    {path: "edit/:id", component: EditGroupComponent}
  ],canActivate: [AuthGuardService]}
] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
   ]
})
export class AppRoutingModule { }
