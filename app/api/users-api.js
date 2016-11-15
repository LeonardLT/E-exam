import express from 'express';
import {User} from '../schema/userSchema';
const router = express.Router();
import {validateEmail, validatePhone} from '../tools/user-field-validation';


function existEmpty(userData) {
  return !(userData.studentId === '' || userData.password === '' || userData.email === '' || userData.phone === '');
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
  User.findOne({studentId: userData.studentId}, function (err, doc) {
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
        var user = new User({
          studentId: userData.studentId,
          password: userData.password,
          email: userData.email,
          phone: userData.phone
        });
        user.save(function (err) {
          if (err) return next(err);
          console.log('save status:', err ? 'failed' : 'success');
          res.status(201).send('register success');
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
  const studentId = req.query.studentId;
  User.findOne({studentId: studentId}, (err, userInformation) => {
    if (err) return next(err);

    res.json(userInformation);
  });

});
export default router;
