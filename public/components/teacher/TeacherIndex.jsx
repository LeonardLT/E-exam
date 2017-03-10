import React from 'react';
import Left from './Left.jsx';
import Main from './Main.jsx';
import {hashHistory} from 'react-router'
import request from 'superagent';
import './css/index-main.css'


export default class TeacherIndex extends React.Component {
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
            <div className="row" style={{width:"100%"}}>
                <div className="col-md-3" style={{width:"23%"}}>
                    {/*<Left nickname={this.state.nickname} userType={this.state.userType}/>*/}
                </div>
                <div className="col-md-9 index-main">
                    {/*<Main/>*/}
                    {/*<button className="btn btn-primary" onClick={this.goToPage("questionBank")}>新增</button>*/}

                </div>
                <div>{this.props.children}</div>
            </div>
        </div>);
    }
    goToPage(page){
        return () => {
            hashHistory.push(page);
        };
    }
}