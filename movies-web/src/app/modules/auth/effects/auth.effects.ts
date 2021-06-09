import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getErrorMessage } from '../../../shared/helpers/error-message.helper';
import { DialogManagerService } from '../../dialog/services/dialog-manager.service';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions$: Actions, private router: Router, private toastr: ToastrService,
              private dialogService: DialogManagerService) {
  }

  loginUserRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginUserRequest),
    switchMap(action => {
      const userData = action.payload;
      return this.authService.login(userData).pipe(
        map(result => AuthActions.LoginUserSuccess({payload: result})),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(AuthActions.LoginUserFailure({payload: error}));
        })
      );
    })
  ));

  registerUserRequest$: Observable<boolean | Promise<boolean>> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.RegisterUserRequest),
    switchMap(action => {
      const userData = action.payload;
      return this.authService.register(userData).pipe(
        map(result => this.router.navigate(['/login'])),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(false);
        }));
    })
  ), {dispatch: false});
}
