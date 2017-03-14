import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import moment from 'moment';
import {Link} from 'react-router';
import {Radio, Pagination} from 'antd';
import {Table, Icon, Tag} from 'antd';
import {Popconfirm, message} from 'antd';

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.bankId = this.props.params.qbid;
        this.state = {
            questionBankId: String,
            createUserName: '',
            questionBankName: '',
            user_id: '',
            bankType: 1,


            add: 'unknown',
            questions: [],
            // currentQuestion: [],
            // currentQuestionId: '',
            currentQuestionType: '',
            currentQuestion: '',
            currentQuestion_Id: '',
            currentQuestionRightAnswers: [],
            currentQuestionOptions: [],
            currentQuestionRightAnswer: '',
            date: '',
            currentQuestionCreateDate: '',
            currentQuestionUserName: '',
            currentQuestionUserId: '',
            currentQuestionLevel: '',
            currentQuestionAnswerAnalysis: '',
            currentQuestionId: '',
            bankName: '',
            modelQuestion: ''
        }

    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/login');
                }
                const {realName, _id} = res.body;
                this.setState({createUserName: realName, user_id: _id});

            });
        request.get('/api/questionBank/bankId')
            .query({bankId: this.bankId})
            .end((err, res) => {
                const {questionBankName} = res.body;
                this.setState({
                    questionBankName: questionBankName
                });
            });

        request.get('/api/question/bankQuestions')
            .query({bankId: this.bankId})
            .end((err, res) => {
                var data = this._formatDate(res.body);
                this.setState({
                    questions: data
                });
            });
    }

    _editQueestion(question) {
        return () => {
            $('#details').modal('hide');
            const questionType = question.questionType;
            const questionId = question._id;
            const bankId = this.bankId;
            if (questionType === '选择题') {
                return hashHistory.push('/editSelectQuestion/' + bankId + "&" + questionId);
            } else if (questionType === '简答题') {
                return hashHistory.push('/editShortAnswerQuestion/' + bankId + "&" + questionId);
            } else {
                message.warning('操作失败');
            }
        };
    }

    render() {
        const columns = [{
            title: '题目类型',
            dataIndex: 'questionType',
            key: 'questionType',
            render: (text) => {
                if (text === '选择题') {
                    return <Tag color="#108ee9">{text}</Tag>;
                } else if (text === '填空题') {
                    return <Tag color="#87d068">{text}</Tag>;
                } else if (text === '简答题') {
                    return <Tag color="#f50">{text}</Tag>;
                }
            }
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
                    {record.userId === this.state.user_id ?
                        <span>
                            <a onClick={this._editQueestion(record)}>修改</a>
                            <span className="ant-divider"/>
                             <Popconfirm title="确定删除？"
                                         onConfirm={this._deleteQuestion(record._id, record.questionType)}
                                         onCancel={this.cancel} okText="删除"
                                         cancelText="取消">
                                <a href="#">删除</a>
                             </Popconfirm>
                            <span className="ant-divider"/>
                        </span>
                        : ''
                    }

                </span>
            ),
        }];
        return (<div>
            <div className="row">
                <div className="col-md-12" id="test" style={{marginTop: "20px"}}>
                    <Table rowKey={this.state.questions._id} columns={columns} dataSource={this.state.questions}
                           pagination={{defaultCurrent: 1, pageSize: 10, onChange: this.onChange}}/>
                </div>
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
                            <label>题目类型 :&nbsp;&nbsp; </label>{this.state.currentQuestionType}
                            <hr/>
                            <label>题目内容 : </label><br/>{this.state.currentQuestion}
                            <hr/>
                            {this.state.currentQuestionType === '选择题' ?
                                <div>
                                    <label>选项 : </label><br/>
                                    {this.state.currentQuestionOptions.map((cQOptions) => <span style={{marginRight: "15px"}}>
                                {this._questionOptionText(cQOptions.option)} :
                                        {cQOptions.optionContent}
                            </span>)}
                                    <hr/>

                                </div>
                                : ""}
                            <label>正确答案 : </label><br/>
                            {this.state.currentQuestionRightAnswers.map(rightAnswer => <div>
                                {rightAnswer.answerContent}
                            </div>)}
                            <hr/>
                            <div>答案解析：{this.state.currentQuestionAnswerAnalysis}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            {this.state.currentQuestionUserId === this.state.user_id ?
                                <button type="button" className="btn btn-primary" onClick={this._editQueestion(this.state.modelQuestion)}>修改</button>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>);
    }

    _formatDate(data) {
        return data.map(({_id, userName, userId, answerAnalysis, questionLevel, questionType, questionContent, questionOptions, createDate, rightAnswers}) => {
            return {
                _id,
                userName,
                userId,
                answerAnalysis,
                questionType: this._questionTypeText(questionType),
                questionLevel,
                questionContent,
                questionOptions,
                createDate: moment(createDate).format('YYYY-MM-DD HH:mm'),
                rightAnswers
            };
        });
    }

    _deleteQuestion(questionId, questionType) {
        return () => {
            if (questionType === '选择题') {
                questionType = 1
            }
            else if (questionType === '简答题') {
                questionType = 3
            }
            request
                .delete("/api/question")
                .query({bankId: this.bankId, questionId, questionType})
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        message.success("删除成功");
                        this.setState({
                            questions: this._formatDate(res.body)
                        });
                    } else {
                        message.error("删除失败");
                    }
                });
        };
    }

    _onDetailsClick(record) {
        return () => {
            this.setState({
                currentQuestion_Id: record._id,
                currentQuestion: record.questionContent,
                currentQuestionType: record.questionType,
                currentQuestionOptions: record.questionOptions,
                currentQuestionRightAnswers: record.rightAnswers,
                currentQuestionCreateDate: record.createDate,
                currentQuestionLevel: record.questionLevel,
                currentQuestionUserName: record.userName,
                currentQuestionUserId: record.userId,
                currentQuestionAnswerAnalysis: record.answerAnalysis,
                modelQuestion: record
            });
            $('#details').modal('show');
        };
    }

    _questionTypeText(questionType) {
        switch (questionType) {
            case 1:
                return "选择题";
                break;
            case 2:
                return "填空题";
                break;
            case 3:
                return "简答题";
                break;
        }
    }

    onChange(page, current, total) {
    }

    _questionOptionText(option) {
        switch (option) {
            case 0:
                return "A";
                break;
            case 1:
                return "B";
                break;
            case 2:
                return "C";
                break;
            case 3:
                return "D";
                break;
        }
    }

}