import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentExamAnswer = new Schema({
    examId: String,//考试编号
    examName: String,//考试名称
    userId: String,//用户编号
    userName: String,//学生姓名
    studentSelAnswers: [{//学生选择题答案
        questionType: Number,
        questionId: String,
        answer: String
    }],
    studentShortAnswer: [{
        questionType: Number,
        questionId: String,
        answer: String
    }]
});


const StudentExamAnswer = mongoose.model('StudentExamAnswer', studentExamAnswer);

export {
    StudentExamAnswer
};
