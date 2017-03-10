import express from 'express';
import {User} from '../schema/userSchema';
import _ from 'lodash';
import sha1 from 'sha1';


const router = express.Router();
router.post('/', (req, res, next) => {
    const userAccount = req.body.userAccount;
    const password = req.body.password;
    const type = Number(req.body.userType);
    if (_.isEmpty(userAccount) || _.isEmpty(password) || type == null) {
        return res.status(400).send('username or password or type can not be null');
    }
    else {
        User.findOne({userAccount}, (err, userData) => {
            if (err) return next(err);
            // if (userData === null || userData.password !== password || userData.type !== type) {
            if (userData === null || userData.password !== password) {
                return res.status(401).send('username or password is wrong');
            }
            // else if (userData.password === password && userData.type === type) {
            else if (userData.password === password ) {
                res.cookie('token', generateInfo(userAccount, password), {maxAge: 60 * 30000});
                // return res.status(201).send('login success');
                return res.status(201).send({userType:userData.userType});
            }

        });
    }
    function generateInfo(userAccount, password) {
        return userAccount + ':' + sha1(password);
    }
});

router.post('/loginOut',(req,res,next) => {
    res.clearCookie("token").send('login out');
});
export default router;
