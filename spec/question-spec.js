import {SelectQuestion,BlankQuestion,ShortAnswerQuestion} from '../app/schema/questionSchema';
import request from 'supertest';
import app from '../app/server'
import finish from './finish';
import db from '../app/db/db'
import async from 'async';


describe('question-spec', () => {
    beforeEach((done) => {
        db.connect('test', (err) => {
            if (err) return done.fail(err);
            SelectQuestion.find().remove(finish(done));
            ShortAnswerQuestion.find().remove(finish(done));
        });
    });

    afterEach((done) => {
        db.close(finish(done));
    });

    it('save a select question', (done) => {
        async.series([
                (cb) => request(app)
                    .post('/api/question/selectQuestion')
                    .send({
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
                    }).expect(201, 'question save success', cb)
            ],
            finish(done)
        )
        ;
    });

    fit('save a ShortAnswerQuestion', (done) => {
        async.series([
                (cb) => request(app)
                    .post('/api/question')
                    .send({
                        questionContent: "1+1等于多少",
                        questionLevel: 1,
                        userName: "Leonard",
                        userId: '123',
                        createDate: new Date(),
                        questionType: 3,
                        rightAnswers: [{answerId :1,answerContent :"2"}],
                        answerAnalysis: "答案是2",
                        bankId:"1"
                    }).expect(201, 'save success', cb)
            ],
            finish(done)
        )
        ;
    });


});
