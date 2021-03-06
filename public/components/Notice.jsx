import React from 'react';
import {Link} from 'react-router';

export default class Notice extends React.Component {
    render() {
        return (<div>
            <div className="jumbotron">
                <div className="container">
                    <h1>Hello, Eurasia!</h1>
                    <p>Start here , Go anywhere.</p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">了解更多 &raquo;</a></p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>强化练习</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                            malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><Link className="btn btn-default" to="/practice" role="button">查看更多 &raquo;</Link></p>
                    </div>
                    <div className="col-md-4">
                        <h2>考试练习</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                            malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><Link className="btn btn-default" to="/practice" role="button">查看更多 &raquo;</Link></p>
                    </div>
                    <div className="col-md-4">
                        <h2>在线测试</h2>
                        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum
                            id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                            condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        <p><Link className="btn btn-default" to="/exam" role="button">查看更多 &raquo;</Link></p>
                    </div>
                </div>

                <hr/>

                <footer>
                    <p>EU-Exam</p>
                </footer>
            </div>
        </div>);
    }
};