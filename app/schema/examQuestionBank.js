import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examQuestionBank = new Schema({
    questionId: Number
});

const ExamQuestionBank = mongoose.model('examQuestionBank', examQuestionBank);

export {ExamQuestionBank};
