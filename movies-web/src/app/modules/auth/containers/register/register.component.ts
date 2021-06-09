import { Component } from '@angular/core';
import { ViewFieldSet } from '../../../../shared/models/field-set';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createForm, validForm } from '../../../../shared/helpers/form.helper';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../actions/auth.actions';
import { RegisterUserModel } from '../../models/register-user-model';
import { State } from '../../reducers/auth.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: FormGroup;

  public formFields = {
    email: {
      value: null,
      label: 'Email',
      validators: {required: true, email: true},
      view: ViewFieldSet.vertical
    },
    firstName: {
      value: null,
      label: 'First Name',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    lastName: {
      value: null,
      label: 'Last Name',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    password: {
      value: null,
      label: 'Password',
      validators: {required: true, minLength: 6},
      view: ViewFieldSet.vertical
    },
    confirmedPassword: {
      value: null,
      label: 'Confirm Password',
      validators: {},
      view: ViewFieldSet.vertical
    },
    validators: {
      matchControls: {
        control: 'password',
        matchingControl: 'confirmedPassword',
        errorMessage: 'passwords do not match'
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) {
    this.registerForm = createForm(fb, this.formFields);
  }

  register() {
    if (validForm(this.registerForm, this.formFields)) {
      const userData: RegisterUserModel = this.registerForm.value;
      this.store.dispatch(AuthActions.RegisterUserRequest({payload: userData}));
    }
  }
}
