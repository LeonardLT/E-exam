import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';


export default class MyScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    return hashHistory.push('/login');
                }
                const {username} = res.body;
                this.setState({username: username});
                console.log(this.state.username);
                request.get('/api/score/getMyAllScore')
                    .query({
                        username: this.state.username,
                    })
                    .end((err, data) => {
                        this.setState({
                            data: data.body
                        });
                    });
            });
    }

    render() {
        return (<div>
            <table className="table">
                <thead>
                <tr>
                    <th>exam_id</th>
                    <th>考试名称</th>
                    <th>成绩</th>
                </tr>
                </thead>
                <tbody>
                {this.state.data.map(exam => <tr>
                        <td>{exam.exam_Id}</td>
                        <td>{exam.examName}</td>
                        <td> {exam.score}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>);

    }
}