import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
import '../css/LoginForm.css';
import {Link} from 'react-router';


export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentId: '',
            password: ''
        }

    }


    render() {
        return (<div>
            <form onSubmit={this._onSubmit.bind(this)} className="loginForm">
                <div className='col-md-4 col-md-offset-4'>
                    <h3 className="welcome">Eurasia-EXAM</h3>
                    <hr/>
                    <div className="form-group">
                        <label>学号：</label>
                        <input className="form-control" type="text" placeholder="请输入学号" id="studentId"
                               value={this.state.studentId}
                               onChange={this._onStudentIdChange.bind(this)}
                        />
                    </div>

                    <div className="form-group">
                        <label>密码：</label>
                        <input className="form-control" type="password" id="password" placeholder="请输入密码"
                               value={this.state.password}
                               onChange={this._onPasswordChange.bind(this)}
                        />
                    </div>

                    <div className="row">
                        <div className="">
                            <div className='col-md-8'>
                                <input className="form-control" type="text" placeholder="请输入验证码" name="captcha"/>
                            </div>

                            <div className="col-md-4">
                                <img title="点击刷新验证码"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr/>
                        <button type="submit" className="btn btn-lg btn-block btn-primary">登录</button>
                    </div>
                </div>
            </form>
        </div>)
    }

    _onStudentIdChange(event) {
        this.setState({
            studentId: event.target.value
        });
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        request.post('/api/sessions')
            .send({
                studentId: this.state.studentId,
                password: this.state.password
            })
            .end((err, res) => {
                if (res.statusCode === 201) {
                    alert('login success');
                    $("#loginNav").html('' + '<li><a href="/#/personalPage">' + this.state.studentId + '</a></li>' + '<li><a href="/">退出</a></li>');
                    hashHistory.push('/');
                } else if (res.statusCode === 400 && res.text == 'name and password can not be null') {
                    alert(res.text);
                }
                else if (res.statusCode === 401 && res.text === 'name or password is wrong') {
                    alert(res.text);
                }
            })
    }
}

