import async from 'async';
import db from '../app/db/db';
import {Exam} from '../app/schema/examSchema';
import examData from './initData/exam.json';
import incId from '../app/tools/incId'
import {IncId} from '../app/schema/ids'
import {User} from '../app/schema/userSchema'


async.series([
    (cb) => {db.connect('exam', cb);},
    (cb) =>{IncId.find().remove(cb);},
    (cb) =>{User.find().remove(cb);},
    (cb) => new IncId({_id: "incId", id: 0})
        .save(function (err, data) {
        console.log('save status:success');
        cb();
    })
    // (cb) => Exam.find().remove(cb),
    // (cb) => {console.log('--Exam delete');cb();},
    // (cb) => Exam.create(examData,cb),
    // (cb) => {console.log('--Exam created');cb();}
], () => {
    console.log('db init complete!');
});

