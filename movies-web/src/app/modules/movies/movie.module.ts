import {NgModule} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {movieReducer} from './reducers/movie.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MovieEffects} from './effects/movie.effects';
import {MovieRoutingModule} from './movie-routing.module';
import {DialogModule} from '../dialog';
import {FileSaverModule} from 'ngx-filesaver';

// ===== COMPONENTS =====
import {MoviesComponent} from './containers/movies/movies.component';
import {AddMovieComponent} from './components/add-movie/add-movie.component';
import {UpdateMovieComponent} from './components/update-movie/update-movie.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    StoreModule.forFeature('movie', movieReducer),
    EffectsModule.forFeature([MovieEffects]),
    MovieRoutingModule,
    DialogModule,
    FileSaverModule
  ],
  declarations: [MoviesComponent, AddMovieComponent, UpdateMovieComponent]
})
export class MovieModule {
}
