import { State } from '../reducers/auth.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const getUser = (state: State) => state.user;
const getToken = (state: State) => state.token;
const getIsAuthenticated = (state: State) => state.isAuthenticated;

export const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<State>(
  'auth'
);

export const selectUser: MemoizedSelector<object, any> = createSelector(selectAuthState, getUser);
export const selectToken: MemoizedSelector<object, any> = createSelector(selectAuthState, getToken);
export const selectIsAuthenticated: MemoizedSelector<object, any> = createSelector(selectAuthState, getIsAuthenticated);

