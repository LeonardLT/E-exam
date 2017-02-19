import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userAccount: String,
    nickname: String,
    headImg: String,
    password: String,
    name: String,
    cardId: String,
    sex: Number,
    email: String,
    phone: String,
    branch: String,
    major: String,
    classroom: String,
    type: Number
});

const User = mongoose.model('User', userSchema);

export {
    User,
};