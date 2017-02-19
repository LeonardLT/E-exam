import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import apiRouter from './api/api.js';
import db from './db/db';


const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: webpackConfig.output.publicPath
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.use(express.static('./public'));

app.use('/api', apiRouter);

app.get('/hello', function (req, res) {
    res.send('Student, world!');
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..') + '/public/index.html')
});

app.get('/admin', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..') + '/public/admin.html')
});

// app.listen(3000, function () {
// app.listen(process.env.PORT || 3000, function () {
//     console.log('Listening on 3000');
// });
if (require.main === module) {
    app.listen(process.env.PORT || 3000, function () {
        db.connect((err) => {
            if (err) return console.error('db connection failed');
        });
        console.log('Listening on 3000 , http://localhost:3000');
    });
}
export default app;