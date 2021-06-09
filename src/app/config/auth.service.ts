import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { TokenService } from '../config/token.service';
import { HelpersService } from '../config/helpers.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private tokenService: TokenService,
    private router: Router,
    private helpers: HelpersService
  ) { }

  login(credentials) {
    return this.api.getUser(credentials)
  }

  register(credentials) {
    return this.api.registerUser(credentials)
  }

  logout() {
    this.tokenService.signOut();
    if (this.helpers.isBrowser()) {
      window.location.reload();
    }
  }

  userLoggedIn() {
    if (this.tokenService.getUser()) {
      return this.tokenService.getUser()
    } else {
      return false;
    }
  }
}
