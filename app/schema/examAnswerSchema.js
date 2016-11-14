import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examAnswerSchema = new Schema({
    examId: Number,
    problemId: Number,
    rightAnswer: String
});

const ExamAnswer = mongoose.model('ExamAnswer', examAnswerSchema);

export {ExamAnswer};