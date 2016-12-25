import React from 'react';
import request from 'superagent';

class AddExam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: 'unknown',
            examName: 'unknown',
            time: 'unknown',
            branch: 'unknown',
            major: 'unknown',
            classroom: 'unknown',
            questions: [],
            selectedQuestions: [],
            type: 'all',
            //currentQuestionId: '',
            currentQuestionType: '',
            currentQuestion: '',
            currentQuestion_Id: '',
            currentQuestionRightAnswers: [],
            currentQuestionRightAnswer: ''

        };
    }

    render() {
        return (<div className="container-fluid">
            <h3>新增考试</h3>
            <hr/>
            <form className="form-horizontal" role="form" onSubmit={this._onSubmit.bind(this)}>
                <div className='col-md-6 col-md-offset-3'>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">examId</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examId"
                                   onChange={this._onExamIdChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">examName</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examName"
                                   onChange={this._onExamNameChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">time</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="time"
                                   onChange={this._onTimeChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">branch</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="branch"
                                   onChange={this._onBranchChange.bind(this)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">major</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="major"
                                   onChange={this._onMajorChange.bind(this)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">classroom</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="classroom"
                                   onChange={this._onClassroomChange.bind(this)}/>
                        </div>
                    </div>

                    <hr/>
                    <label>已选题目:</label>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>题目ID</th>
                            <th>题目类型</th>
                            <th>题目内容</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.selectedQuestions.map(selectedQuestion => <tr>
                            <td>{selectedQuestion._id}</td>
                            <td>{selectedQuestion.questionType}</td>
                            <td data-toggle="tooltip"
                                title={selectedQuestion.question}>{selectedQuestion.question.substr(0, 10)}……
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                                        data-target="#selectedQuestion"
                                        onClick={this._onDetailsClick(selectedQuestion)}>查看详情
                                </button>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>

                    <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog"
                         aria-labelledby="myLargeModalLabel" aria-hidden="true" id="selectedQuestion">
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
                                    <button type="button" className="btn btn-default" data-dismiss="modal"
                                            onClick={() => {
                                                this.refs.showQuestions.click();
                                            }}>返回
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <lable className="col-sm-2 control-label">题型 ：</lable>
                        <div className="col-sm-8">
                            <select className="form-control" onChange={this._onTypeChange.bind(this)}>
                                <option value="all">全部</option>
                                <option value="blankQuestion">填空题</option>
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                                    ref="showQuestions"
                                    data-target="#details" onClick={this._onShowQuestionClick(this.state.type)}>预览题库
                            </button>
                        </div>
                    </div>
                    <hr/>
                    <input className="btn btn-lg btn-block btn-primary" type="submit" value="保存"/>
                </div>
            </form>

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
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>题目ID</th>
                                    <th>题目类型</th>
                                    <th>题目内容</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.questions.map(question => <tr>
                                    <td>{question._id}</td>
                                    <td>{question.questionType}</td>
                                    <td>{question.question.substr(0, 10)}……</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                                                data-target="#selectedQuestion"
                                                onClick={this._onDetailsClick(question)}>查看详情
                                        </button>
                                        &nbsp;
                                        <button type="button" className="btn btn-primary btn-sm"
                                                onClick={this._onAddClick(question)}>添加
                                        </button>
                                    </td>
                                </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" ref="buttonClose">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

    _onSubmit(event) {
        event.preventDefault();
        request
            .post("/api/exams")
            .send({
                examId: this.state.examId,
                examName: this.state.examName,
                time: this.state.time,
                branch: this.state.branch,
                major: this.state.major,
                classroom: this.state.classroom,
                questions: this.state.selectedQuestions,
            })
            .end((err, res) => {
                if (res.statusCode === 201) {
                    alert("save success");
                }else {
                    alert('保存失败');
                }
            });
    }

    _onDetailsClick(question) {
        let rightAnswer = '';
        question.rightAnswers.forEach(ele => {
            rightAnswer = ele.rightAnswer;
        });
        return () => {
            this.refs.buttonClose.click();
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

    _onAddClick(question) {
        return () => {
            let selecteds = this.state.selectedQuestions;
            selecteds.push(question);
            this.setState({
                selectedQuestions: selecteds
            });
            this.refs.buttonClose.click();

        };
    }

    _onTypeChange(event) {
        this.setState({
            type: event.target.value
        });
    }

    _onShowQuestionClick(type) {
        return () => {
            request
                .get('/api/question/type')
                .query({
                    questionType: type
                })
                .end((err, res) => {
                    this.setState({
                        questions: res.body
                    });
                });
        };
    }

    _onExamIdChange(event) {
        this.setState({
            examId: event.target.value
        });
    }

    _onExamNameChange(event) {
        this.setState({
            examName: event.target.value
        });
    }

    _onTimeChange(event) {
        this.setState({
            time: event.target.value
        });
    }

    _onBranchChange(event) {
        this.setState({
            branch: event.target.value
        });
    }

    _onMajorChange(event) {
        this.setState({
            major: event.target.value
        });
    }

    _onClassroomChange(event) {
        this.setState({
            classroom: event.target.value
        });
    }
}

export default AddExam;