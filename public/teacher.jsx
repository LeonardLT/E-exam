import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
import TeacherNav from './components/teacher/TeacherNav.jsx';

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'unknown'
        };

    }

    componentWillMount() {
    // getInitialState() {
        request
            .get('/api/personal')
            .end((err, res) => {
                console.log(err);
                if (err) {
                    if (res.statusCode === 401) {
                        // alert('please login!');
                        return hashHistory.push('/');
                    } else {
                        return alert('请先登录!');
                    }
                }
                else {
                    hashHistory.push('/teacher');
                }
                this.setState({username: res.body.username});
                console.log(this.state.username);
                if (this.state.username !== 'unknown') {
                    $("#loginNav").html('' + '<li><a href="/admin#/personalPage">' + this.state.username + '</a></li>' + '<li><a href="/" onchange={console.log(1231)}>退出</a></li>');
                }
            });
    }

    render() {
        return (<div>
            <TeacherNav/>
            <div>{this.props.children}</div>
        </div>);
    }
}

export default Hello;