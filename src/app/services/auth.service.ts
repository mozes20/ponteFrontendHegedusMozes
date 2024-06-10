import {inject, Injectable} from '@angular/core';
import {GenericService} from "../generic/generic.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  constructor(private genericService: GenericService) { }

  authenticate(username: string, password: string) {
    this.genericService.post('auth/login', { username, password })
      .subscribe((response:any ) => {
    console.log(response.token)
    localStorage.setItem('token', response.token)
    this.router.navigate(['/home']);
    })
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }


}
