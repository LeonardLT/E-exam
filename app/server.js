import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import path from 'path';

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

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.use(express.static('./public'));

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
app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on 3000');
});