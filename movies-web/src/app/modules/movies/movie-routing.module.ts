import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// ===== COMPONENTS =====
import {MoviesComponent} from './containers/movies/movies.component';
// ===== GUARD =====
import {AuthGuard} from '../../core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MovieRoutingModule {
}
