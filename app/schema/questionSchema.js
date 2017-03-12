import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const selectQuestion = new Schema({
    questionContent: String,//问题内容
    questionOptions: [{//问题选项
        option: Number,
        optionContent: String
    }],
    rightAnswers: [{//正确答案
        answerContent: String
    }],
    answerAnalysis: String,//答案解析
    questionType: Number,//问题类型
    createDate: Date,//发布日期
    userId: Object,//创建人id
    userName: String,//创建人姓名
    questionLevel: Number,//试题难度
    blankType:Number,//题库类别，0考试题库，1联系题库
    bankId:String//题库编号
});

const blankQuestion = new Schema({
    questionContent: String,
    rightAnswers: [{
        answerId: Number,
        answerContent: String
    }],
    answerAnalysis: String,
    questionType: Number,
    createDate: Date,
    userId: String,
    userName: String,
    questionLevel: Number
});

const shortAnswerQuestion = new Schema({
    questionContent: String,//问题内容
    questionLevel: Number,//试题难度
    userName: String,//创建人姓名
    userId: Object,//创建人id
    createDate: Date,//发布日期
    questionType: Number,//问题类型3
    rightAnswers: [{//正确答案
        answerId: Number,
        answerContent: String
    }],
    answerAnalysis: String,//答案解析
    bankId:String//题库编号
});

const SelectQuestion = mongoose.model('SelectQuestion', selectQuestion);
const BlankQuestion = mongoose.model('BlankQuestion', blankQuestion);
const ShortAnswerQuestion = mongoose.model('ShortAnswerQuestion', shortAnswerQuestion);

export {SelectQuestion, BlankQuestion,ShortAnswerQuestion};