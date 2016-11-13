import express from 'express';
import {Exam} from '../schema/examSchema';

const router = express.Router();

router.post('/', (req, res, next) => {

    const {examId, studentAnswers} = req.body;
    let score = 0;
    let findAnswer = (id, problems) => {
        return problems.find(p => p.id == id).answer;
    };

    const rightAnswers = [];
    Exam.findOne({id: examId}, (err, {problems}) => {
        if (err) return next(err);
        problems.map(problem => {
            rightAnswers.push(problem.answer)
        });


        studentAnswers.map(({id, answer}) => {
            const rightAnswer = findAnswer(id, problems);
            if (answer == rightAnswer) {
                score += 1;
            }
        });

        console.log("成绩：" + score);
    });


});

export default router;