import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserModel } from '../../modules/auth/models/login-user-model';
import { RegisterUserModel } from '../../modules/auth/models/register-user-model';
import { LOCALSTORAGE_USER } from '../constants/general.constants';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  isAuthenticated() {
    return !!localStorage.getItem(LOCALSTORAGE_USER);
  }

  login(userData: LoginUserModel) {
    return this.httpClient.post('/api/auth/login', userData);
  }

  register(userData: RegisterUserModel) {
    return this.httpClient.post('/api/auth/register', userData);
  }
}
