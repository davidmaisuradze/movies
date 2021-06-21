import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import { createValidator } from 'express-joi-validation';
import multer from 'multer';

const upload = multer();

import * as MovieController from '../controllers/movie/movie.controller';
import validators from '../controllers/movie/movie.validators';

const validator = createValidator();

const routes = new Router();

// GET
routes.get('/', authenticate, MovieController.getAllMovies);

// POST
routes.post('/', authenticate, upload.single('imageData'), MovieController.createMovie);

// PUT
routes.put('/', authenticate, upload.single('imageData'), MovieController.updateMovie);
routes.put('/toggle-favourite-movie', authenticate, validator.body(validators.toggleFavourite), MovieController.toggleFavourite);

// DELETE
routes.delete('/:movieId', authenticate, validator.params(validators.deleteMovie), MovieController.deleteMovie);

export default routes;
