import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import {Button, Icon, Row, Col, Radio} from 'antd';
import moment from 'moment';
import {Layout, Menu, Breadcrumb, Input, message} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const RadioGroup = Radio.Group;

export default class ExamPaper extends React.Component {
    constructor(props) {
        super(props);
        this.examId = this.props.params.examId;
        this.studentSelAnswers = [];
        this.studentShortAnswer = [];
        this.state = {
            examName: '',
            examDescription: '',
            examScore: '',
            examType: '',
            createDate: '',
            createUserName: '',
            paperType: '',
            joinNum: '',
            beginTime: '',
            endTime: '',
            examTime: '',
            publishDate: '',
            examState: '',
            branch: '',
            major: '',
            classroom: '',
            showScoreDate: '',
            selectQuestions: [],
            shortAnswerQuestions: [],
            examPaper: {},
            paperId: '',
            value: 1,
            userName: '',
            userId: ''
        };
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    message.error("请重新登录");
                    return hashHistory.push('/login');
                }
                const {realName, _id} = res.body;
                this.setState({userName: realName, userId: _id});
            });
        request
            .get('/api/exams/examId')
            .query({examId: this.examId})
            .end((err, res) => {
                const {
                    examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
                    joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper
                }= res.body;
                console.log(res.body);
                this.setState({
                    examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
                    joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper,
                    selectQuestions: examPaper.selectQuestions, shortAnswerQuestions: examPaper.shortAnswerQuestions, paperId: examPaper.paperId
                });
            });
    }

    onChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        return (<div>


            <Layout>
                {/*<Header className="header">*/}
                {/*<div className="logo" />*/}

                {/*</Header>*/}
                <Content style={{padding: '0 50px'}}>

                    <Layout style={{padding: '24px 0', background: '#fff'}}>

                        <Content style={{padding: '0 24px', minHeight: 800}}>
                            <Button onClick={() => {
                                history.go(-1)
                            } }><Icon type="left"/>返回</Button>

                            <hr/>
                            <div>
                                <h4>{this.state.examName}&nbsp;
                                    <small>
                                        {moment(this.state.beginTime).format('YYYY-MM-DD HH:mm')}
                                        ~ {moment(this.state.endTime).format('YYYY-MM-DD HH:mm')}
                                        &nbsp;({this.state.examTime}分钟)
                                    </small>
                                </h4>
                            </div>
                            <div>
                                <h4>总分：{this.state.examPaper.scoreCount}&nbsp;
                                    <small>（选择题：{this.state.examPaper.selectQuestionsScore}分</small>
                                    ,&nbsp;
                                    <small>简答题：{this.state.examPaper.shortAnswerQuestionsScore}分）</small>
                                </h4>
                            </div>
                            <hr/>
                            <h3>选择题
                                <small>({this.state.examPaper.selectQuestionsScore}分)</small>
                            </h3>
                            {this.state.selectQuestions.map((question, i) => <div>

                                <SelectQuestion questionId={question._id}
                                                questionContent={question.questionContent}
                                                questionOptions={question.questionOptions}
                                                num={++i}
                                                questionType={question.questionType}
                                                saveAnswers={this._saveAnswers.bind(this)}
                                />
                            </div>)}

                            <hr/>

                            <h4>简答题
                                <small>({this.state.examPaper.shortAnswerQuestionsScore}分)</small>
                            </h4>
                            <div>
                                {this.state.shortAnswerQuestions.map((question, i) => <div>
                                    <ShortAnswerQuestionQuestion
                                        questionId={question._id}
                                        questionContent={question.questionContent}
                                        num={++i}
                                        questionType={question.questionType}
                                        saveAnswers={this._saveShortAnswers.bind(this)}
                                    />
                                </div>)}
                            </div>
                            <div>
                                <Button type="primary" onClick={this._onSubmit.bind(this)}>交卷</Button>
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    -----------
                </Footer>
            </Layout>
        </div>);
    }

    _onSubmit() {
        let studentAnswers = this.studentSelAnswers.concat(this.studentShortAnswer);
        console.log(studentAnswers);
        request
            .post('/api/answer')
            .send({
                username: this.state.userName,
                userId:this.state.userId,
                examId: this.examId,
                examName: this.state.examName,
                studentSelAnswers:this.studentSelAnswers,
                studentShortAnswer:this.studentShortAnswer,
            })
            .end((err, res) => {
                message.success('ok');
            });
    }

    _saveAnswers(questionType, questionId, answer) {
        const isExistInArray = (questionId, array) => {
            for (let item of array) {
                if (item.questionId == questionId) {
                    return item;
                }
            }
            return null;
        };

        let item = isExistInArray(questionId, this.studentSelAnswers);
        if (item === null && questionType === 1) {
            this.studentSelAnswers.push({
                questionType: questionType,
                questionId: questionId,
                answer: answer
            });
        } else if (questionType === 1) {
            item.answer = answer;
        }
        console.log(this.studentSelAnswers);
    }

    _saveShortAnswers(questionType, questionId, answer) {
        const isExistInArray = (questionId, array) => {
            for (let item of array) {
                if (item.questionId == questionId) {
                    return item;
                }
            }
            return null;
        };

        let item = isExistInArray(questionId, this.studentShortAnswer);
        if (item === null && questionType === 3) {
            this.studentShortAnswer.push({
                questionType: questionType,
                questionId: questionId,
                answer: answer
            });
        } else if (questionType === 3) {
            item.answer = answer;
        }
        console.log(this.studentShortAnswer);
    }

}


class SelectQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.saveAnswers = this.props.saveAnswers;
        this.state = {
            studentAnswer: '',
            value: 1
        }
    }


    render() {
        const {questionId, questionContent, questionOptions, num, questionType} = this.props;
        return (<div>
            <h4>第{num}题：</h4>{questionContent}
            <br/>
            <div style={{padding: "10px"}}>
                <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
                    {questionOptions.map((questionOption) =>
                        <Radio value={questionOption.optionContent}>{this._questionOptionText(questionOption.option)}:
                            {questionOption.optionContent}</Radio>
                    )}
                </RadioGroup>
            </div>
        </div>);
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

    onChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
        this.saveAnswers(this.props.questionType, this.props.questionId, e.target.value);
    }
}

class ShortAnswerQuestionQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.saveAnswers = this.props.saveAnswers;
        super(props);
        this.state = {
            studentAnswer: '',
        }
    }

    render() {
        const {questionId, questionContent, num, questionType} = this.props;
        return (<div>
            <div>
                第{num}题：{questionContent}
                <br/>
                <Input type="textarea" autosize={{minRows: 4, maxRows: 10}} onChange={this._textAreaChange.bind(this)}/>
            </div>
        </div>);
    }

    _textAreaChange(e) {
        this.setState({
            studentAnswer: e.target.value
        });
        this.saveAnswers(this.props.questionType, this.props.questionId, e.target.value);

    }
}
