import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import moment from 'moment';
import {Link} from 'react-router';
import {Radio, Pagination} from 'antd';
import {Table, Icon} from 'antd';


export default class AddQuestionBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBankId:String,
            createUserName: '',
            questionBankName: '',
            user_id: Object,
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
            currentQuestionLevel: '',
            currentQuestionAnswerAnalysis: '',
            currentQuestionId: '',
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

                request
                    .get('/api/question/examQuestions')
                    .end((err, res) => {
                        var data = res.body.map(({_id, userName, answerAnalysis, questionLevel, questionType, questionContent, questionOptions, createDate, rightAnswers}) => {
                            return {
                                _id,
                                userName,
                                answerAnalysis,
                                questionType: questionType,
                                questionLevel,
                                questionContent,
                                questionOptions,
                                createDate: moment(createDate).format('YYYY-MM-DD HH:mm'),
                                rightAnswers
                            };
                        });
                        console.log(data);
                        this.setState({
                            // questions: res.body
                            questions: data
                        });

                    });
            });
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
            <div className="row">
                <div className="col-md-2">
                    <h3>题库名称
                        <input type="text" className="form-control" id="questionBankName" placeholder="题库名称"
                               onChange={this._questionBankNameChange.bind(this)} value={this.state.questionBankName}/>
                        <span className="glyphicon glyphicon-edit "/>
                    </h3>
                    {/*<Link to="/addQuestion">添加试题</Link>*/}
                    <div>
                        {/*<Link to="/selectQuestion">添加选择题</Link>*/}
                        <a onClick={this.addSelectQuestion()}>添加选择题</a>
                    </div>
                    <div>
                        <Link to="/blankQuestion">添加填空题</Link>
                    </div>

                    {/*<input type="button" value="Add" onClick={this._onADD.bind(this)}/>*/}
                </div>
                <div className="col-md-10"></div>
            </div>

            {/*<div className="col-md-10" id="test" style={{marginTop: "20px"}}>*/}
                {/*<Table rowKey={this.state.questions._id} columns={columns} dataSource={this.state.questions}*/}
                       {/*pagination={{defaultCurrent: 1, pageSize: 3, onChange: this.onChange}}/>*/}
            {/*</div>*/}
            <div>
                <button className="btn-primary btn" type="button" onClick={this._saveQuestionBank()}>保存</button>
            </div>

            <div>{this.props.children}</div>


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

        </div>);
    }

    _questionBankNameChange(event) {
        this.setState({
            questionBankName: event.target.value
        });
    }

    _saveQuestionBank() {
        return () => {
            request
                .post('/api/questionBank')
                .send({
                    questionBankName: this.state.questionBankName,
                    createDate: moment().format('YYYY-MM-DD HH:mm'),
                    createUserName: this.state.createUserName,
                    createUserId: this.state.user_id,
                    bankType: this.state.bankType
                })
                .end((err, res) => {
                    const stateCode = res.statusCode;
                    if (stateCode === 201) {
                        console.log(res.body);
                        this.setState({
                            questionBankId:res.body.questionBankId
                        });
                        // return hashHistory.push("/index");
                    }
                    else if (stateCode === 400) {
                        return alert(res.text);
                    }
                });
        };
    }

    _onDetailsClick(record) {
        return () => {
            this.setState({
                currentQuestion_Id: record._id,
                currentQuestion: record.questionContent,
                currentQuestionType: (record.questionType === 1 ? "选择题" : "other"),
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
    onChange(page, current, total) {
        console.log("page" + page);
        console.log("current" + current);
        console.log("total" + total);
    }

    addSelectQuestion(){
        return () => {
            hashHistory.push('/selectQuestion/'+this.state.questionBankId);
        };
    }
}