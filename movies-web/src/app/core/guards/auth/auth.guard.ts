import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../../../modules/auth';
import { Store } from '@ngrx/store';
import { State } from '../../../modules/auth/reducers/auth.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private store: Store<State>) {
  }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.store.dispatch(AuthActions.LogoutUserRequest());
    this.router.navigate(['/login']);
    return false;
  }
}
