import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router'


export default class Nav extends React.Component {
    render() {
        return (<div>

            <nav className="navbar-inverse" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"><big>EXAM</big></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">首页</a></li>
                            <li><a href="#">试题练习</a></li>
                            <li><Link to="/exam">在线考试</Link></li>
                            <li><a onClick={this._personalClick.bind(this)}>个人中心</a></li>
                        </ul>
                        <ul id="loginNav" className="nav navbar-nav navbar-right">
                            <li><Link to="/login">登陆</Link></li>
                            <li><Link to="/register">注册</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>


        </div>);
    }

    _personalClick(event) {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('请先登录！');
                    return hashHistory.push('/login');
                }
                return hashHistory.push('/personalPage');
            });
    }
};