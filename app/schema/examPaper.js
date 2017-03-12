import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examPaper = new Schema({
    examPaperName:String,//试卷名称
    createDate:Date,//创建时间
    createUserName:String,//创建人姓名
    createUserId:String,//创建人id
    selectQuestionsScore:Number,//选择题分值
    shortAnswerQuestionsScore:Number,//简答题分值
    scoreCount:Number,//总分
    selectQuestions:[{
        _id:String,
        questionContent: String,//问题内容
        questionOptions: [{//问题选项
            optionId: Number,
            option: Number,
            optionContent: String
        }],
        questionType: Number,//问题类型
    }],
    shortAnswerQuestions:[{
        _id:String,
        questionContent: String,//问题内容
        questionType: Number,//问题类型3
        rightAnswers: [{//正确答案
            answerId: Number,
            answerContent: String
        }],
    }]
});

const ExamPaper = mongoose.model('ExamPaper', examPaper);

export {ExamPaper};
