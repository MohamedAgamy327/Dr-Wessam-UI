import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class CredentialService {

  constructor(private router: Router) {
  }

  getUser() {
    const token = jwt_decode(localStorage.getItem('token'));
    return token;
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  isUser() {
    const token = jwt_decode(localStorage.getItem('token'));
    if (token.role === 'user') {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    const token = jwt_decode(localStorage.getItem('token'));
    if (token.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  isOption() {
    const token = jwt_decode(localStorage.getItem('token'));
    if (token.role === 'option') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/professional']);
  }

}
