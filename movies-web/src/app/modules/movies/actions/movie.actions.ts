import {createAction, props} from '@ngrx/store';
import {Movie} from '../../../core/models/movie';
import {Filter} from "../../../core/models/filter";

// GET LIST
export const GetMoviesRequest = createAction('[Movie] Get Movies Request', props<{ payload: any }>());
export const GetMoviesSuccess = createAction('[Movie] Get Movies Success', props<{ payload: any }>());
export const GetMoviesFailure = createAction('[Movie] Get Movies Failure', props<{ payload: any }>());

// SAVE FILTERS
export const SaveFiltersRequest = createAction('[Movie] Save Filters Request', props<{ payload: {key: string, value: any} }>());

// CREATE Movie
export const CreateMovieRequest = createAction('[Movie] Create Movie Request', props<{ payload: any }>());
export const CreateMovieSuccess = createAction('[Movie] Create Movie Success', props<{ payload: any }>());
export const CreateMovieFailure = createAction('[Movie] Create Movie Failure', props<{ payload: any }>());

// UPDATE Movie
export const UpdateMovieRequest = createAction('[Movie] Update Movie Request', props<{ payload: any }>());
export const UpdateMovieSuccess = createAction('[Movie] Update Movie Success', props<{ payload: any }>());
export const UpdateMovieFailure = createAction('[Movie] Update Movie Failure', props<{ payload: any }>());

// TOGGLE Favourite
export const ToggleFavouriteMovieRequest = createAction('[Movie] Toggle Favourite Movie Request', props<{ payload: any }>());
export const ToggleFavouriteMovieSuccess = createAction('[Movie] Toggle Favourite Movie Success', props<{ payload: any }>());
export const ToggleFavouriteMovieFailure = createAction('[Movie] Toggle Favourite Movie Failure', props<{ payload: any }>());

// DELETE Movie
export const DeleteMovieRequest = createAction('[Movie] Delete Movie Request', props<{ payload: { movieId: string } }>());
export const DeleteMovieSuccess = createAction('[Movie] Delete Movie Success', props<{ payload: { movieId: string } }>());
export const DeleteMovieFailure = createAction('[Movie] Delete Movie Failure', props<{ payload: any }>());
