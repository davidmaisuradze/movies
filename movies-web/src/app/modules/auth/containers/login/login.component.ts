import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewFieldSet } from '../../../../shared/models/field-set';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createForm, validForm } from '../../../../shared/helpers/form.helper';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../actions/auth.actions';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginUserModel } from '../../models/login-user-model';
import * as AuthSelectors from '../../selectors/auth.selectors';
import { State } from '../../reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  public loginForm: FormGroup;

  public formFields = {
    email: {
      value: null,
      label: 'Email',
      validators: {required: true, email: true},
      view: ViewFieldSet.vertical
    },
    password: {
      value: null,
      label: 'Password',
      validators: {required: true},
      view: ViewFieldSet.vertical
    }
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private router: Router
  ) {
    this.loginForm = createForm(fb, this.formFields);
    this.store.pipe(takeUntil(this._destroyed$), select(AuthSelectors.selectIsAuthenticated))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          return this.router.navigate(['/']);
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  login() {
    if (validForm(this.loginForm, this.formFields)) {
      const userData: LoginUserModel = this.loginForm.value;
      this.store.dispatch(AuthActions.LoginUserRequest({payload: userData}));
    }
  }
}
