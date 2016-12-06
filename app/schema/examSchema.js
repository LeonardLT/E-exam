import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examSchema = new Schema({
    examId: Number,
    examName: String,
    time: Number,
    branch: String,
    major: String,
    classroom: String,
    questions: [{
        questionId: Number,
        question: String,
        rightAnswers: [{rightAnswer: String}],
        questionType: String
    }],
    score: Number
});


const Exam = mongoose.model('Exam', examSchema);

export {
    Exam
};
