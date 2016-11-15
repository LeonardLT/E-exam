import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    studentId: String,
    password: String,
    name: String,
    sex: String,
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