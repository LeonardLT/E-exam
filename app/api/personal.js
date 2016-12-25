import express from 'express';
import sha1 from 'sha1';
import {User} from '../schema/userSchema';
import _ from 'lodash';

const router = express.Router();

router.get('/', function (req, res, next) {
    const token = req.cookies['token'];
    console.log(token);
    if (_.isEmpty(token)) {
        return res.sendStatus(401);
    }
    else {
        validateToken(token, next, function (err, isValidateToken) {
            if (err) return next(err);
            if (isValidateToken) {
                const username = getUsernameFromToken(token);
                User.findOne({username: username}, (err, data) => {
                    const {branch, major, classroom} = data;
                    return res.json({username, branch, major, classroom});
                });
            } else {
                return res.sendStatus(401);
            }
        });
    }
});

function generateToken(name, password) {
    return name + ':' + sha1(password);
}

function getUsernameFromToken(token) {
    const separatorIndex = _.lastIndexOf(token, ':');
    return token.substring(0, separatorIndex);
}

function validateToken(token, next, callback) {
    if (token === null || token.length === 0 || !token.includes(':')) {
        callback(null, false);
    }
    const name = getUsernameFromToken(token);
    findUser(name, next, function (err, user) {
        if (err) return next(err);
        if (user) {
            const {name, password} = user;
            callback(null, generateToken(name, password) === token);
        }
    });
}

function findUser(username, next, callback) {
    User.findOne({username}, (err, userData) => {
        if (err) return next(err);
        callback(null, userData);
    });
}

export default router;



