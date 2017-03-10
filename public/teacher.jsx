import React from 'react';
import TeacherNav from './components/teacher/TeacherNav.jsx';

import Left from './components/teacher/Left.jsx';
import {hashHistory} from 'react-router'
import request from 'superagent';
import './components/teacher/css/index-main.css'

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '登录',
            userType:''
        }

    }
    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    return hashHistory.push("/login");
                }
                const {nickname,userType} = res.body;
                this.setState({
                    nickname: nickname || '登录',
                    userType:userType
                });
            });
    }

    render() {
        return (<div>
            <TeacherNav/>
            <div className="row" style={{width:"100%"}}>
                <div className="col-md-2" style={{width:"16%"}}>
                    <Left nickname={this.state.nickname} userType={this.state.userType}/>
                </div>
                <div className="col-md-10 index-main">
                    <div>{this.props.children}</div>
                </div>
            </div>
        </div>);
    }
    goToPage(page){
        return () => {
            hashHistory.push(page);
        };
    }
}

export default Hello;