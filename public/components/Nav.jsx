import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router';


export default class Nav extends React.Component {

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
                    return;
                }
                const {nickname} = res.body;
                this.setState({nickname: nickname || '登录'});
                console.log(nickname);
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
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#"><big>EXAM</big></a>
                    </div>

                    <div className="collapse navbar-collapse myTabs" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className={this.state.currentNav===0 ? 'active' :''}>
                                <a href="#" onClick={ () => {this.setState({currentNav:0})}}>首页</a>
                            </li>
                            <li className={this.state.currentNav===1 ? 'active' :''}>
                                <a href="#" onClick={ () => {this.setState({currentNav:1})}}>试题练习</a>
                            </li>
                            <li className={this.state.currentNav===2 ? 'active' :''}>
                                <Link to="/exam" onClick={ () => {this.setState({currentNav:2})}}>在线考试</Link>
                            </li>
                            <li className={this.state.currentNav===3 ? 'active' :''}>
                                <Link to="/PersonalPage" onClick={ () => {this.setState({currentNav:3})}}>个人中心</Link>
                            </li>
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
                // alert(res.body.message);
                // self.location = '/';
                window.location.href = "/";

            });
    }
};