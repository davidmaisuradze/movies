import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MovieModelDto} from '../../modules/movies/models/movie-model-dto';
import {Filter} from '../models/filter';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {
  }

  getMovies(filter: Filter) {
    console.log(filter, 'test');
    const filterKeys = Object.keys(filter);
    let query = '?';
    filterKeys.forEach((item, index) => {
      query = query.concat(`${item}=${filter[item].toString()}${index !== filterKeys.length - 1 ? '&&' : ''}`);
    });
    console.log(query, 'test');

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
