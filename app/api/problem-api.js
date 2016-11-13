import express from 'express';
import {Exam} from '../schema/examSchema';
const router = express.Router();

// router.get('/', (req, res, next) => {
//     console.log("problemApi");
//     Exam.find({}, (err, data) => {
//         if (err) return next(err);
//         console.log("---");
//         console.log(data + "------");
//         res.json(data);
//     });
// });

router.get('/', (req, res, next) => {
    Exam.findOne({id:1}, (err, data) => {
        if (err) return next(err);
        console.log(data);
        res.json(data);
    });
});


export default router;