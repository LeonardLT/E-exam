import express from 'express';
import {Exam} from '../schema/examSchema';
const router = express.Router();


router.get("/", (req, res, next) => {
    const {branch, major, classroom} = req.query;
    Exam.find({branch, major, classroom}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, examId, examName, time, branch, major, questions}) => {
            return {_id, examId, examName, time, branch, major, questions};
        });


        console.log(result);
        return res.json(result);
    });
});

//查看所有考试
router.get("/allExam", (req, res, next) => {
    const {branch, major, classroom} = req.query;
    Exam.find({}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, examId, examName, time, branch, major, questions}) => {
            return {_id, examId, examName, time, branch, major, questions};

        });


        console.log(result);
        return res.json(result);
    });
});
router.post("/", (req, res, next) => {
    const {examId, examName, time, branch, major, classroom, questions} = req.body;
    let exam = new Exam({
        examId,
        examName,
        time,
        branch,
        major,
        classroom,
        questions,
        score: 0
    });
    exam.save((err) => {
        if (err) return next(err);
        console.log('save status:', err ? 'failed' : 'success');
        res.status(201).send('save success');
    });
});

export default router;