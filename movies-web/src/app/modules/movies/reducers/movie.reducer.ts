import {Action, createReducer, on} from '@ngrx/store';
import * as MovieActions from '../actions/movie.actions';
import {Movie} from '../../../core/models/movie';
import {Filter} from "../../../core/models/filter";

export interface State {
  movies: Movie[];
  filters: Filter;
}

export const initialState: State = {
  movies: [],
  filters: {
    searchTerm: '',
    orderByTitlesAsc: true,
    orderByDatesAsc: false
  }
};

export const reducer = createReducer(
  initialState,
  on(MovieActions.GetMoviesSuccess, (state, action) => ({
    ...state,
    movies: action.payload
  })),
  on(MovieActions.SaveFiltersRequest, (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      [action.payload.key]: action.payload.value
    }
  })),
);

export function movieReducer(state = initialState, action: Action) {
  return reducer(state, action);
}
