import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import * as MovieActions from '../actions/movie.actions';
import {GetMoviesRequest} from '../actions/movie.actions';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {getErrorMessage} from '../../../../shared/helpers/error-message.helper';
import {MovieService} from '../../../../core/services/movie.service';
import {DialogManagerService} from '../../../dialog/services/dialog-manager.service';
import {State} from '../reducers/movie.reducer';
import * as MovieSelectors from '../selectors/movie.selectors';

@Injectable()
export class MovieEffects {
  constructor(private store: Store<State>,
              private movieService: MovieService,
              private actions$: Actions,
              private toastr: ToastrService,
              private dialogService: DialogManagerService
  ) {
  }

  getMoviesRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.GetMoviesRequest),
    mergeMap((action) =>
      this.movieService.getMovies(action.payload).pipe(
        map(movies => MovieActions.GetMoviesSuccess({payload: movies})),
        catchError(err => of(MovieActions.GetMoviesFailure({payload: err})))
      )
    )
  ));

  createMovieRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.CreateMovieRequest),
    withLatestFrom(this.store.pipe(select(MovieSelectors.selectFilters))),
    mergeMap(([action, filters]) =>
      this.movieService.createMovie(action.payload).pipe(
        map((result: any) => {
          this.dialogService.close();
          return GetMoviesRequest({payload: filters});
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(MovieActions.CreateMovieFailure(error));
        })
      )
    )
  ));

  updateMovieRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.UpdateMovieRequest),
    withLatestFrom(this.store.pipe(select(MovieSelectors.selectFilters))),
    mergeMap(([action, filters]) =>
      this.movieService.updateMovie(action.payload).pipe(
        map((result: any) => {
          this.dialogService.close();
          return GetMoviesRequest({payload: filters});
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(MovieActions.UpdateMovieFailure(error));
        })
      )
    )
  ));

  toggleFavouriteMovieRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.ToggleFavouriteMovieRequest),
    withLatestFrom(this.store.pipe(select(MovieSelectors.selectFilters))),
    mergeMap(([action, filters]) => {
      const {movieId, isFavourite} = action.payload;
      return this.movieService.toggleFavouriteMovie(movieId, isFavourite).pipe(
        map((result: any) => {
          this.dialogService.close();
          return GetMoviesRequest({payload: filters});
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(MovieActions.ToggleFavouriteMovieFailure(error));
        })
      );
    })
  ));

  deleteMovieRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.DeleteMovieRequest),
    withLatestFrom(this.store.pipe(select(MovieSelectors.selectFilters))),
    mergeMap(([action, filters]) => {
        const {movieId} = action.payload;

        return this.movieService.deleteMovie(movieId).pipe(
          map(result => GetMoviesRequest({payload: filters})),
          catchError(error => {
            const errorMessage = getErrorMessage(error);
            this.toastr.error(errorMessage, 'Error!');
            return of(MovieActions.DeleteMovieFailure(error));
          })
        );
      }
    )
  ));
}
