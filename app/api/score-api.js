import express from 'express';
import {ExamScore} from '../schema/examScoreSchema';
import {Exam} from '../schema/examSchema';

const router = express.Router();
router.get('/getMyAllScore', (req, res, next) => {
    const {userId} = req.query;
    ExamScore.find({userId: userId}, (err, data) => {
        if (err) return next(err);
        return res.json(data);
    });
});
export default router;