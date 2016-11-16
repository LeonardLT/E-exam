import express from 'express';
import {Exam} from '../schema/examSchema';
const router = express.Router();


router.get("/", (req, res, next) => {

    Exam.find({branch: "信息工程学院"}, (err, data)=> {
        if (err) return next(err);
        const result = data.map(({examId, examName, time, branch, major}) => {
            return {examId, examName, time, branch, major};
        });


        console.log(result);
        return res.json(result);
    });
});

export default router;