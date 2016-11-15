import express from 'express';
import {User} from '../schema/schema';
const router = express.Router();
import {validateEmail, validatePhone} from '../tools/user-field-validation';


function existEmpty(userData) {
  return !(userData.name === '' || userData.password === '' || userData.email === '' || userData.phone === '');
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
  User.findOne({name: userData.name}, function (err, doc) {
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
          name: userData.name,
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
  const username = req.query.username;
  User.findOne({name: username}, (err, userInformation) => {
    if (err) return next(err);

    res.json(userInformation);
  });

});
export default router;
