import express from 'express';
import problemsApi from './problem-api';
import answersApi from './answers-api';
import loginApi from './sessions-api';
import userApi from './users-api';
import personal from './personal';
import exams from './exams-api';
import question from './question-api';
import score from './score-api';
import questionBank from './questionBank';
import paper from './examPaper-api';


const router = express.Router();

router.use('/problem', problemsApi);
router.use('/answer', answersApi);
router.use('/sessions', loginApi);
router.use('/users', userApi);
router.use('/personal', personal);
router.use('/exams', exams);
router.use('/question', question);
router.use('/questionBank', questionBank);
router.use('/score', score);
router.use('/papers', paper);

export default router;
