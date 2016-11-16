import express from 'express';
import {User} from '../schema/userSchema';
import _ from 'lodash';
import sha1 from 'sha1';


const router = express.Router();
router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    if (_.isEmpty(username) || _.isEmpty(password) || _.isEmpty(type)) {
        return res.status(400).send('username or password or type can not be null');
    }
    else {
        User.findOne({username}, (err, userData) => {
            if (err) return next(err);
            if (userData === null || userData.password !== password || userData.type !== type) {
                return res.status(401).send('username or password is wrong');
            }
            else if (userData.password === password && userData.type === type) {
                res.cookie('token', generateInfo(username, password), {maxAge: 60 * 1000});
                return res.status(201).send('login success');
            }

        });
    }
    function generateInfo(userId, password) {
        return userId + ':' + sha1(password);
    }
});
export default router;
