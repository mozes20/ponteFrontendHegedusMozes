import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {authGuard} from "./guards/auth.guard";
import {ProfilComponent} from "./components/profil/profil.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'profile', component: ProfilComponent, canActivate: [authGuard]},
  { path: 'auth', component: AuthenticationComponent },
];
