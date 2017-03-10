import request from 'superagent';

function isLogin(nextState, replace, next) {
    request
        .get('/api/personal')
        .end((err, res) => {
            if (err || res.statusCode === 401) {
                replace('/login');
                next();
            }
            next()
        });
}

module.exports = {
    isLogin
};