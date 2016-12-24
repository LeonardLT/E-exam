import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import '../css/personal-page.css';


export default class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'unknown',
            password: '',
            phone: '',
            email: '',
            userOrder: [],
            totalPayPrice: 0
        }
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                console.log(err);
                if (err) {
                    if (res.statusCode === 401) {
                        alert('please login!');
                        return hashHistory.push('/login');
                    } else {
                        return alert('请先登录!!!!!!');
                    }
                }
                console.log("statusCode:" + res.statusCode);
                const {username, phone, email, password} = res.body;
                console.log(res.body);
                this.setState({username: username, phone, email, password});
            });
    }


    _showUserInfo(username) {
        return () => {
            request.get('/api/users')
                .query({username: username})
                .end((err, res) => {
                    const {name, phone, email, password} = res.body;
                    this.setState({username: name, phone, email, password});
                });
        };
    }


    render() {
        this.state.totalPayPrice = 0;
        return <div className="container-fluid">
            <div className="col-md-2" role="tablist">
                <ul className="nav  nav-pills nav-stacked ">
                    <li role="presentation" data-toggle="tab">
                        <a className="list-group-item " role="presentation" data-toggle="collapse" href="#userInfo"
                           aria-controls="userInfo" onClick={this._showUserInfo(this.state.username)}>个人信息</a>
                    </li>
                    <li role="presentation" data-toggle="tab">
                        <a className="list-group-item " role="presentation" data-toggle="collapse"
                           href="#orderInfomations"
                           aria-controls="orderInfomations">个人订单</a>
                    </li>
                    <li role="presentation" data-toggle="tab">
                        <a className="list-group-item " role="presentation" data-toggle="collapse" href="#setting"
                           aria-controls="orderInfomations" onClick={this._showUserInfo(this.state.username)}>修改个人信息</a>
                    </li>
                </ul>
            </div>


            <div className="col-md-10">
                <div className="tab-content">
                    <div className="page-header">
                        <h1> Welcome:
                            <small>{this.state.username}</small>
                        </h1>
                    </div>

                    <div className="collapse" id="userInfo">
                        <div className="well col-md-12 ">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>username</th>
                                        <th>password</th>
                                        <th>phone</th>
                                        <th>email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>{this.state.username}</td>
                                        <td>{this.state.password}</td>
                                        <td>{this.state.phone}</td>
                                        <td>{this.state.email}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="collapse" id="setting">
                        <div className="well col-md-12 ">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>username</th>
                                        <th>password</th>
                                        <th>phone</th>
                                        <th>email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td className="col-md-3"><input name="name" type="text" className="form-control"
                                                                        placeholder={this.state.username}/></td>
                                        <td className="col-md-3"><input className="form-control"
                                                                        placeholder={this.state.password}/></td>
                                        <td className="col-md-3"><input className="form-control"
                                                                        placeholder={this.state.phone}/></td>
                                        <td className="col-md-3"><input className="form-control"
                                                                        placeholder={this.state.email}/></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>


                    <div role="tabpanel" className="tab-pane" id="messages">3</div>
                    <div role="tabpanel" className="tab-pane" id="settings">4</div>
                </div>


            </div>


        </div>;

    }
}


