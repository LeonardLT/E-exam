import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'


class ExamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examLists: []
        };
    }

    componentWillMount() {
        request.get("/api/exams")
            .end((err, res) => {
                this.setState({
                    examLists: res.body
                });
            });
    }

    render() {
        return (<div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <h3>我的考试</h3>
                    <hr/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>考试Id</th>
                            <th>考试名称</th>
                            <th>时间</th>
                            <th>分院</th>
                            <th>专业</th>
                            <th>参加考试</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.examLists.map(exam =><tr>
                                <td>{exam.examId}</td>
                                <td>{exam.examName}</td>
                                <td>{exam.time}</td>
                                <td>{exam.branch}</td>
                                <td>{exam.major}</td>
                                <td><input className="btn btn-success btn-sm" type="button" value="参加考试"
                                           onClick={this._joinTheExam(exam.examId)}
                                /></td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>);
    }

    _joinTheExam(examId) {
        return () => {
            hashHistory.push('/joinExam/' + examId);
        };
    }
}

export default ExamList;

