import express from 'express';
import {ExamScore} from '../schema/examScoreSchema';

const router = express.Router();
router.get('/getMyAllScore', (req, res, next) => {
    const {userId} = req.query;
    ExamScore.find({userId: userId}, (err, data) => {
        if (err) return next(err);
        return res.json(data);
    });
});

//teacher get all students score
router.get('/examScore', (req, res, next) => {
    const {examId} = req.query;
    ExamScore.find({examId}, (err, data) => {
        if (err) return next(err);
        return res.status(200).send(data);
    });
});

router.get('/oneExamScore', (req, res, next) => {
    const {examId, userId} = req.query;
    ExamScore.findOne({examId, userId}, (err, data) => {
        if (err) return next(err);
        res.status(200).send(data);
    })
});

router.put('/', (req, res, next) => {
    const {examId, userId, selScore, shortScore, score} = req.body;
    ExamScore.findOneAndUpdate({examId, userId}, {selScore, shortScore, score}, (err) => {
        if (err) return next(err);
        console.log("save success");
        res.status(200).send('update success');
    });
});
export default router;