import React from 'react';
import request from 'superagent';
import './css/left.css';
import {hashHistory} from 'react-router';


export default class Left extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            headImg:'',
            realName:'',
        }
    }
        componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/login');
                }
                // const {username, phone, email, password} = res.body;
                const {id, userAccount, headImg,realName, userType} = res.body;
                // this.setState({username: username, phone, email, password, isLogin: true});
                this.setState({id, userAccount, headImg,realName, userType, isLogin: true});
                this._showUserInfo(userAccount);
            });
    }
    render() {
        var {nickname, userType} = this.props;
        return (<div>
            <div className="container" style={{width: "210px", marginTop: "20px"}}>
                <div className="leftImgArea">
                    <img src={this.state.headImg} id="leftHeadImg" className="img-circle headImg"/>
                    <div className="userName">{this.state.realName}</div>
                    <div className="userType">{userType == 1 ? '教师' : ''}</div>
                </div>
                <div className="left-nav">
                    <div className="row" style={{padding: "10px"}}>
                        {/*<div className="col-md-12" style={{marginTop: "5px"}} onClick={this.goToPage("examQuestionBankPage")}>*/}
                        <div className="col-md-12" style={{marginTop: "5px"}} onClick={this.goToPage("questionBankList")}>
                            <button className="btn-primary btn btn-block">试题</button>
                        </div>
                        <div className="col-md-12" style={{marginTop: "5px"}}>
                            <button className="btn-default btn btn-block" onClick={this.goToPage("examPaperList")}>试卷</button>
                        </div>
                        <div className="col-md-12" style={{marginTop: "5px"}}>
                            <button className="btn-default btn btn-block" onClick={this.goToPage("examList")}>考试</button>
                        </div>
                        <div className="col-md-12" style={{marginTop: "5px"}}>
                            {/*<button className="btn-default btn btn-block">练习</button>*/}
                        </div>
                        <br/>
                    </div>
                    <div>
                        个人中心
                    </div>
                    <div className="col-md-12" style={{marginTop: "5px"}}>
                        <button className="btn-default btn btn-block" onClick={this.goToPage("personalPage")}>个人中心</button>
                    </div>
                </div>
            </div>
        </div>);
    }

    goToPage(page) {
        return ()=>{
            hashHistory.push(page);
        }
    }
};