import express from 'express';
import {Exam} from '../schema/examSchema';

const router = express.Router();

router.post('/', (req, res, next) => {

    const {examId, studentAnswers} = req.body;
    console.log(examId, studentAnswers + '-----------');
    let score = 0;
    let findAnswer = (problemId, problems) => {
        return problems.find(p => p.problemId == problemId).answer;
    };

    const rightAnswers = [];
    Exam.findOne({examId: examId}, (err, {problems}) => {
        if (err) return next(err);
        problems.map(problem => {
            rightAnswers.push(problem.answer)
        });


        studentAnswers.map(({problemId, answer}) => {
            const rightAnswer = findAnswer(problemId, problems);
            if (answer == rightAnswer) {
                score += 1;
            }
        });

        console.log("成绩：" + score);
    });


});

export default router;