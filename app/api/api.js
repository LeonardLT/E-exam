import express from 'express';
import problemApi from './problem-api';


const router = express.Router();

router.use('/problem', problemApi);


export default router;
