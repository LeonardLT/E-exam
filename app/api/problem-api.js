import express from 'express';
import {Exam} from '../schema/examSchema';
const router = express.Router();


router.get('/', (req, res, next) => {
    const examId = req.query.examId;
    console.log("++++++" + examId);
    Exam.findOne({examId: examId}, (err, data) => {
        if (err) return next(err);
        console.log(data);
        res.json(data);
    });
});


export default router;