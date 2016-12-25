import express from 'express';
import {Exam} from '../schema/examSchema';
import {ExamScore} from '../schema/examScoreSchema';

const router = express.Router();

router.post('/', (req, res, next) => {

    const {username, examName, _id, studentAnswers} = req.body;
    console.log(username + "~!@~!~@!~");
    let score = 0;
    let findAnswer = (question_Id, questions) => {
        const rightAnswers = questions.find(question => question._id == question_Id).rightAnswers;
        // console.log(rightAnswers[0].rightAnswer);
        return rightAnswers[0].rightAnswer;
    };

    const rightAnswers = [];
    Exam.findOne({_id: _id}, (err, {questions}) => {
        if (err) return next(err);
        questions.map(question => {
            rightAnswers.push(question.answer)
        });


        studentAnswers.map(({question_Id, answer}) => {
            const rightAnswer = findAnswer(question_Id, questions);
            console.log("++answer" + answer);
            console.log("++rightAnswer" + rightAnswer);
            if (answer == rightAnswer) {
                score += 1;
            }
        });

        var examScore = new ExamScore({
            exam_Id: _id,
            examName: examName,
            username: username,
            score: score
        });
        console.log(examScore);
        examScore.save(() => {
            if (err) return next(err);
            console.log("成绩：" + score);
            console.log('save status:', err ? 'failed' : 'success');
            return res.json({score: score});
        });
    });


});

export default router;