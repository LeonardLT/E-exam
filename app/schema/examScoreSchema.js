import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examScore = new Schema({
    examId: String,
    username: String,
    score: Number
});

const ExamScore = mongoose.model('ExamScore', examScore);

export {ExamScore};