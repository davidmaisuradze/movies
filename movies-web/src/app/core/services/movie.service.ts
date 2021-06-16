import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MovieModelDto} from '../../modules/movies/models/movie-model-dto';
import {Filter} from '../models/filter';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {
  }

  getMovies(filter: Filter) {
    const filterKeys = Object.keys(filter);
    let query = '?';
    filterKeys.forEach((item, index) => {
      if (item !== 'sort') {
        query = query.concat(`${item}=${filter[item].toString()}&&`);
      } else if (item === 'sort') {
        const sortKeys = Object.keys(filter.sort);

        sortKeys.forEach((sortItem, sortIndex) => {
          const key = sortItem;
          const value = filter.sort[key];

          query = query.concat(`${key}=${value !== null ? value.toString() : ''}${sortIndex !== sortKeys.length - 1 ? '&&' : ''}`);
        });
      }
    });

    return this.http.get(`/api/movies${query}`);
  }

  createMovie(movie: MovieModelDto) {
    return this.http.post('/api/movies', movie);
  }

  updateMovie(movie: MovieModelDto) {
    return this.http.put('/api/movies', movie);
  }

  toggleFavouriteMovie(movieId: string, isFavourite: boolean) {
    return this.http.put('/api/movies/toggle-favourite-movie', {_id: movieId, isFavourite});
  }

  deleteMovie(movieId: string) {
    return this.http.delete(`/api/movies/${movieId}`);
  }
}
