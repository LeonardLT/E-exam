import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examSchema = new Schema({
    examName: String,//考试名称
    examDescription: String,//考试介绍
    examScore: Number,//考试总分
    examType: Number,//考试类型
    createDate: Date,//考试创建时间
    createUserName: String,//创建人
    userId: Object,//创建人id
    paperType: Number,//答卷模式
    joinNum: Number,//参考次数
    beginTime: Date,//开始时间
    endTime: Date,//结束时间
    examTime: Number,//答卷时长
    publishDate: Date,//考试发布时间
    examState: Number,//考试状态
    branch: String,//所属分院
    major: String,//所属专业
    classroom: String,//所属班级
    showScoreDate: Date,//成绩发布时间
    // selectQuestions: [{
    //     _id: String,
    //     questionContent: String,//问题内容
    //     questionOptions: [{//问题选项
    //         optionId: Number,
    //         option: Number,
    //         optionContent: String
    //     }],
    //     questionType: Number,//问题类型
    // }],
    examPaper: {
        paperId:String,
        selectQuestionsScore: Number,//选择题分值
        shortAnswerQuestionsScore: Number,//简答题分值
        scoreCount: Number,//总分
        selectQuestions: [{
            _id: String,
            questionContent: String,//问题内容
            questionOptions: [{//问题选项
                optionId: Number,
                option: Number,
                optionContent: String
            }],
            questionType: Number,//问题类型
        }],
        shortAnswerQuestions: [{
            _id: String,
            questionContent: String,//问题内容
            questionType: Number,//问题类型3
            rightAnswers: [{//正确答案
                answerId: Number,
                answerContent: String
            }],
        }]
    }//试卷
});


const Exam = mongoose.model('Exam', examSchema);

export {
    Exam
};
