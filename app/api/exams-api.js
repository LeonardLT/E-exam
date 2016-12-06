import express from 'express';
import {Exam} from '../schema/examSchema';
const router = express.Router();


router.get("/", (req, res, next) => {

    Exam.find({branch: "信息工程学院"}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, examId, examName, time, branch, major}) => {
            return {_id, examId, examName, time, branch, major};
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