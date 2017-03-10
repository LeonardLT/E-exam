import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const questionBank = new Schema({
    questionBankName: String,
    createDate: Date,
    createUserName:String,
    createUserId:String,
    bankType: Number//1:考试题库 2：练习题库
});


const QuestionBank = mongoose.model('QuestionBank', questionBank);

export {
    QuestionBank
};
