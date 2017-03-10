import {IncId} from '../app/schema/ids';
import request from 'supertest';
import app from '../app/server'
import finish from './finish'
import db from '../app/db/db'
import async from 'async';
import incId from '../app/tools/incId';


describe('question-spec', () => {

    beforeEach((done) => {
        db.connect('test', (err) => {
            if (err) return done.fail(err);
            IncId.find().remove(finish(done));
        });
    });

    afterEach((done) => {
        db.close(finish(done));
    });


    it('init : save a userId', (done) => {
        async.series([
                (cb) => {
                    const incId = new IncId({
                        _id: "incId",
                        id: 0
                    }).save(function (err, data) {
                        if (err) return next(err);
                        console.log('save status:', err ? 'failed' : 'success');
                        // console.log(data);
                        cb();
                    });
                }
            ],
            finish(done)
        );
    });

    it('findAndModify', (done) => {
        async.series({
                init: (cb) => {
                    const incId = new IncId({
                        _id: "incId",
                        id: 0
                    }).save(function (err, data) {
                        if (err) return next(err);
                        console.log('save status:', err ? 'failed' : 'success');
                        // console.log(data);
                        cb()
                    });
                },
                getOneId: (cb) => {
                    IncId.findByIdAndUpdate({_id: 'incId'}, {$inc: {id: 1}}, function (err, id) {
                        if (err) return next(err);
                        cb(null, id.id);
                    });
                },
                getTwoId: (cb) => {
                    IncId.findByIdAndUpdate({_id: 'incId'}, {$inc: {id: 1}}, function (err, id) {
                        if (err) return next(err);
                        cb(null, id.id);
                    });
                }
            }, (err, results) => {
                console.log("---get first inc Id:" + results.getOneId);
                console.log("---get second inc Id:" + results.getTwoId);
                db.close(finish(done));
                // finish(done)
            }
        );
    });

    fit('get incId', (done) => {
        async.series({
                init: (cb) => {
                    const incId = new IncId({
                        _id: "incId",
                        id: 0
                    }).save(function (err, data) {
                        if (err) return next(err);
                        console.log('save status:', err ? 'failed' : 'success');
                        // console.log(data);
                        cb()
                    });
                },
                getOneId: (cb) => {
                    incId((incId) => {
                        console.log(incId+'----------');
                        cb(null, incId)
                    });
                }
            }, (err, results) => {
                console.log("---get first inc Id:" + results.getOneId);
                db.close(finish(done));
                // finish(done)
            }
        );
    });


});
