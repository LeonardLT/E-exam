import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    cardID: String,
    name: String,
    sex: String,
    email: String,
    phone: String,
    branch: String,
    major: String,
    classroom: String,
    type: String
});

const User = mongoose.model('User', userSchema);

export {
    User,
};