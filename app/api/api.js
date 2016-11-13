import express from 'express';
import problemsApi from './problem-api';
import answersApi from './answers-api';

const router = express.Router();

router.use('/problem', problemsApi);
router.use('/answer',answersApi);


export default router;
