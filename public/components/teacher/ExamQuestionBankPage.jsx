import React from 'react';
import AddQuestion from './AddQuestion.jsx';
import {Link} from 'react-router';
import request from 'superagent';


class ExamQuestionBankPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: 'unknown',
            questions: [],
            currentQuestion: []
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.questions.map(question => <tr>
                        <td>{question.questionId}</td>
                        <td>{question.questionType}</td>
                        <td>{question.question.substr(0,10)}……</td>
                        <td>
                            {/*<input type="button" value="查看详情" className="btn btn-primary btn-sm"/>*/}
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                                    data-target=".bs-example-modal-lg" onClick={this._onDetailsClick(question)}>查看详情
                            </button>
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


            <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <label>题目ID :&nbsp;&nbsp; </label>{this.state.currentQuestion.questionId}<hr/>
                            <label>题目类型 :&nbsp;&nbsp; </label>{this.state.currentQuestion.questionType}<hr/>
                            <label>题目内容 : </label><br/>{this.state.currentQuestion.question}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>);
    }

    _onDetailsClick(question) {
        return () => {
            this.setState({
                currentQuestion: question
            });

        };
    }

    _onDelete(id) {
        return () => {
            alert(id);
            request.delete('/api/question')
                .query({id: id})
                .end((err, res) => {
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

