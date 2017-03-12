import express from 'express';
import {Exam} from '../schema/examSchema';
const router = express.Router();


router.get("/", (req, res, next) => {
    const {branch, major, classroom} = req.query;
    Exam.find({branch, major, classroom}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, examId, examName, time, branch, major, questions}) => {
            return {_id, examId, examName, time, branch, major, questions};
        });

        return res.json(result);
    });
});

//查看所有考试
router.get("/allExam", (req, res, next) => {
    const {branch, major, classroom} = req.query;
    Exam.find({}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, examName, publishDate, branch, major, classroom}) => {
            return {_id, examName, publishDate, branch, major, classroom};

        });


        console.log(result);
        return res.json(result);
    });
});

function selIsEmpty(data) {

    const {
        examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
        joinNum, beginTime, endTime, examTime, publishDate, examState, branc, majo, classroom, showScoreDate
    }= data;

    if (
        examName === '' || examDescription === '' || examScore === '' || examType === '' || createDate === ''
        || createUserName === '' || userId === '' || paperType === '' || joinNum === '' || beginTime === ''
        || endTime === '' || examTime === '' || publishDate === '' || examState === '' || branc === ''
        || majo === '' || classroom === '' || showScoreDate === ''
    ) {
        return {type: false, message: "信息不完整"};
    } else {
        return true;
    }
}
router.get("/examId", (req, res, next) => {
    const {examId} =req.query;
    Exam.findOne({_id: examId}, (err, data) => {
        if (err) return next(err);
        console.log(data);
        res.send(data);
    });
});
router.post("/", (req, res, next) => {
    console.log(req.body);
    const {
        examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
        joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper
    }= req.body;

    const isEmpty = selIsEmpty(req.body);

    if (isEmpty === true) {
        // const examPaper = examPaper.map(({_id, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount,selectQuestions,shortAnswerQuestions}) => {
        //     return {paperId:_id, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount,selectQuestions,shortAnswerQuestions};
        // });
        // console.log(examPaper);

        const {_id, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount, selectQuestions, shortAnswerQuestions} = examPaper;
        let ePaper = {paperId:_id, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount, selectQuestions, shortAnswerQuestions}

        new Exam({
            examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
            joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate,
            examPaper:ePaper
        }).save((err) => {
            if (err) return next(err);
            console.log('save status:success');
            res.status(201).send('save success');
        });
    } else {
        return res.status(400).send(isEmpty.message);
    }


    // const {examId, examName, time, branch, major, classroom, questions} = req.body;
    // let exam = new Exam({
    //     examId,
    //     examName,
    //     time,
    //     branch,
    //     major,
    //     classroom,
    //     questions,
    //     score: 0
    // });
    // exam.save((err) => {
    //     if (err) return next(err);
    //     console.log('save status:', err ? 'failed' : 'success');
    //     res.status(201).send('save success');
    // });
});

//更新考试信息
router.post("/updateExam", (req, res, next) => {
    const {exam_Id, examName, time, branch, major, classroom, questions} = req.body;
    Exam.findOneAndUpdate({_id: exam_Id},
        {
            exam_Id: exam_Id,
            examId: 1,
            examName: examName,
            time: time,
            branch: branch,
            major: major,
            classroom: classroom,
            questions: questions,
            score: 0
        }, (err) => {
            if (err) return next(err);
            Exam.find({}, (err, data) => {
                if (err) return next(err);
                const result = data.map(({_id, examId, examName, time, branch, major, classroom, questions}) => {
                    return {_id, examId, examName, time, branch, major, classroom, questions};

                });

                return res.json(result);
            });
        });
});

router.delete("/", (req, res, next) => {
    const _id = req.query._id;
    Exam.find({_id: _id}).remove(err => {
        if (err) return next(err);
        Exam.find({}, (err, data) => {
            if (err) return next(err);
            return res.status(200).send(data);
        });
    });

});

export default router;