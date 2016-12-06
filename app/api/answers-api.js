import express from 'express';
import {Exam} from '../schema/examSchema';

const router = express.Router();

router.post('/', (req, res, next) => {

    const {_id, studentAnswers} = req.body;
    let score = 0;
    let findAnswer = (questionId, questions) => {
        const rightAnswers = questions.find(question => question.questionId == questionId).rightAnswers;
        // console.log(rightAnswers[0].rightAnswer);
        return rightAnswers[0].rightAnswer;
    };

    const rightAnswers = [];
    Exam.findOne({_id: _id}, (err, {questions}) => {
        if (err) return next(err);
        questions.map(question => {
            rightAnswers.push(question.answer)
        });


        studentAnswers.map(({questionId, answer}) => {
            const rightAnswer = findAnswer(questionId, questions);
            console.log("++answer" + answer);
            console.log("++rightAnswer" + rightAnswer);
            if (answer == rightAnswer) {
                score += 1;
            }
        });

        return res.json({score: score});
        console.log("成绩：" + score);
    });


});

export default router;