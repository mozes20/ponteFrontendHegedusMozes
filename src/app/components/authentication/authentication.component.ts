import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  router = inject(Router);
  constructor(private authService: AuthService) {
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if(username == "" || password == "") {
      alert("Username and password cannot be empty");
      return;
    }

    if (username !== null && username !== undefined && password !== null && password !== undefined) {
      this.authService.authenticate(username as string, password as string);
    }
  }



}
