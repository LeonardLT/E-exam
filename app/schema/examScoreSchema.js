import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examScore = new Schema({
    exam_Id: String,
    examName: String,
    username: String,
    score: Number
});

const ExamScore = mongoose.model('ExamScore', examScore);

export {ExamScore};