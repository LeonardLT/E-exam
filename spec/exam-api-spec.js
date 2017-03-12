import {SelectQuestion,BlankQuestion} from '../app/schema/questionSchema';
import {Exam} from '../app/schema/examSchema';
import request from 'supertest';
import app from '../app/server'
import finish from './finish';
import db from '../app/db/db'
import async from 'async';


describe('question-spec', () => {
    beforeEach((done) => {
        db.connect('test', (err) => {
            if (err) return done.fail(err);
            Exam.find().remove(finish(done));
        });
    });

    afterEach((done) => {
        db.close(finish(done));
    });

    fit('save a exam', (done) => {
        async.series([
                (cb) => request(app)
                    .post('/api/exams')
                    .send({
                        examName: "1",//考试名称
                        examDescription: "1",//考试介绍
                        examScore: "1",//考试总分
                        examType: "1",//考试类型
                        createDate: "1",//考试创建时间
                        createUserName:"1",
                        userId: "1",//创建人id
                        paperType: "1",//答卷模式
                        joinNum: "1",//参考次数
                        beginTime: "1",//开始时间
                        endTime: "1",//结束时间
                        examTime: "1",//答卷时长
                        publishDate: "1",//考试发布时间
                        examState: "1",//考试状态
                        branch:"1",//所属分院
                        major:"1",//所属分院
                        classroom: "1",//所属班级
                        showScoreDate: "1",//成绩发布时间
                        selectQuestions:[{
                            questionId:"1",
                            questionContent: "1+1等于多少",
                            questionOptions: [{optionId: 1, option: 1, optionContent: "2"},
                                {optionId: 2, option: 2, optionContent: "20"}],
                            rightAnswers: [{answerId :1,answerContent :"2"}],
                            answerAnalysis: "答案是2",
                            questionType: 1,
                            createDate: new Date(),
                            userId: '123',
                            userName: "Leonard",
                            questionLevel: 1
                        }]
                    }).expect(201, 'save success', cb)
            ],
            finish(done)
        )
        ;
    });



});
