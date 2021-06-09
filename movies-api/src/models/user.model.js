import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String, required: true},
    passwordHash: {type: String, required: false}
}, {timestamps: true});

export default mongoose.model('users', userSchema);
