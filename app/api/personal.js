import express from 'express';
import sha1 from 'sha1';
import {User} from '../schema/userSchema';
import _ from 'lodash';

const router = express.Router();

router.get('/', function (req, res, next) {
    const token = req.cookies['token'];
    if (_.isEmpty(token)) {
        // return res.sendStatus(401).send('not login');
        return res.sendStatus(401);
    }
    else {
        validateToken(token, next, function (err, isValidateToken) {
            if (err) return next(err);
            if (isValidateToken) {
                const userAccount = getUserAccountFromToken(token);
                User.findOne({userAccount: userAccount}, (err, data) => {
                    const {_id,id,userAccount,realName,headImg,nickname,userType} = data;
                    return res.json({_id,id,userAccount,realName,headImg,nickname,userType});
                });
            } else {
                return res.sendStatus(401);
            }
        });
    }
});

function generateToken(userAccount, password) {
    return userAccount + ':' + sha1(password);
}

function getUserAccountFromToken(token) {
    const separatorIndex = _.lastIndexOf(token, ':');
    return token.substring(0, separatorIndex);
}

function validateToken(token, next, callback) {
    if (token === null || token.length === 0 || !token.includes(':')) {
        callback(null, false);
    }
    const userAccount = getUserAccountFromToken(token);
    findUser(userAccount, next, function (err, user) {
        if (err) return next(err);
        if (user) {
            const {userAccount, password} = user;
            callback(null, generateToken(userAccount, password) === token);
        }
    });
}

function findUser(userAccount, next, callback) {
    User.findOne({userAccount}, (err, userData) => {
        if (err) return next(err);
        callback(null, userData);
    });
}

export default router;



