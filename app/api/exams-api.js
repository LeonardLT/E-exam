import express from 'express';
import {Exam} from '../schema/examSchema';
import {StudentExamAnswer} from '../schema/studentExamAnswer';
const router = express.Router();


router.get("/", (req, res, next) => {
    const {branch, major, classroom} = req.query;
    Exam.find({branch, major, classroom}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, examId, endTime, examName, time, branch, major, questions}) => {
            return {_id, examId, examName, endTime, time, branch, major, questions};
        });

        return res.json(result);
    });
});

//查看所有考试
router.get("/allExam", (req, res, next) => {
    const {branch, major, classroom} = req.query;
    Exam.find({}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, userId, examType, endTime, examState, examName, publishDate, branch, major, classroom}) => {
            return {_id, userId, examType, endTime, examName, publishDate, examState, branch, major, classroom};
        });
        return res.json(result);
    }).sort({publishDate: -1});
});

//查看该老师的所有考试
router.get("/tExam", (req, res, next) => {
    const {teacherId} = req.query;
    Exam.find({userId: teacherId}, (err, data) => {
        if (err) return next(err);
        const result = data.map(({_id, userId, examType, endTime, examState, examName, publishDate, branch, major, classroom}) => {
            return {_id, userId, examType, endTime, examName, publishDate, examState, branch, major, classroom};
        });
        return res.json(result);
    }).sort({publishDate: -1});
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
        res.send(data);
    });
});
router.post("/", (req, res, next) => {
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
        let ePaper = {paperId: _id, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount, selectQuestions, shortAnswerQuestions}

        new Exam({
            examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
            joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate,
            examPaper: ePaper
        }).save((err) => {
            if (err) return next(err);
            console.log('save status:success');
            res.status(201).send('新增成功');
        });
    } else {
        return res.status(400).send(isEmpty.message);
    }
});

router.put('/', (req, res, next) => {
    const {
        examId, examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
        joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper
    }= req.body;

    let ePaper;
    if (examPaper !== '') {
        const {_id, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount, selectQuestions, shortAnswerQuestions} = examPaper;
        ePaper = {paperId: _id, selectQuestionsScore, shortAnswerQuestionsScore, scoreCount, selectQuestions, shortAnswerQuestions}
    } else {
        ePaper = {};
    }

    Exam.findOneAndUpdate({_id: examId}, {
        examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
        joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper: ePaper
    }, (err) => {
        if (err) return next(err);
        console.log('update success');
        Exam.findOne({_id: examId}, (err, data) => {
            if (err) return next(err);
            // console.log(data);
            res.status(200).send(data);
        });
    });
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
        }).sort({publishDate: -1});
    });

});

router.get('/myExam', (req, res, next) => {
    const {branch, major, classroom} = req.query;
    Exam.find({branch, major, classroom, examState: 1,examType:1}, (err, data) => {
        if (err) return next(err);
        return res.status(200).send(data);
    }).sort({publishDate: -1});
});

router.get('/procticeExam',(req,res,next)=> {
    const {branch, major, classroom} = req.query;
    Exam.find({branch, major, classroom, examState: 1,examType:2}, (err, data) => {
        if (err) return next(err);
        return res.status(200).send(data);
    }).sort({publishDate: -1});
});

router.get('/joined', (req, res, next) => {
    const {examId, userId} = req.query;
    StudentExamAnswer.find({examId, userId}, (err, data) => {
        if (err) return next(err);
        return res.status(200).send({joinedTimes: data.length});
    });

});
export default router;