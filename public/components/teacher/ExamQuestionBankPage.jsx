import React from 'react';
import AddQuestion from './AddQuestion.jsx';
import {Link} from 'react-router';
import request from 'superagent';
import moment from 'moment';
import {Radio, Pagination} from 'antd';
import {Table, Icon} from 'antd';

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
            currentQuestionOptions: [],
            currentQuestionRightAnswer: '',
            date: '',
            currentQuestionCreateDate: '',
            currentQuestionUserName: '',
            currentQuestionLevel: '',
            currentQuestionAnswerAnalysis: '',
            currentQuestionId: '',
        }

    }


    componentWillMount() {
        request
            .get('/api/question/examQuestions')
            .end((err, res) => {
                var data = res.body.map(({_id,userName,answerAnalysis,questionLevel, questionType, questionContent, questionOptions, createDate, rightAnswers}) => {
                    return {_id,userName,answerAnalysis, questionType:questionType===1?"选择题":"other",questionLevel, questionContent, questionOptions, createDate: moment(createDate).format('YYYY-MM-DD'), rightAnswers};
                });
                console.log(data);
                this.setState({
                    // questions: res.body
                    questions: data
                });

            });
    }

    _test(record) {
        return () => {
            console.log(record);
        };
    }

    render() {
        const columns = [{
            title: '题目类型',
            dataIndex: 'questionType',
            key: 'questionType',
        }, {
            title: '题目内容',
            dataIndex: 'questionContent',
            key: 'questionContent',
            width: 500
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>

      <span className="ant-divider"/>
      <a onClick={this._onDetailsClick(record)}>查看</a>
      <span className="ant-divider"/>
                    <a href="#">修改</a>
      <span className="ant-divider"/>
                    <a href="#">删除</a>
      <span className="ant-divider"/>


    </span>
            ),
        }];

        return (<div>
            <div className="col-md-3">
                <h1>EQB</h1>
                <Link to="/addQuestion">添加试题</Link>
                {/*<input type="button" value="Add" onClick={this._onADD.bind(this)}/>*/}
            </div>
            <div className="col-md-9" id="test">
                <Table rowKey={this.state.questions._id} columns={columns} dataSource={this.state.questions}
                       pagination={{defaultCurrent: 1, pageSize: 3, onChange: this.onChange}}/>
            </div>


            <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true" id="details">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title">问题详情</h4>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="currentQuestionId" value={this.state.currentQuestionId}/>
                            <div className="row">
                                <div className="col-md-4 text-center">创建时间:{this.state.currentQuestionCreateDate}</div>
                                <div className="col-md-4 text-center">题目难度:{this.state.currentQuestionLevel}</div>
                                <div className="col-md-4 text-center">创建人：{this.state.currentQuestionUserName}</div>
                            </div>
                            <hr/>
                            <label>题目类型 :&nbsp;&nbsp; </label>{this.state.currentQuestionType===1?"选择题":""}
                            <hr/>
                            <label>题目内容 : </label><br/>{this.state.currentQuestion}
                            <hr/>
                            <label>选项 : </label><br/>
                            {this.state.currentQuestionOptions.map((cQOptions) => <div>
                                {cQOptions.option} :
                                {cQOptions.optionContent}
                            </div>)}
                            <hr/>
                            <label>正确答案 : </label><br/>
                            {this.state.currentQuestionRightAnswers.map(rightAnswer => <div>
                                {rightAnswer.answerContent}
                            </div>)}
                            <hr/>
                            <div>答案解析：{this.state.currentQuestionAnswerAnalysis}</div>
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

    _onDetailsClick(record) {
        return () => {
            this.setState({
                currentQuestion_Id: record._id,
                currentQuestion: record.questionContent,
                currentQuestionType: (record.questionType===1?"选择题":"other"),
                currentQuestionOptions: record.questionOptions,
                currentQuestionRightAnswers: record.rightAnswers,
                currentQuestionCreateDate: record.createDate,
                currentQuestionLevel: record.questionLevel,
                currentQuestionUserName: record.userName,
                currentQuestionAnswerAnalysis: record.answerAnalysis,
            });
            $('#details').modal('show');
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

    onChange(page, current, total) {
        console.log("page" + page);
        console.log("current" + current);
        console.log("total" + total);
    }
}

export default ExamQuestionBankPage;

