import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
import '../css/LoginForm.css';
import {Link} from 'react-router';


export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            type: '学生'
        }

    }


    render() {
        return (<div>
            <form onSubmit={this._onSubmit.bind(this)} className="loginForm">
                <div className='col-md-4 col-md-offset-4'>
                    <h3 className="welcome">Eurasia-EXAM</h3>
                    <hr/>
                    <div className="form-group">
                        <label>用户名：</label>
                        <input className="form-control" type="text" placeholder="请输入用户名" id="username"
                               value={this.state.username}
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
                        <div className='col-md-8'>
                        </div>
                        <div className="col-md-4">
                            <select className="form-control" onChange={this._onTypeChange.bind(this)}>
                                <option value="学生">学生</option>
                                <option value="教师">教师</option>
                            </select>
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

    _onTypeChange(event) {
        this.setState({
            type: event.target.value
        });
    }

    _onStudentIdChange(event) {
        this.setState({
            username: event.target.value
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
                username: this.state.username,
                password: this.state.password,
                type: this.state.type
            })
            .end((err, res,req) => {
                if (res.statusCode === 201) {
                    alert('login success');
                    $("#loginNav").html('' + '<li><a href="/#/personalPage">' + this.state.username + '</a></li>' + '<li><a href="/" onchange={console.log(1231)}>退出</a></li>');
                    if ('教师' === this.state.type) {
                        alert("Welcome the teacher!");
                        // var a = req.cookies['token'];
                        // const token = req.cookies['token'];
                        // console.log(token);
                        self.location = '/admin#/teacher';
                    } else {
                        hashHistory.push('/teacher');
                    }
                } else if (res.statusCode === 400 && res.text == 'username and password can not be null') {
                    alert(res.text);
                }
                else if (res.statusCode === 401 && res.text === 'username or password is wrong') {
                    alert(res.text);
                }
            })
    }
}

