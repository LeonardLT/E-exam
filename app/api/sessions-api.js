import express from 'express';
import {User} from '../schema/userSchema';
import _ from 'lodash';
import sha1 from 'sha1';


const router = express.Router();
router.post('/', (req, res, next) => {
    const studentId = req.body.studentId;
    const password = req.body.password;

    if (_.isEmpty(studentId) || _.isEmpty(password)) {
        return res.status(400).send('studentId and password can not be null');
    }
    else {
        User.findOne({studentId}, (err, userData) => {
            if (err) return next(err);
            if (userData === null || userData.password !== password) {
                return res.status(401).send('studentId or password is wrong');
            }
            else if (userData.password === password) {
                res.cookie('token', generateInfo(studentId, password), {maxAge: 600 * 1000});
                return res.status(201).send('login success');
            }

        });
    }
    function generateInfo(userId, password) {
        return userId + ':' + sha1(password);
    }
});
export default router;
