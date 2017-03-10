import express from 'express';
// import {BlankQuestion} from '../schema/blankQuestion';
import {SelectQuestion} from '../schema/questionSchema';
import moment from 'moment';

const router = express.Router();

function selQueIsEmpty(data) {
    const {
        questionType,
        blankType,
        questionContent,
        questionOptions,
        rightAnswers,
        answerAnalysis,
        createDate,
        userId,
        userName,
        questionLevel,
        bankId
    } = data;
    if (blankType === '' || questionType === '' || questionContent === '' || answerAnalysis === '' || createDate === ''
        || userId === '' || userName === '' || questionLevel === '' || bankId === '') {
        return {type: false, message: "题目信息不完整"};
    }
    for (let questionOption of questionOptions) {
        if (questionOption.optionContent === '')
            return {type: false, message: "没有填写选项"};
    }
    for (let rightAnswer of rightAnswers) {
        if (rightAnswer.answerContent === '')
            return {type: false, message: "没有填写正确答案"}
    }
    return true;
}

router.post('/', (req, res, next) => {
    const {
        blankType,
        questionType,
        questionContent,
        questionOptions,
        rightAnswers,
        answerAnalysis,
        createDate,
        userId,
        userName,
        questionLevel,
        bankId
    } = req.body;

    const isEmpty = selQueIsEmpty(req.body);
    if (isEmpty === true) {
        const selectQuestion = new SelectQuestion({
            blankType: blankType,
            questionContent: questionContent,
            questionOptions: questionOptions,
            rightAnswers: rightAnswers,
            answerAnalysis: answerAnalysis,
            questionType: questionType,
            createDate: createDate,
            userId: userId,
            userName: userName,
            questionLevel: questionLevel,
            bankId: bankId
        }).save((err) => {
            if (err) return next(err);
            console.log("save selectQuestion success");
            return res.status(201).send('save success');
        });
    } else {
        return res.status(400).send(isEmpty.message);
    }
});

router.post('/selectQuestion', (req, res, next) => {

    const {
        questionContent, questionOptions, rightAnswers,
        answerAnalysis, questionType, createDate, userId, userName, questionLevel
    } = req.body;
    var selectQuestion = new SelectQuestion({
        questionContent: questionContent,
        questionOptions: questionOptions,
        rightAnswers: rightAnswers,
        answerAnalysis: answerAnalysis,
        questionType: questionType,
        createDate: createDate,
        userId: userId,
        userName: userName,
        questionLevel: questionLevel
    });
    console.log(selectQuestion);
    selectQuestion.save(function (err) {
        if (err) return next(err);

        console.log('save status:', err ? 'failed' : 'success');
        res.status(201).send('question save success');
    });

    // const { question, rightAnswer, questionType} = req.body;
    // let rightAnswers = [];
    // rightAnswers.push({rightAnswer});
    // var blankQuestion = new BlankQuestion({
    //     question: question,
    //     rightAnswers: rightAnswers,
    //     questionType: questionType
    // });
    // blankQuestion.save(function (err) {
    //     if (err) return next(err);
    //     console.log('save status:', err ? 'failed' : 'success');
    //     res.status(201).send('register success');
    // });
});


router.get('/examQuestions', (req, res, next) => {
    SelectQuestion.find({}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
});

router.get('/bankQuestions', (req, res, next) => {
    const bankId = req.query.bankId;
    SelectQuestion.find({bankId}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
    // res.send('ok');
});

router.delete('/', (req, res, next) => {
    // const _id = req.query._id;
    const {bankId,questionId, questionType} = req.query;
    if (questionType == 1) {
        SelectQuestion.findOneAndRemove({_id: questionId}, (err) => {
            if (err) return next(err);
            SelectQuestion.find({bankId}, (err, data) => {
                res.status(200).send(data);
            });
        });
    }
});

router.post('/updateQuestion', (req, res, next) => {
    const {question_Id, question, questionType, questionRightAnswer} = req.body;
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
    SelectQuestion.find({questionType: questionType}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
});

router.get('/test', (req, res, next) => {
    res.json({
        array: [{
            scoreChinese: "70",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "70",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "201",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "2",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "70",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "720",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "7330",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "70",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "70",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }, {
            scoreChinese: "71230",
            scoreEnglish: "80",
            scoreMath: "90",
        }],
        length: 4
    });
});
export default router;