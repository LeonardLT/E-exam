import React, {Component} from "react";
import request from 'superagent';
import {hashHistory} from 'react-router'
require("../css/Register.css");
import {Link} from 'react-router';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            branch: '',
            major: '',
            class: ''
        }
    }

    render() {
        return <form onSubmit={this._onSubmit.bind(this)}>
            <div className='col-md-4 col-md-offset-4'>

                <h3>欢迎注册</h3>
                <hr/>
                <div className="form-group">
                    <label>学号：</label>
                    <input type="text" className="form-control" id="username"
                           placeholder="请输入学号" required
                           value={this.state.username}
                           onChange={this._onUsernameChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>分院：</label>
                    <select className="form-control" id="branch"
                            onChange={this._onBranchChange.bind(this)}>
                        <option disabled="disabled" selected="selected">请选择</option>
                        <option value="信息工程学院">信息工程学院</option>
                        <option value="艾德艺术学院">艾德艺术学院</option>
                        <option value="人文教育学院">人文教育学院</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>专业：</label>
                    <select className="form-control" id="major"
                            onChange={this._onMajorChange.bind(this)}>
                        <option disabled="disabled" selected="selected">请选择</option>
                        <option value="软件工程">软件工程</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>邮箱：</label>
                    <input type="email" className="form-control" id="email"
                           placeholder="请输入邮箱" required
                           value={this.state.email}
                           onChange={this._onEmailChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>手机号码：</label>
                    <input type="tel" className="form-control" id="phone"
                           placeholder="请输入手机号码" required pattern="^(\+86)?(1[0-9]{10})$"
                           value={this.state.phone}
                           onChange={this._onPhoneChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>设置密码：</label>
                    <input type="password" className="form-control" id="password"
                           placeholder="请输入密码(至少六位)" required pattern="^.{6,18}$"
                           value={this.state.password}
                           onChange={this._onPasswordChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>确认密码：</label>
                    <input type="password" className="form-control" id="confirm-password"
                           placeholder="请确认密码(至少六位)" required pattern="^.{6,18}$"
                           value={this.state.confirmPassword}
                           onChange={this._onConfirmPasswordChange.bind(this)}/>
                </div>
                <hr/>
                <input type="submit" value="注册" className="btn btn-lg btn-block btn-primary"/>
                <span className="pull-right">有账号?<Link to="login" className="to-register">登陆 </Link></span>
            </div>
        </form>
    }

    _onMajorChange(event) {
        this.setState({
            major: event.target.value
        });
    }

    _onBranchChange(event) {
        this.setState({
            branch: event.target.value
        });
    }

    _onUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    _onEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    _onPhoneChange(event) {
        this.setState({
            phone: event.target.value
        })
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    _onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    _onSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('密码不一致,请重新输入密码!');
        }
        if ('' === this.state.branch || '' === this.state.major) {
            alert('分院或专业不能为空');
        }
        else {
            request.post('/api/users')
                .send({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    phone: this.state.phone,
                    branch: this.state.branch,
                    major: this.state.major,
                })
                .end((err, res) => {
                    if (res.statusCode === 400 && res.text === 'Please finish the form') {
                        alert("Please finish the form!");
                    }
                    if (res.statusCode === 400 && res.text === 'The email is error') {
                        alert("The email is error!");
                    }
                    if (res.statusCode === 400 && res.text === 'The phone number is error') {
                        alert("The phone number is error!");
                    }
                    if (res.statusCode === 409) {
                        alert("用户名已存在!");
                    }
                    if (res.statusCode === 201) {
                        alert("注册成功!");
                        hashHistory.push('/');
                    }
                });
        }

    }
}


