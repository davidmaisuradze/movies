import * as movieService from '../../services/movie.service';

export const getAllMovies = async (req, res, next) => {
    const {status, data} = await movieService.getAllMovies(req.query);
    return res.status(status).json(data);
};

export const createMovie = async (req, res, next) => {
    const {currentUser, body} = req;

    const {status, data} = await movieService.createMovie(currentUser.email, body);
    return res.status(status).json(data);
};

export const updateMovie = async (req, res, next) => {
    const {currentUser, body} = req;

    const {status, data} = await movieService.updateMovie(body);
    return res.status(status).json(data);
};

export const toggleFavourite = async (req, res, next) => {
    const {body} = req;

    const {status, data} = await movieService.toggleFavourite(body);
    return res.status(status).json(data);
};

export const deleteMovie = async (req, res, next) => {
    const {status, data} = await movieService.deleteMovie(req.params.movieId);
    return res.status(status).json(data);
};
