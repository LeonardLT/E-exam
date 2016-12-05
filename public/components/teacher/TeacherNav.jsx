import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router'


export default class TeacherNav extends React.Component {


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
                        <Link className="navbar-brand" to="/teacher"><big>Teacher</big></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/teacher">首页</Link></li>
                            {/*<li><Link to="/questionBankPage">题库</Link></li>*/}
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">题库 <span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><Link to="/examQuestionBankPage">考试题库</Link></li>
                                    {/*<li><Link to="/practiceQuestionBankPage">练习题库</Link></li>*/}
                                    <li><Link to="/addQuestion">新增题目</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/exam">考试</Link></li>
                            <li><Link to="/teacher">成绩</Link></li>
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
                    return hashHistory.push('/');
                }
                return hashHistory.push('/personalPage');
            });
    }
}

