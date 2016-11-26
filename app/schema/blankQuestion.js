import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blankQuestion = new Schema({
    questionId: Number,
    question: String,
    rightAnswers: [{rightAnswer: String}],
    questionType: String
});

const BlankQuestion = mongoose.model('BlankQuestion', blankQuestion);

export {BlankQuestion};