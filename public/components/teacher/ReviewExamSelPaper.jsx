import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import {Button, Icon, Row, Col, Radio, Layout, Menu, Breadcrumb, InputNumber, Input, message, Alert, Tag, Modal} from 'antd';
import moment from 'moment';
const {Header, Content, Footer, Sider} = Layout;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

export default class ReviewExamPaper extends React.Component {
    constructor(props) {
        super(props);
        this.examId = this.props.params.examId;
        this.userId = this.props.params.userId;
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
            userId: '',
            studentShortAnswer: [],
            studentSelAnswers: [],
            studentName: '',
            selectQuestionsScore: 0,//选择题最大分数
            shortAnswerQuestionsScore: 0,//简答题最大分数
            studentSelScore: 0,//学生选择题分数
            studentShortAnsScore: 0,//学生简答题分数,
            studentExamScore: {}

        };
    }

    componentWillMount() {

        request
            .get('/api/studentAnswer/studentAnswer')
            .query({examId: this.examId, userId: this.userId})
            .end((err, res) => {
                if (res.statusCode === 200) {
                    const studentSelAnswers = res.body.studentSelAnswers;
                    const studentShortAnswer = res.body.studentShortAnswer;
                    const studentName = res.body.userName;

                    this.setState({
                        studentShortAnswer: studentShortAnswer,
                        studentSelAnswers: studentSelAnswers,
                        studentName: studentName
                    });
                }
            });
        request
            .get('/api/exams/examId')
            .query({examId: this.examId})
            .end((err, res) => {
                const {
                    examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
                    joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper
                }= res.body;
                this.setState({
                    examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
                    joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper,
                    selectQuestions: examPaper.selectQuestions, shortAnswerQuestions: examPaper.shortAnswerQuestions, paperId: examPaper.paperId,
                    selectQuestionsScore: examPaper.selectQuestionsScore, shortAnswerQuestionsScore: examPaper.shortAnswerQuestionsScore
                });
            });
        request
            .get('/api/score/oneExamScore')
            .query({examId: this.examId, userId: this.userId})
            .end((err, res) => {
                if (res.statusCode === 200) {
                    this.setState({
                        studentExamScore: res.body,
                        studentSelScore: res.body.selScore,
                        studentShortAnsScore: res.body.shortScore
                    })
                } else {
                    message.error('获取成绩失败');
                }
            });

    }

    onChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    studentStudentSelScoreChange(value) {
        if (value >= this.state.selectQuestionsScore) {
            message.warning("选择题满分" + this.state.selectQuestionsScore);
            this.setState({
                studentSelScore: this.state.selectQuestionsScore
            })
        } else {
            this.setState({
                studentSelScore: value
            });
        }
    }

    _submitScore(e) {
        const _this = this;
        const score = this.state.studentShortAnsScore + this.state.studentSelScore;
        console.log(this.state.studentExamScore.selScore);
        console.log(this.state.studentShortAnsScore);
        confirm({
            title: '提示信息：',
            content: '确定给该 ' + this.state.studentName + ' 简答题：' + this.state.studentShortAnsScore + '分？',
            onOk() {
                request
                    .put("/api/score")
                    .send({
                        examId: _this.examId,
                        userId: _this.userId,
                        selScore: _this.state.studentSelScore,
                        shortScore: _this.state.studentShortAnsScore,
                        score: score
                    })
                    .end((err, res) => {
                        if (res.statusCode === 200) {
                            message.success('更新成功');
                            hashHistory.push('/reviewExam');
                        } else {
                            message.error('操作失败');
                        }
                    });

            },
            onCancel() {
            },
        });
    }

    render() {
        return (<div>


            <Layout>
                <Content style={{padding: '0 50px'}}>

                    <Layout style={{padding: '24px 0', background: '#fff'}}>

                        <Content style={{padding: '0 24px', minHeight: 800}}>
                            <Button onClick={() => {
                                history.go(-1)
                            } }><Icon type="left"/>返回
                            </Button>
                            <Alert message="人工评阅" type="success"/>
                            姓名：<Tag color="blue">{this.state.studentName}</Tag>&nbsp;
                            选择题分数：<InputNumber min={0} max={this.state.shortAnswerQuestionsScore} defaultValue={0}
                                               value={this.state.studentSelScore} onChange={this.studentStudentSelScoreChange.bind(this)}/>
                            <Tag color="green">{this.state.studentSelScore}</Tag>
                            简答题分数：{this.state.studentShortAnsScore}
                            &nbsp;
                            <Button type="primary" onClick={this._submitScore.bind(this)}>提交</Button>
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
                                                studentSelAnswers={this.state.studentSelAnswers}
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
                                        studentShortAnswer={this.state.studentShortAnswer}
                                        saveAnswers={this._saveShortAnswers.bind(this)}
                                    />
                                </div>)}
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    EU-exam
                </Footer>
            </Layout>
        </div>);
    }

    _onSubmit() {
        let studentAnswers = this.studentSelAnswers.concat(this.studentShortAnswer);
        request
            .post('/api/answer')
            .send({
                username: this.state.userName,
                userId: this.state.userId,
                examId: this.examId,
                examName: this.state.examName,
                studentSelAnswers: this.studentSelAnswers,
                studentShortAnswer: this.studentShortAnswer,
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
    }

}


class SelectQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.saveAnswers = this.props.saveAnswers;
        this.studentSelAnswers = this.props.studentSelAnswers;
        this.questionId = this.props.questionId;
        this.state = {
            studentAnswer: '',
            value: 1
        }
    }

    getAnswer(questionId, studentSelAnswers) {
        const answer = studentSelAnswers.find(answer => answer.questionId === questionId);
        this.setState({
            value: answer.answer
        })
    }

    componentWillMount() {
        this.getAnswer(this.questionId, this.studentSelAnswers);
    }


    render() {
        const {questionId, questionContent, questionOptions, num, questionType} = this.props;
        return (<div>
            <h4>第{num}题：</h4>{questionContent}
            <br/>
            <div style={{padding: "10px"}}>
                <RadioGroup value={this.state.value} onChange={this.onChange.bind(this)}>
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
        message.warning("您不能更改试卷内容");
    }
}

class ShortAnswerQuestionQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.saveAnswers = this.props.saveAnswers;
        this.questionId = this.props.questionId;
        this.studentShortAnswer = this.props.studentShortAnswer;
        super(props);
        this.state = {
            studentAnswer: '',
        }
    }


    getAnswer(questionId, studentShortAnswer) {
        const answer = studentShortAnswer.find(answer => answer.questionId === questionId);
        this.setState({
            studentAnswer: answer.answer
        })
    }

    componentWillMount() {
        this.getAnswer(this.questionId, this.studentShortAnswer);
    }

    render() {
        const {questionId, questionContent, num, questionType, studentShortAnswer} = this.props;
        return (<div>
            <div>
                第{num}题：{questionContent}
                <br/>
                <Input type="textarea" autosize={{minRows: 4, maxRows: 10}}
                       value={this.state.studentAnswer} onChange={this._textAreaChange.bind(this)}/>
            </div>
        </div>);
    }

    _textAreaChange(e) {
        message.warning("您不能更改试卷内容");
    }
}
