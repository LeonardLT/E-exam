import React from 'react';
import AddQuestion from './AddQuestion.jsx';
import {Link} from 'react-router';
import request from 'superagent';


class ExamQuestionBankPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: 'unknown',
            questions: []
        }
    }


    componentWillMount() {
        request
            .get('/api/question/examQuestions')
            .end((err, res) => {
                this.setState({
                    questions: res.body
                });
                console.log(this.state.questions);
            });
    }

    render() {
        return (<div>
            <div className="col-md-4">
                <h1>ExamQuestionBankPage</h1>
                <Link to="/addQuestion">AddBlankQuestion</Link>
                <input type="button" value="Add" onClick={this._onADD.bind(this)}/>
            </div>
            <div className="col-md-8" id="test">

                <table className="table">
                    <thead>
                    <tr>
                        <th>题目ID</th>
                        <th>题目类型</th>
                        <th>题目内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.questions.map(question => <tr>
                        <td>{question.questionId}</td>
                        <td>{question.questionType}</td>
                        <td>{question.question}</td>
                        <td><input type="button" value="查看详情" className="btn btn-primary btn-sm"/>
                            &nbsp;
                            <input type="button" value="修改" className="btn btn-success btn-sm"/>
                            &nbsp;
                            <input type="button" value="删除" className="btn btn-danger btn-sm"
                                   onClick={this._onDelete(question._id)}/>
                        </td>
                    </tr>)}
                    </tbody>
                </table>

            </div>

        </div>);
    }

    _onDelete(id) {
        return () => {
            alert(id);
            request.delete('/api/question')
                .query({id: id})
                .end((err,res) => {
                    this.setState({
                        questions: res.body
                    });
                });
        };
    }


    _onADD(event) {
        var t = document.getElementById("test");
        var btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("value", "testBtn");
    }
}

export default ExamQuestionBankPage;

