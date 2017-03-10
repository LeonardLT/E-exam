import {User} from '../app/schema/userSchema';
import request from 'supertest';
import app from '../app/server'
import finish from './finish';
import db from '../app/db/db'
import async from 'async';


describe('dummy', () => {
    beforeEach((done) => {
        db.connect('test', (err) => {
            if (err) return done.fail(err);
            User.find().remove(finish(done));
        });
    });

    afterEach((done) => {
        db.close(finish(done));
    });

    fit('save a user', (done) => {
        async.series([
                (cb) => request(app)
                    .post('/api/users')
                    .send({
                        userAccount: "13420601152251",
                        nickname: "Leonard",
                        headImg: "img/head.png",
                        password: "123456",
                        realName: "刘陶俊楠",
                        cardId: "13420601152251",
                        sex: 1,
                        email: "364125168@qq.com",
                        phone: "18829078216",
                        branch: "信息工程学院",
                        major: "软件工程",
                        grade:13,
                        classroom: "1301",
                        userType: 0
                    }).expect(201, 'register success', cb)
            ],
            finish(done)
        )
        ;
    });

    it('save a user', (done) => {
        async.series([
                (cb) => request(app)
                    .post('/api/users')
                    .send({
                        userAccount: "13420601152251",
                        nickname: "Leonard",
                        headImg: "img/head.png",
                        password: "123456",
                        name: "刘陶俊楠",
                        cardId: "13420601152251",
                        sex: 1,
                        email: "364125168@qq.com",
                        phone: "1882907821",
                        branch: "信息工程学院",
                        major: "软件工程",
                        grade:13,
                        classroom: "1301",
                        type: 0
                    }).expect(400, 'The phone number is error', cb)
            ],
            finish(done)
        )
        ;
    });

});
