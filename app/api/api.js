import express from 'express';
import problemsApi from './problem-api';
import answersApi from './answers-api';
import loginApi from './sessions-api';
import userApi from './users-api';
import personal from './personal';
import exams from './exams-api';


const router = express.Router();

router.use('/problem', problemsApi);
router.use('/answer', answersApi);
router.use('/sessions', loginApi);
router.use('/users', userApi);
router.use('/personal', personal);
router.use('/exams', exams);

export default router;
