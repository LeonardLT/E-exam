import express from 'express';
import {BlankQuestion} from '../schema/blankQuestion';

const router = express.Router();

router.post('/', (req, res, next) => {

    const {questionId, question, rightAnswer, questionType} = req.body;
    console.log(questionId + "," + question + "," + rightAnswer + "," + questionType);
    let rightAnswers = [];
    rightAnswers.push({rightAnswer});
    var blankQuestion = new BlankQuestion({
        questionId: questionId,
        question: question,
        rightAnswers: rightAnswers,
        questionType: questionType
    });
    blankQuestion.save(function (err) {
        if (err) return next(err);
        console.log('save status:', err ? 'failed' : 'success');
        res.status(201).send('register success');
    });
});


router.get('/examQuestions', (req, res, next) => {

    BlankQuestion.find({}, (err, data) => {
        if (err) return next(err);
        console.log("++++");
        console.log(data);
        res.json(data);
    });
});

router.delete('/', (req, res, next) => {
    const id = req.query.id;
    console.log(id + "============");
    BlankQuestion.find({_id: id}).remove(err => {
        if (err) return next(err);
        BlankQuestion.find({}, (err, data) => {
            if (err) return next(err);
            console.log("++++");
            console.log(data);
            res.json(data);
        });
    });
});
export default router;