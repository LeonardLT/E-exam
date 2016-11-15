import express from 'express';
import problemsApi from './problem-api';
import answersApi from './answers-api';
import loginApi from './sessions-api';
import userApi from './users-api';

const router = express.Router();

router.use('/problem', problemsApi);
router.use('/answer', answersApi);
router.use('/sessions', loginApi);
router.use('/users', userApi);


export default router;
