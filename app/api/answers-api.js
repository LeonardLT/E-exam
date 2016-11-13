import express from 'express';

const router = express.Router();

router.post('/', (req, res, next) => {
    console.log(req.body);
});

export default router;