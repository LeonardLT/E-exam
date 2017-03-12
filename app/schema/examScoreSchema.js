import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examScore = new Schema({
    examId: String,//考试编号
    examName: String,//考试名称
    userId:String,//学生编号
    username: String,//学生姓名
    score: Number//成绩
});

const ExamScore = mongoose.model('ExamScore', examScore);

export {ExamScore};