import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import moment from 'moment';
import {message} from 'antd';


export default class AddSelectQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.questionBankId = this.props.params.qbid;
        this.questionId = this.props.params.questionId;
        this.state = {
            userAccount: '',
            realName: '',
            questionType: 1,
            blankType: '',
            questionId: '',
            question: '',
            rightAnswer: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            // rightAnswer:{},
            rightAnswerA: '',
            rightAnswerB: '',
            rightAnswerC: '',
            rightAnswerD: '',
            rightAnswers: [],
            answerAnalysis: '',
            questionLevel: 0,
            userId: Object
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
                const {userAccount, realName, _id} = res.body;
                this.setState({userAccount, realName, userId: _id});
            });
        request
            .get('/api/question/selQuestion')
            .query({bankId: this.questionBankId, questionId: this.questionId})
            .end((err, res) => {
                if (res.statusCode === 200) {
                    const {
                        questionType, blankType, questionContent, questionOptions, rightAnswers, answerAnalysis,
                        createDate, userId, userName, questionLevel, bankId
                    } = res.body;
                    this.setState({
                        questionType, blankType, question: questionContent, answerAnalysis, createDate, questionLevel,
                        optionA: questionOptions[0].optionContent,
                        optionB: questionOptions[1].optionContent,
                        optionC: questionOptions[2].optionContent,
                        optionD: questionOptions[3].optionContent,
                        rightAnswer: rightAnswers[0].answerContent,
                        userId, userName, bankId
                    });

                } else {
                    message.error('操作失败');
                }
            });
    }

    render() {
        return (<div>
            <form className="form-horizontal" onSubmit={this._onSubmit.bind(this)}>
                <div className='col-md-6 col-md-offset-3'>
                    <div className="form-group">
                        <div className="col-md-2">
                            <label className="control-label">题库类型：</label>
                        </div>
                        <div className="col-md-10">
                            <select className="form-control" id="blankType" defaultValue="-1" value={this.state.blankType}
                                    onChange={this._blankTypeChange.bind(this)}>
                                <option disabled="disabled" value="-1">请选择</option>
                                <option value="0">考试题库</option>
                                <option value="1">练习题库</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-2">
                            <label className="control-label">题目类型：</label>
                        </div>
                        <div className="col-md-4">
                            <label className="control-label">选择题</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-2">
                            <label className="control-label">题目难度：</label>
                        </div>
                        <div className="col-md-10">
                                <span style={{marginRight: "10px"}}>
                                    {this.state.questionLevel}
                                </span>
                            <button type="button" className="btn btn-default" onClick={this._addQuestionLevel()}>
                                <span className="glyphicon glyphicon-plus"/>
                            </button>
                            <button type="button" className="btn btn-default" onClick={this._subQuesionLevel()}>
                                <span className="glyphicon glyphicon-minus"/>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-2">
                            <label className="control-label">问题：</label>
                        </div>
                        <div className="col-md-10">
                                <textarea className="form-control" rows="3" name="question" value={this.state.question}
                                          onChange={this._onQuestionChange.bind(this)}>

                                </textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-2">
                            <label className="control-label">选择：</label>
                        </div>
                        <div className="col-md-10">
                            {/*<span className="glyphicon btn-lg glyphicon-plus "/>*/}
                            <div className="form-group">
                                <div className="col-md-1"><label className="control-label">A:</label></div>
                                <div className="col-md-9">
                                    <input id="A" className="form-control" type="text" name="rightAnswers"
                                           value={this.state.optionA}
                                           onChange={this._optionAChange.bind(this)}/>
                                </div>
                                <div className="cil-md-2">
                                    <button type="button" className="btn btn-default" onClick={this._okBtnClick(this.state.optionA)}>
                                        <span className="glyphicon glyphicon-ok"/>
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-1"><label className="control-label">B:</label></div>
                                <div className="col-md-9">
                                    <input id="B" className="form-control" type="text" name="rightAnswers"
                                           value={this.state.optionB}
                                           onChange={this._optionBChange.bind(this)}/>
                                </div>
                                <div className="cil-md-2">
                                    <button type="button" className="btn btn-default" onClick={this._okBtnClick(this.state.optionB)}>
                                        <span className="glyphicon glyphicon-ok"/>
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-1"><label className="control-label">C:</label></div>
                                <div className="col-md-9">
                                    <input id="C" className="form-control" type="text" name="rightAnswers"
                                           value={this.state.optionC}
                                           onChange={this._optionCChange.bind(this)}/>
                                </div>
                                <div className="cil-md-2">
                                    <button type="button" className="btn btn-default" onClick={this._okBtnClick(this.state.optionC)}>
                                        <span className="glyphicon glyphicon-ok"/>
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-1"><label className="control-label">D:</label></div>
                                <div className="col-md-9">
                                    <input id="D" className="form-control" type="text" name="rightAnswers"
                                           value={this.state.optionD}
                                           onChange={this._optionDChange.bind(this)}/>
                                </div>
                                <div className="cil-md-2">
                                    <button type="button" className="btn btn-default" onClick={this._okBtnClick(this.state.optionD)}>
                                        <span className="glyphicon glyphicon-ok"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-2">
                            <label className="control-label">正确答案：</label>
                        </div>
                        <div className="col-md-10">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <input id="D" className="form-control" type="text" name="rightAnswers"
                                           value={this.state.rightAnswer}
                                           onChange={this._rightAnswerChange.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-2">
                            <label className="control-label">答案解析：</label>
                        </div>
                        <div className="col-md-10">
                                <textarea className="form-control" rows="3" name="answerAnalysis"
                                          value={this.state.answerAnalysis}
                                          onChange={this._onAnswerAnalysisChange.bind(this)}>

                                </textarea>
                        </div>
                    </div>

                    <input className="btn btn-lg btn-block btn-primary" type="submit" value="保存"/>
                    <br/>
                    <br/>
                </div>
            </form>


        </div>);
    }

    _addQuestionLevel() {
        return () => {
            this.setState({
                questionLevel: this.state.questionLevel + 1 > 10 ? 10 : this.state.questionLevel + 1
            });
        };
    }

    _subQuesionLevel() {
        return () => {
            this.setState({
                questionLevel: this.state.questionLevel - 1 > 0 ? this.state.questionLevel - 1 : 0
            });
        };
    }

    _onAnswerAnalysisChange(event) {
        this.setState({
            answerAnalysis: event.target.value
        });
    }

    _rightAnswerChange(event) {
        this.setState({
            rightAnswer: event.target.value
        });
    }

    _okBtnClick(option) {
        return () => {
            this.setState({
                rightAnswer: option
            });
        };
    }


    _questionTypeChange(event) {
        this.setState({
            questionType: event.target.value
        });

    }

    _blankTypeChange(event) {
        this.setState({
            blankType: event.target.value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        var questionContent = this.state.question;
        var questionOptions = [];
        var optionA = {option: 0, optionContent: this.state.optionA};
        var optionB = {option: 1, optionContent: this.state.optionB};
        var optionC = {option: 2, optionContent: this.state.optionC};
        var optionD = {option: 3, optionContent: this.state.optionD};
        questionOptions.push(optionA);
        questionOptions.push(optionB);
        questionOptions.push(optionC);
        questionOptions.push(optionD);
        var rightAnswers = [];
        var rightAnswer = {answerContent: this.state.rightAnswer};
        rightAnswers.push(rightAnswer);
        var answerAnalysis = this.state.answerAnalysis;
        var questionType = this.state.questionType;
        var blankType = this.state.blankType;
        // var createDate = new Date();
        var createDate = moment().format('YYYY-MM-DD HH:mm');
        var userAccount = this.state.userAccount;
        var userId = this.state.userId;
        var userName = this.state.realName;
        var questionLevel = this.state.questionLevel;
        if (this.questionId !== undefined && this.questionId !== null) {
            request
                .put('/api/question')
                .send({
                    questionId: this.questionId,
                    questionType: questionType,
                    blankType: blankType,
                    questionContent: questionContent,
                    questionOptions: questionOptions,
                    rightAnswers: rightAnswers,
                    answerAnalysis: answerAnalysis,
                    createDate: createDate,
                    userId: userId,
                    userName: userName,
                    questionLevel: questionLevel,
                    bankId: this.questionBankId
                })
                .end((err, res) => {
                    const stateCode = res.statusCode;
                    if (stateCode === 200) {
                        message.success(res.text);
                        return hashHistory.push("/questionBank/" + this.questionBankId);
                    }
                    else if (stateCode === 400) {
                        return message.warning(res.text)
                    } else {
                        return message.error('操作失败');
                    }
                });

        } else {
            request
                .post('/api/question')
                .send({
                    questionType: questionType,
                    blankType: blankType,
                    questionContent: questionContent,
                    questionOptions: questionOptions,
                    rightAnswers: rightAnswers,
                    answerAnalysis: answerAnalysis,
                    createDate: createDate,
                    userId: userId,
                    userName: userName,
                    questionLevel: questionLevel,
                    bankId: this.questionBankId
                })
                .end((err, res) => {
                    const stateCode = res.statusCode;
                    if (stateCode === 201) {
                        message.success(res.text);
                        return hashHistory.push("/questionBank/" + this.questionBankId);
                    }
                    else if (stateCode === 400) {
                        return message.warning(res.text)
                    } else {
                        return message.error('操作失败');
                    }
                });
        }


    }


    _onQuestionChange(event) {
        this.setState({
            question: event.target.value
        });
    }

    _optionAChange(event) {
        this.setState({
            optionA: event.target.value
        });
    }

    _optionBChange(event) {
        this.setState({
            optionB: event.target.value
        });
    }

    _optionCChange(event) {
        this.setState({
            optionC: event.target.value
        });
    }

    _optionDChange(event) {
        this.setState({
            optionD: event.target.value
        });
    }
}