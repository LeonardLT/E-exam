import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: String,
    password: String,
    teacherId: String,
    name: String,
    sex: String,
    email: String,
    phone: String,
    branch: String,
    major: String,
    classroom: String,
    type: String
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export {
    Teacher,
};