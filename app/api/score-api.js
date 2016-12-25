import express from 'express';
import {ExamScore} from '../schema/examScoreSchema';
import {Exam} from '../schema/examSchema';

const router = express.Router();
router.get('/getMyAllScore', (req, res, next) => {
    const username = req.query.username;
    console.log(username);
    ExamScore.find({username: username}, (err, data) => {
        if (err) return next(err);
        console.log(data);
        return res.json(data);
    });
});
export default router;