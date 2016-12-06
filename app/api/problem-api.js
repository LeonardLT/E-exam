import express from 'express';
import {Exam} from '../schema/examSchema';
const router = express.Router();


router.get('/', (req, res, next) => {
    // const examId = req.query.examId;
    const _id = req.query._id;
    // Exam.findOne({examId: examId}, (err, data) => {
    Exam.findOne({_id: _id}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
});


export default router;