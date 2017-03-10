import express from 'express';
import {User} from '../schema/userSchema';
import {IncId} from '../schema/ids';
import incId from '../tools/incId';
const router = express.Router();
import {validateEmail, validatePhone} from '../tools/user-field-validation';


function existEmpty(userData) {
    return !('' === userData.userAccount
    || '' === userData.password
    || '' === userData.email
    || '' === userData.phone
    || '' === userData.branch
    || '' === userData.major
    || '' === userData.type);
}

function isEmailRight(userData) {
    return validateEmail(userData) !== false;
}

function isPhoneRight(userData) {
    return validatePhone(userData) !== false;
}

function isUserInformationLegal(userData) {
    const isEmpty = existEmpty(userData);
    const isEmail = isEmailRight(userData);
    const isPhone = isPhoneRight(userData);

    if (isEmpty === false) {
        return {type: false, message: 'Please finish the form'};
    } else if (isEmail === false) {
        return {type: false, message: 'The email is error'};
    } else if (isPhone === false) {
        return {type: false, message: 'The phone number is error'};
    }
    return {type: true, message: 'type is true'};
}


function isExist(userData, next, callback) {
    User.findOne({userAccount: userData.userAccount}, function (err, doc) {
        if (err) return next(err);

        callback(null, doc);
    });
}

router.post('/', function (req, res, next) {
    const userData = req.body;
    const legal = isUserInformationLegal(userData);


    if (legal.type === true) {

        isExist(userData, next, function (err, doc) {
            if (err) return next(err);
            if (doc === null) {
                incId(next,(err,incId) => {
                    new User({
                        id: incId,
                        userAccount: userData.userAccount,
                        nickname: userData.userAccount,
                        headImg: "../images/head.png",
                        password: userData.password,
                        realName: userData.userAccount,
                        cardId: userData.userAccount,
                        sex: 0,
                        email: userData.email,
                        phone: userData.phone,
                        branch: userData.branch,
                        major: userData.major,
                        grade:userData.grade,
                        classroom: userData.classroom,
                        userType: userData.userType
                    }).save(function (err) {
                        if (err) return next(err);
                        console.log('save status : success');
                        res.status(201).send('register success');
                    });
                });
            }
            else if (doc !== null) {
                res.status(409).send('the name is exist');
            }
        });


    }
    else {
        res.status(400).send(legal.message);
    }
});


router.get('/', function (req, res, next) {
    const userAccount = req.query.userAccount;
    User.findOne({userAccount: userAccount}, (err, userInformation) => {
        if (err) return next(err);

        res.json(userInformation);
    });

});

router.put("/", (req, res, next) => {
    const {userAccount, nickname, headImg, realName, sex, email, phone} = req.body;
    User.findOneAndUpdate({userAccount}, {nickname, headImg, realName, sex, email, phone}, (err, data) => {
        if (err) return next(err);
        return res.status(200).send("update success");
    });
});
export default router;
