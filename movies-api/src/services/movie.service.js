import MovieModel from '../models/movie.model';
import UserModel from '../models/user.model';
import HttpStatus from 'http-status';

export const getAllMovies = async (filters) => {
    try {
        const {searchTerm, orderByNameAsc, orderByDateAsc} = filters;
        const movies = await MovieModel.find({}).sort('-createdAt');

        return {status: HttpStatus.OK, data: movies};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const createMovie = async (currentUserEmail, data) => {
    try {
        const {title, description, userEmail} = data;

        const email = userEmail || currentUserEmail;

        const user = await UserModel.findOne({email: email});
        if (!user) {
            return {status: HttpStatus.BAD_REQUEST, data: 'user not found'};
        }

        const newMovie = new MovieModel({
            title,
            description,
            imageUrl: 'TODO',
            isFavourite: false,
            userEmail: email
        });
        const result = await newMovie.save();

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        console.log(err, 'err');
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const updateMovie = async (data) => {
    try {
        const {_id, title, description} = data;

        const result = await MovieModel.findOneAndUpdate(
            {_id: _id},
            {
                $set: {
                    title,
                    description,
                    userEmail: email
                }
            },
            {upsert: true, new: true}
        );

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const toggleFavourite = async (data) => {
    try {
        const {_id, isFavourite} = data;

        const result = await MovieModel.findOneAndUpdate(
            {_id: _id},
            {
                $set: {
                    isFavourite
                }
            },
            {upsert: true, new: true}
        );

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const deleteMovie = async movieId => {
    try {
        const result = await MovieModel.findOneAndDelete({_id: movieId});

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
