import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    isFavourite: {type: Boolean, required: false},
    userEmail: {type: String, ref: 'users'}
}, {timestamps: true});

export default mongoose.model('movies', movieSchema);
