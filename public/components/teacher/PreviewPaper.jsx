import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import {Button, Icon} from 'antd';
import moment from 'moment';


export default class PreviewPaper extends React.Component {
    constructor(props) {
        super(props);
        this.examId = this.props.params.examId;
        this.state = {
            examName: '',
            examDescription: '',
            examScore: '',
            examType: '',
            createDate: '',
            createUserName: '',
            userId: '',
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
            paperId: ''
        };
    }

    componentWillMount() {
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

    render() {
        return (<div style={{padding: "10px"}}>
            <Button onClick={() => {
                history.go(-1)
            } }><Icon type="left"/>返回</Button>
            预览试卷
            <hr/>
            <div>
                <h4>{this.state.examName}&nbsp;
                    <small>
                        {moment(this.state.beginTime).format('YYYY-MM-DD HH:mm')} ~ {moment(this.state.endTime).format('YYYY-MM-DD HH:mm')}
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
            <h4>选择题 <small>({this.state.examPaper.selectQuestionsScore}分)</small></h4>
            <div>
                {this.state.selectQuestions.map((question, i) => <div>
                    题目{++i}：{question.questionContent}<br/>
                    <div style={{marginLeft: "20px"}}>
                        {question.questionOptions.map((questionOption) => <span style={{marginRight: "50px"}}>
                    <label>{this._questionOptionText(questionOption.option)}：</label>{questionOption.optionContent}
                        </span>)}
                    </div>
                </div>)}
            </div>
            <h4>简答题 <small>({this.state.examPaper.shortAnswerQuestionsScore}分)</small></h4>
            <div>
                {this.state.shortAnswerQuestions.map((question,i)=><div>
                    {question.questionContent}
                </div>)}
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
}