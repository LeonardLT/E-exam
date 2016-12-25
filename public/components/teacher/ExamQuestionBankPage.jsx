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
            // currentQuestion: [],
            currentQuestionId: '',
            currentQuestionType: '',
            currentQuestion: '',
            currentQuestion_Id: '',
            currentQuestionRightAnswers: [],
            currentQuestionRightAnswer: ''

        }

    }


    componentWillMount() {
        request
            .get('/api/question/examQuestions')
            .end((err, res) => {
                this.setState({
                    questions: res.body
                });
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
                        <td>{question._id}</td>
                        <td>{question.questionType}</td>
                        <td>{question.question.substr(0, 10)}……</td>
                        <td>
                            {/*<input type="button" value="查看详情" className="btn btn-primary btn-sm"/>*/}
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                                    data-target="#details" onClick={this._onDetailsClick(question)}>查看详情
                            </button>
                            &nbsp;
                            {/*<input type="button" value="修改" className="btn btn-success btn-sm"/>*/}
                            <button type="button" className="btn btn-success btn-sm" data-toggle="modal"
                                    data-target="#change" onClick={this._onDetailsClick(question)}>修改
                            </button>
                            &nbsp;
                            <input type="button" value="删除" className="btn btn-danger btn-sm"
                                   onClick={this._onDelete(question._id)}/>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>


            <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true" id="details">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <label>题目ID :&nbsp;&nbsp; </label>{this.state.currentQuestion_Id}
                            <hr/>
                            <label>题目类型 :&nbsp;&nbsp; </label>{this.state.currentQuestionType}
                            <hr/>
                            <label>题目内容 : </label><br/>{this.state.currentQuestion}
                            <hr/>
                            <label>正确答案 : </label><br/>
                            {this.state.currentQuestionRightAnswers.map(rightAnswer => <div>
                                {rightAnswer.rightAnswer}
                            </div>)}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true" id="change">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <label>题目ID :&nbsp;&nbsp; </label>
                            <input type="text" value={this.state.currentQuestionId}
                                   onChange={this._onQuestionIdChange.bind(this)}/>
                            <hr/>
                            <label>题目类型 :&nbsp;&nbsp; </label>
                            <input type="text" value={this.state.currentQuestionType}
                                   onChange={this._onQuestionTypeChange.bind(this)}/>
                            <hr/>
                            <label>题目内容 : </label><br/>
                            <textarea className="form-control" rows="3" name="question"
                                      value={this.state.currentQuestion}
                                      onChange={this._onQuestionChange.bind(this)}>

                            </textarea>
                            <hr/>
                            <label>正确答案 : </label><br/>
                            <input type="text" value={this.state.currentQuestionRightAnswer}
                                   onChange={this._onQuestionRightAnswerChange.bind(this)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" ref="buttonClose">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary"
                                    onClick={this._onSaveChangesClick.bind(this)}>Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>);
    }

    _onSaveChangesClick(event) {
        alert("success");
        this.refs.buttonClose.click();
        request
            .post('/api/question/updateQuestion')
            .send({
                question_Id: this.state.currentQuestion_Id,
                question: this.state.currentQuestion,
                questionType: this.state.currentQuestionType,
                questionId: this.state.currentQuestionId,
                questionRightAnswers: this.state.currentQuestionRightAnswers,
                questionRightAnswer: this.state.currentQuestionRightAnswer
            })
            .end((err, res) => {
                this.setState({
                    questions: res.body
                });
            });

    }

    _onQuestionRightAnswerChange(event) {
        this.setState({
            currentQuestionRightAnswer: event.target.value
        });
    }

    _onQuestionIdChange(event) {
        this.setState({
            currentQuestionId: event.target.value
        });
    }

    _onQuestionTypeChange(event) {
        this.setState({
            currentQuestionType: event.target.value
        });
    }

    _onQuestionChange(event) {
        this.setState({
            currentQuestion: event.target.value
        });
    }

    _onDetailsClick(question) {
        let rightAnswer = '';
        question.rightAnswers.forEach(ele => {
            rightAnswer = ele.rightAnswer;
        });
        return () => {
            this.setState({
                currentQuestion_Id: question._id,
                currentQuestion: question.question,
                currentQuestionType: question.questionType,
                currentQuestionId: question.questionId,
                currentQuestionRightAnswers: question.rightAnswers,
                currentQuestionRightAnswer: rightAnswer
            });

        };
    }

    _onDelete(_id) {
        return () => {
            alert(_id);
            request.delete('/api/question')
                .query({_id: _id})
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

