import express from 'express';
import {SelectQuestion, ShortAnswerQuestion} from '../schema/questionSchema';
import {ExamPaper} from '../schema/examPaper';
const router = express.Router();

router.post('/', (req, res, next) => {
    const {
        examPaperName, createUserName, createUserId, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount,
        selectQuestions, shortAnswerQuestions
    } = req.body;
    new ExamPaper({
        examPaperName,//试卷名称
        createDate: new Date(),//创建时间
        createUserName,//创建人姓名
        createUserId,//创建人id
        selectQuestionsScore,//选择题分值
        shortAnswerQuestionsScore,//简答题分值
        scoreCount,//总分
        selectQuestions,
        shortAnswerQuestions,
    }).save((err) => {
        if (err) return next(err);
        console.log('save status:success');
        res.status(201).send('save success');
    });
});

router.get('/', (req, res, next) => {
    const {userId} = req.query;
    console.log(userId);
    ExamPaper.find({createUserId: userId}, (err, data) => {
        if (err) return next(err);
        console.log(data);
        return res.send(data);
    });
});

router.get('/paperId', (req, res, next) => {
    const {paperId} = req.query;
    ExamPaper.findOne({_id: paperId}, (err, data) => {
        if (err) return next(err);
        console.log(data);
        return res.send(data);
    });
});
router.put('/', (req, res, next) => {
    const {
        paperId, examPaperName, createUserName, createUserId, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount,
        selectQuestions, shortAnswerQuestions
    } = req.body;
    ExamPaper.findOneAndUpdate({_id: paperId}, {
        examPaperName, createUserName, createUserId, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount,
        selectQuestions, shortAnswerQuestions, createDate: new Date()
    }, (err, data) => {
        if (err) return next(err);
        return res.status(200).send("update success");
    });
});

router.delete('/', (req, res, next) => {
    const {examPaperId, userId} = req.query;
    ExamPaper.findOneAndRemove({_id: examPaperId}, (err) => {
        if (err) return next(err);

        ExamPaper.find({createUserId: userId}, (err, data) => {
            if (err) return next(err);
            return res.status(200).send(data);
        });
    });
});


export default router;

