import { createAction, props } from '@ngrx/store';
import { LoginUserModel } from '../models/login-user-model';
import { RegisterUserModel } from '../models/register-user-model';

export const LoginUserRequest = createAction(
  '[Auth] Login User Request',
  props<{ payload: LoginUserModel }>()
);

export const LoginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ payload: any }>()
);
export const LoginUserFailure = createAction(
  '[Auth] Login User Failure',
  props<{ payload: any }>()
);

export const RegisterUserRequest = createAction(
  '[Auth] Register User Request',
  props<{ payload: RegisterUserModel }>()
);

export const RegisterUserFailure = createAction(
  '[Auth] Register User Failure',
  props<{ payload: any }>()
);

export const LogoutUserRequest = createAction('[Auth] Logout User Request');
