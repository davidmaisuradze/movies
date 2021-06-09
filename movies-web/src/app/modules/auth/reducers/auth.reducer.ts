import * as AuthActions from '../actions/auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { LOCALSTORAGE_USER } from '../../../core/constants/general.constants';
import { User } from '../../../core/models/user';

export interface State {
  user: User;
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.LoginUserRequest, (state, action) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.LoginUserSuccess, (state, action) => {
    const {token, user} = action.payload;
    localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(action.payload));
    return {
      ...state,
      user,
      token,
      isAuthenticated: true,
      loading: false,
      error: null
    };
  }),
  on(AuthActions.LoginUserFailure, (state, action) => {
    localStorage.removeItem(LOCALSTORAGE_USER);
    return {
      ...state,
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: action.payload
    };
  }),
  on(AuthActions.LogoutUserRequest, (state, action) => {
    localStorage.removeItem(LOCALSTORAGE_USER);
    return {
      ...state,
      user: null,
      token: null,
      isAuthenticated: false,
      error: null
    };
  })
);

export function authReducer(state = initialState, action: Action) {
  return reducer(state, action);
}
