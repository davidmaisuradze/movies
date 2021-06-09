import {State} from '../reducers/movie.reducer';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

export const selectMoviesState: MemoizedSelector<object, State> = createFeatureSelector<State>(
  'movie'
);

const getMovies = (state: State) => state.movies;
const getFilters = (state: State) => state.filters;

export const selectMovies: MemoizedSelector<object, any> = createSelector(
  selectMoviesState,
  getMovies
);

export const selectFilters: MemoizedSelector<object, any> = createSelector(
  selectMoviesState,
  getFilters
);
