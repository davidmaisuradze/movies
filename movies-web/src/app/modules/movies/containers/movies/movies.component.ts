import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as MovieActions from '../../store/actions/movie.actions';
import * as MovieSelectors from '../../store/selectors/movie.selectors';
import {take, takeUntil} from 'rxjs/operators';
import {faEdit, faTimes, faStar, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {ConfirmModalService} from '../../../../core/services/confirm-modal.service';
import {AuthSelectors} from '../../../auth';
import {Movie} from '../../../../core/models/movie';
import {AddMovieComponent} from '../../components/add-movie/add-movie.component';
import {UpdateMovieComponent} from '../../components/update-movie/update-movie.component';
import {User} from '../../../../core/models/user';
import {DialogManagerService} from '../../../dialog/services/dialog-manager.service';
import {State} from '../../store/reducers/movie.reducer';
import {Filter} from '../../../../core/models/filter';

export enum FilterObjectTypes {
  SEARCH_TERM = 'searchTerm',
  SORT_BY_NAMES_ASC = 'sortByNamesAsc',
  SORT_BY_DATES_ASC = 'sortByDatesAsc'
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  public user$: Observable<User>;
  public filters$: Observable<Filter>;
  public movies$: Observable<Movie[]>;
  public icons = {
    edit: faEdit,
    times: faTimes,
    star: faStar,
    arrowUp: faArrowUp,
    arrowDown: faArrowDown
  };
  public searchTerm = '';
  public filterObjectTypes = FilterObjectTypes;

  constructor(private store: Store<State>, private confirmModalService: ConfirmModalService,
              private dialogService: DialogManagerService) {
    this.movies$ = this.store.pipe(takeUntil(this._destroyed$), select(MovieSelectors.selectMovies));
    this.filters$ = this.store.pipe(takeUntil(this._destroyed$), select(MovieSelectors.selectFilters));
    this.user$ = this.store.pipe(takeUntil(this._destroyed$), select(AuthSelectors.selectUser));
  }

  ngOnInit() {
    this.filters$.subscribe(data => {
      this.store.dispatch(MovieActions.GetMoviesRequest({payload: data}));
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  addMovie() {
    this.dialogService.open(AddMovieComponent, {
      data: {}
    });
  }

  toggleFavourite(movie: Movie) {
    this.store.dispatch(MovieActions.ToggleFavouriteMovieRequest({
      payload: {
        movieId: movie._id,
        isFavourite: !movie.isFavourite
      }
    }));
  }

  updateMovie(movie: Movie) {
    this.dialogService.open(UpdateMovieComponent, {
      data: {
        movie
      },
    });
  }

  removeMovie(movieId: string, movieTitle: string) {
    this.confirmModalService
      .showConfirm({
        text: `Are you sure you want to remove movie: ${movieTitle}`,
        title: 'Delete Movie'
      })
      .pipe(take(1))
      .subscribe(
        result =>
          result && this.store.dispatch(MovieActions.DeleteMovieRequest({payload: {movieId}}))
      );
  }

  updateFilterObject(key: string, value: string | boolean, isSort?: boolean) {
    this.store.dispatch(MovieActions.SaveFiltersRequest({
      payload: {
        key, value, isSort
      }
    }));
  }

  moviesTrackByFn(item: Movie) {
    return item ? item._id : null;
  }
}
