import express from 'express';
import {ExamScore} from '../schema/examScoreSchema';
import {StudentExamAnswer} from '../schema/studentExamAnswer';

const router = express.Router();

router.get('/students', (req, res, next) => {
    const {examId} = req.query;
    StudentExamAnswer.find({examId}, (err, data) => {
        if (err) return next(err);
        res.status(200).send(data);
    });
});

router.get('/studentAnswer', (req, res, next) => {
    const {examId, userId} = req.query;
    StudentExamAnswer.findOne({examId, userId}, (err, data) => {
        if (err) return next(err);
        res.status(200).send(data);
    });
});
export default router;