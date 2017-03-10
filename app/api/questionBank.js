import express from 'express';
const router = express.Router();
import {QuestionBank} from '../schema/questionBank';
import {SelectQuestion} from '../schema/questionSchema';


function qbisEmpty(data) {
    const {questionBankName, createDate, createUserName, createUserId, bankType} = data;

    if (questionBankName == '' || createDate == ''
        || createUserName == '' || createUserId == '' || bankType == '') {
        return {type: false, message: "不能为空"};
    }
    return true
}

router.post('/', (req, res, next) => {
    const {questionBankName, createDate, createUserName, createUserId, bankType} = req.body;
    const isEmpty = qbisEmpty(req.body);
    if (isEmpty === true) {
        new QuestionBank({
            questionBankName: questionBankName,
            createDate: createDate,
            createUserName: createUserName,
            createUserId: createUserId,
            bankType: bankType
        }).save((err, {_id}) => {
            if (err) return next(err);
            console.log("save success");
            return res.status(201).send({questionBankId: _id});

        });
    } else {
        return res.status(400).send(isEmpty.message);
    }
});

router.put("/", (req, res, next) => {
    const {bankId, questionBankName, createDate, createUserName, createUserId, bankType} = req.body;
    QuestionBank.findOneAndUpdate({_id: bankId}, {questionBankName, createDate, createUserName, createUserId, bankType}, (err) => {
        if (err) return next(err);
        return res.status(200).send("update success");
    });
});

router.get('/', (req, res, next) => {
    QuestionBank.find({}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
});
router.get('/bankId', (req, res, next) => {
    const {bankId} =req.query;
    QuestionBank.findOne({_id: bankId}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });

});

router.delete('/', (req, res, next) => {
    const bankId = req.query.bankId;
    QuestionBank.findOneAndRemove({_id: bankId}, (err) => {
        if (err) return next(err);
        QuestionBank.find({}, (err, data) => {
            if (err) return next(err);
            res.status(200).send(data);
        });
    });

});


export default router;