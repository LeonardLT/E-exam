import express from 'express';
import {ExamScore} from '../schema/examScoreSchema';
import {Exam} from '../schema/examSchema';

const router = express.Router();
router.get('/getMyAllScore', (req, res, next) => {
    const userAccount = req.query.userAccount;
    console.log(userAccount);
    ExamScore.find({userAccount: userAccount}, (err, data) => {
        if (err) return next(err);
        console.log(data);
        return res.json(data);
    });
});
export default router;