import express from 'express';
import {Exam} from '../schema/examSchema';
import {ExamScore} from '../schema/examScoreSchema';
import {StudentExamAnswer} from '../schema/studentExamAnswer';
import async from 'async';

const router = express.Router();


router.post('/', (req, res, next) => {

    const {username, userId, examName, examId, studentSelAnswers, studentShortAnswer} = req.body;
    let score = 0;//总成绩
    let selScore = 0;//选择题分数


    let findAnswer = (questionId, questions) => {
        const rightAnswers = questions.find(question => question._id == questionId).rightAnswers;
        return rightAnswers[0].answerContent;
    };

    async.series({
            getExamPaperQuestion: (cb) => {
                Exam.findOne({_id: examId}, (err, {examPaper}) => {
                    if (err) return next(err);
                    cb(null, examPaper);
                });
            }
            ,
            saveStudentAnswers: (cb) => {
                new StudentExamAnswer({
                    examId,
                    examName,
                    userId,
                    userName: username,
                    studentSelAnswers,
                    studentShortAnswer,
                }).save((err) => {
                    if (err) return next(err);
                    console.log("save studentAnswer success");
                    cb();
                });
            }
        }, (err, results) => {
            const {selectQuestions, shortAnswerQuestions, selectQuestionsScore} = results.getExamPaperQuestion;
            const oneSelScore = selectQuestionsScore / selectQuestions.length;
            studentSelAnswers.map(({questionId, answer}) => {
                const rightAnswer = findAnswer(questionId, selectQuestions);
                if (answer == rightAnswer) {
                    score += oneSelScore;
                    selScore += oneSelScore;
                }
            });
            console.log("成绩：" + score);
            new ExamScore({
                examId,//考试编号
                examName,//考试名称
                userId,//学生编号
                username,//学生姓名，
                shortScore: 0,//简答题分数
                selScore:selScore.toFixed(1),//选择题分数
                score//总成绩
            }).save((err) => {
                if (err) return next(err);
                console.log("save success");
                return res.status(201).send('save success');
            });
        }
    );

});


export default router;