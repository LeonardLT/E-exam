import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import '../css/personal-page.css';


export default class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            username: 'unknown',
            password: 'unknown',
            phone: 'unknown',
            email: 'unknown',
            examId: 'unknown',
            examName: 'unknown',
            score: 'unknown',
            data: []
        };
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/login');
                }
                const {username, phone, email, password} = res.body;
                this.setState({username: username, phone, email, password, isLogin: true});
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

    _showScore(event) {
        request.get('/api/score/getMyAllScore')
            .query({
                username: this.state.username,
            })
            .end((err, data) => {
                // const {examId, examName, score} = data;
                // console.log(data.body);
                this.setState({
                    data: data.body
                });
                return hashHistory.push('/myScore');
            });
    }

    render() {
        this.state.totalPayPrice = 0;
        return <div>
            {this.state.isLogin === false ? "" :
                <div className="container-fluid">
                    <div className="col-md-2" role="tablist">
                        <br/>
                        <br/>
                        <br/>
                        <ul className="nav  nav-pills nav-stacked ">
                            <li role="presentation" data-toggle="tab">
                                <a className="list-group-item " role="presentation" data-toggle="collapse" href="#userInfo"
                                   aria-controls="userInfo" onClick={this._showUserInfo(this.state.username)}>个人信息</a>
                            </li>
                            <li role="presentation" data-toggle="tab">
                                <a className="list-group-item " role="presentation" data-toggle="collapse" href="#setting"
                                   aria-controls="orderInfomations" onClick={this._showUserInfo(this.state.username)}>修改个人信息</a>
                            </li>
                            <li role="presentation" data-toggle="tab">
                                <a className="list-group-item " role="presentation" data-toggle="collapse"
                                   href="#orderInfomations"
                                   aria-controls="orderInfomations" onClick={this._showScore.bind(this)}>成绩</a>
                            </li>
                        </ul>
                    </div>


                    <div className="col-md-10">
                        <div className="tab-content">
                            <div className="page-header">
                                <h1> Welcome
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
                        </div>

                        {this.props.children}
                    </div>
                </div>
            }
        </div>;

    }
}




