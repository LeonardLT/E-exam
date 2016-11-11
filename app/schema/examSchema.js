import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exmaSchema = new Schema({
    examName: String,
    time: Number,
    problems: [{
        problem: String,
        answer: String
    }],
    score: Number
});


const Exam = mongoose.model('Exam', exmaSchema);

export {
    Exam
};
