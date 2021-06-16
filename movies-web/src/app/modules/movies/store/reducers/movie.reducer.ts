import {Action, createReducer, on} from '@ngrx/store';
import * as MovieActions from '../actions/movie.actions';
import {Movie} from '../../../../core/models/movie';
import {Filter} from '../../../../core/models/filter';

export interface State {
  movies: Movie[];
  filters: Filter;
}

export const initialState: State = {
  movies: [],
  filters: {
    searchTerm: '',
    sort: {
      sortByNamesAsc: true,
      sortByDatesAsc: null
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(MovieActions.GetMoviesSuccess, (state, action) => ({
    ...state,
    movies: action.payload
  })),
  on(MovieActions.SaveFiltersRequest, (state, action) => {
    const {isSort, key, value} = action.payload;
    let filters = {};
    if (!!isSort) {
      filters = {
        ...state.filters,
        sort: {
          [key]: value
        }
      };
    } else {
      filters = {
        ...state.filters,
        [key]: value
      };
    }

    return {
      ...state,
      filters: {...filters}
    };
  }),
);

export function movieReducer(state = initialState, action: Action) {
  return reducer(state, action);
}
