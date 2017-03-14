import express from 'express';
// import {BlankQuestion} from '../schema/blankQuestion';
import {SelectQuestion, ShortAnswerQuestion} from '../schema/questionSchema';
import moment from 'moment';
import async from 'async';


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
    const {questionType} = req.body;
    if (questionType == 1) {
        const {
            blankType, questionType, questionContent, questionOptions, rightAnswers, answerAnalysis,
            createDate, userId, userName, questionLevel, bankId
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
    } else if (questionType == 3) {
        const {
            questionContent, questionLevel, userName, userId, createDate, questionType, rightAnswers, answerAnalysis, bankId
        } = req.body;
        if (questionContent === '' || questionLevel === '' || userName === '' || userId === '' || createDate === '' ||
            questionType === '' || rightAnswers === '' || answerAnalysis === '' || bankId === '') {
            return res.status(400).send("题目信息不完整");
        } else {
            new ShortAnswerQuestion({
                questionContent,
                questionLevel,
                userName,
                userId,
                createDate,
                questionType,
                rightAnswers,
                answerAnalysis,
                bankId
            }).save((err) => {
                if (err) return next(err);
                console.log("save success");
                return res.status(201).send('save success');
            });
        }

    }
    else {
        return res.status(400).send("err");
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
    selectQuestion.save(function (err) {
        if (err) return next(err);
        console.log('save status:', err ? 'failed' : 'success');
        res.status(201).send('新增成功');
    });

});


router.get('/examQuestions', (req, res, next) => {
    SelectQuestion.find({}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
});

function getSelectQuestionsByBankId(bankId, cb) {
    SelectQuestion.find({bankId}, (err, data) => {
        if (err) return next(err);
        cb(null, data);
    });
}
function getShortAnswerQuestionByBankId(bankId, cb) {
    ShortAnswerQuestion.find({bankId}, (err, data) => {
        if (err) return next(err);
        cb(null, data);
    });
}

function getQuestions(res, next, bankId) {
    // const bankId = req.query.bankId;

    async.series({
            getSelectQuestionsByBankId: (cb) => {
                SelectQuestion.find({bankId}, (err, data) => {
                    if (err) return next(err);
                    cb(null, data);
                }).sort({createDate: -1});
            },
            getShortAnswerQuestionByBankId: (cb) => {
                ShortAnswerQuestion.find({bankId}, (err, data) => {
                    if (err) return next(err);
                    cb(null, data);
                }).sort({createDate: -1});
            }
        }, (err, results) => {
            const selectQuestions = results.getSelectQuestionsByBankId;
            const shortAnswerQuestion = results.getShortAnswerQuestionByBankId;
            let questions = selectQuestions.concat(shortAnswerQuestion);
            res.send(questions);
        }
    );
}
router.get('/bankQuestions', (req, res, next) => {
    const bankId = req.query.bankId;
    getQuestions(res, next, bankId);

});

router.delete('/', (req, res, next) => {
    // const _id = req.query._id;
    const {bankId, questionId, questionType} = req.query;
    if (questionType == 1) {
        SelectQuestion.findOneAndRemove({_id: questionId}, (err) => {
            if (err) return next(err);
            getQuestions(res, next, bankId);
        });
    } else if (questionType == 3) {
        ShortAnswerQuestion.findOneAndRemove({_id: questionId}, (err) => {
            if (err) return next(err);
            getQuestions(res, next, bankId);
        });
    }
});

router.get('/selQuestion', (req, res, next) => {
    const {bankId, questionId} = req.query;
    SelectQuestion.findOne({bankId, _id: questionId}, (err, data) => {
        if (err) return next(err);
        res.status(200).send(data);
    });
});
router.get('/shortQuestion', (req, res, next) => {
    const {questionId, bankId} = req.query;
    ShortAnswerQuestion.findOne({_id: questionId, bankId}, (err, data) => {
        if (err) return next(err);
        return res.status(200).send(data);
    });
});

router.put('/', (req, res, next) => {
    const {questionType} = req.body;
    if (questionType == 1) {
        const {
            questionId, blankType, questionType, questionContent, questionOptions, rightAnswers, answerAnalysis,
            createDate, userId, userName, questionLevel, bankId
        } = req.body;
        SelectQuestion.findOneAndUpdate({_id: questionId}, {
            blankType, questionType, questionContent, questionOptions, rightAnswers, answerAnalysis,
            createDate, userId, userName, questionLevel, bankId
        }, (err) => {
            if (err) return (next);
            console.log("update success");
            return res.status(200).send('更新成功');
        });

    } else if (questionType == 3) {
        const {
            questionId, questionContent, questionLevel, userName, userId, createDate, questionType, rightAnswers, answerAnalysis, bankId
        } = req.body;
        ShortAnswerQuestion.findOneAndUpdate({_id: questionId}, {
            questionContent, questionLevel, userName, userId, createDate, questionType, rightAnswers, answerAnalysis, bankId
        }, (err) => {
            if (err) return next(err);
            return res.status(200).send('更新成功');
        });
    } else {
        return res.status(400).send('操作失败')
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

        length: 4
    });
});
export default router;