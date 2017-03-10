import React from 'react';
import './css/left.css';
import {hashHistory} from 'react-router';


export default class Left extends React.Component {
    render() {
        var {nickname, userType} = this.props;
        return (<div>
            <div className="container" style={{width: "210px", marginTop: "20px"}}>
                <div className="leftImgArea">
                    <img src="../../images/head.jpg" className="img-circle headImg"/>
                    <div className="userName">{nickname}</div>
                    <div className="userType">{userType == 1 ? '教师' : ''}</div>
                </div>
                <div className="left-nav">
                    <div className="row" style={{padding: "10px"}}>
                        {/*<div className="col-md-12" style={{marginTop: "5px"}} onClick={this.goToPage("examQuestionBankPage")}>*/}
                        <div className="col-md-12" style={{marginTop: "5px"}} onClick={this.goToPage("questionBankList")}>
                            <button className="btn-primary btn btn-block">试题</button>
                        </div>
                        <div className="col-md-12" style={{marginTop: "5px"}}>
                            <button className="btn-default btn btn-block">试卷</button>
                        </div>
                        <div className="col-md-12" style={{marginTop: "5px"}}>
                            <button className="btn-default btn btn-block">考试</button>
                        </div>
                        <div className="col-md-12" style={{marginTop: "5px"}}>
                            <button className="btn-default btn btn-block">练习</button>
                        </div>
                        <br/>
                    </div>
                    <div>
                        个人中心
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