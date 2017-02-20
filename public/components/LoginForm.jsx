import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
import '../css/LoginForm.css';
import {Link} from 'react-router';


export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userAccount: '',
            password: '',
            type: 0
        }

    }


    render() {
        return (<div>
            <form onSubmit={this._onSubmit.bind(this)} className="loginForm">
                <div className='col-md-4 col-md-offset-4'>
                    <h3 className="welcome">Eurasia-EXAM</h3>
                    <hr/>
                    <div className="form-group">
                        <label>账号：</label>
                        <input className="form-control" type="text" placeholder="请输入用户名" id="userAccount"
                               value={this.state.userAccount}
                               onChange={this._onUserAccountChange.bind(this)}
                        />
                    </div>

                    <div className="form-group">
                        <label>密码：</label>
                        <input className="form-control" type="password" id="password" placeholder="请输入密码"
                               value={this.state.password}
                               onChange={this._onPasswordChange.bind(this)}
                        />
                    </div>

                    {/*<div className="row">*/}
                        {/*<div className='col-md-8'>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-4">*/}
                            {/*<select className="form-control" onChange={this._onTypeChange.bind(this)}>*/}
                                {/*<option value="0">学生</option>*/}
                                {/*<option value="1">教师</option>*/}
                            {/*</select>*/}
                        {/*</div>*/}
                    {/*</div>*/}
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

    _onUserAccountChange(event) {
        this.setState({
            userAccount: event.target.value
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
                userAccount: this.state.userAccount,
                password: this.state.password,
                type: this.state.type
            })
            .end((err, res, req) => {
                if (res.statusCode === 201) {
                    const userType = res.body.type;
                    alert('login success');
                    if (1 === userType) {
                        self.location = '/admin#/teacher';
                    } else if (0 === userType) {
                        // hashHistory.push('/');
                        // console.log(res.body.type);
                        self.location = '/';
                    }
                    // else {
                    //     hashHistory.push('/teacher');
                    // }
                } else if (res.statusCode === 400 && res.text == 'username and password can not be null') {
                    alert(res.text);
                }
                else if (res.statusCode === 401 && res.text === 'username or password is wrong') {
                    alert(res.text);
                }
            })
    }
}

