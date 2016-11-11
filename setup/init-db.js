import async from 'async';
import db from '../app/db/db';
import {Exam} from '../app/schema/examSchema';
import examData from './initData/exam.json';


async.series([
  (cb) => {db.connect('exam',cb);},
  (cb) => Exam.find().remove(cb),
  (cb) => {console.log('--Exam delete');cb();},
  (cb) => Exam.create(examData,cb),
  (cb) => {console.log('--Exam created');cb();}
], () => {
  console.log('db init complete!');
});

