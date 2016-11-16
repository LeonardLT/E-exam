import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exmaSchema = new Schema({
    examId: Number,
    examName: String,
    time: Number,
    branch: String,
    major: String,
    classroom: String,
    problems: [{
        problemId: Number,
        problem: String,
        studentAnswer: String,
        answer: String
    }],
    score: Number
});


const Exam = mongoose.model('Exam', exmaSchema);

export {
    Exam
};
