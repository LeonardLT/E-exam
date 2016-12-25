import express from 'express';
import {BlankQuestion} from '../schema/blankQuestion';

const router = express.Router();

router.post('/', (req, res, next) => {

    const { question, rightAnswer, questionType} = req.body;
    let rightAnswers = [];
    rightAnswers.push({rightAnswer});
    var blankQuestion = new BlankQuestion({
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
        res.json(data);
    });
});

router.delete('/', (req, res, next) => {
    const _id = req.query._id;
    console.log(_id+"dddddddd");
    BlankQuestion.find({_id: _id}).remove(err => {
        if (err) return next(err);
        BlankQuestion.find({}, (err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    });
});

router.post('/updateQuestion', (req, res, next) => {
    const {question_Id, question,  questionType, questionRightAnswer} = req.body;
    let rightAnswers = [];
    rightAnswers.push({rightAnswer: questionRightAnswer});
    BlankQuestion.findOneAndUpdate({_id: question_Id},
        {
            question: question,
            rightAnswers: rightAnswers,
            questionType: questionType
        }, (err) => {
            if (err) return next(err);
            BlankQuestion.find({}, (err, data) => {
                if (err) return next(err);
                res.json(data);
            });
        });
});

router.get('/type', (req, res, next) => {
    const questionType = req.query.questionType;
    BlankQuestion.find({questionType: questionType}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
});
export default router;