import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: Number,
    userName: String,
    password: String,
    email: String,
    phone: String,
    branch: String,
    major: String,
    class: String
});

const User = mongoose.model('User', userSchema);

export {
    User,
};