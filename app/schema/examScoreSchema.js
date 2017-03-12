import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examScore = new Schema({
    examId: String,//考试编号
    examName: String,//考试名称
    userId:String,//学生编号
    username: String,//学生姓名
    selScore:Number,//选择题分数
    shortScore:Number,//简答题分数
    score: Number//总成绩成绩
});

const ExamScore = mongoose.model('ExamScore', examScore);

export {ExamScore};