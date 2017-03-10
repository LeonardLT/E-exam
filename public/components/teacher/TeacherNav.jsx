import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router'


export default class TeacherNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: '登录',
            currentNav: 0
        }

    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    return hashHistory.push("/login");
                }
                const {nickname} = res.body;
                this.setState({nickname: nickname || '登录'});
            });
    }

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
                            <li className="active"><Link to="/index">首页</Link></li>
                            {/*<li><Link to="/questionBankPage">题库</Link></li>*/}
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">题库
                                    <span className="glyphicon glyphicon-chevron-down"/>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><Link to="/examQuestionBankPage">考试题库</Link></li>
                                    {/*<li><Link to="/practiceQuestionBankPage">练习题库</Link></li>*/}
                                    <li><Link to="/addQuestion">新增题目</Link></li>
                                </ul>
                            </li>
                            {/*<li><Link to="/exam">考试</Link></li>*/}
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">考试
                                    <span className="glyphicon glyphicon-chevron-down"/>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><Link to="/addExam">创建考试</Link></li>
                                    <li><Link to="/showExam">查看考试</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/teacher">成绩</Link></li>
                            <li><a>个人中心</a></li>
                        </ul>
                        <ul id="loginNav" className="nav navbar-nav navbar-right">
                            <li><Link to={this.state.nickname!=='登录' ? '/personalPage' :'/login'}>{this.state.nickname}</Link></li>
                            {this.state.nickname !== '登录' ?
                                <li><a href='javascript:void(0);' onClick={this._loginOut.bind(this)}>退出</a></li>
                                :
                                <li><Link to="/register">注册</Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>


        </div>);
    }

    _loginOut(event) {
        request
            .post('/api/sessions/loginOut')
            .end((err, res) => {
                window.location.href = "/";
            });
    }
}

