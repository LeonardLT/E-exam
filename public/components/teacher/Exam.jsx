import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import moment from 'moment';
import {Icon,Tag,Collapse,Button} from 'antd';
const Panel = Collapse.Panel;



export default class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.examId = this.props.params.id;
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
            examPaper:{},
            paperId:''
        };
    }

    componentWillMount() {
        request
            .get('/api/exams/examId')
            .query({examId: this.examId})
            .end((err, res) => {
                const {
                    examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
                    joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate,examPaper
                }= res.body;
                console.log(res.body);
                this.setState({
                    examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
                    joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate,examPaper,
                    selectQuestions:examPaper.selectQuestions,paperId:examPaper.paperId,shortAnswerQuestions:examPaper.shortAnswerQuestions
                });
            });
    }

     callback(key) {
        console.log(key);
    }
    render() {
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
        return (<div>
            <div className="row" style={{padding:"15px"}}>
                <div className="col-md-5"><h4>考试名称: <small>{this.state.examName}</small>&nbsp;<Tag color={this.state.examState==1?"green":"red"}>{this.state.examState==1?"可用":"不可用"}</Tag></h4></div>
                <div className="col-md-3"><h4><Icon type="user" />创建人: <small>{this.state.createUserName}</small></h4></div>
                <div className="col-md-2"><h4>总分: <small>{this.state.examScore}</small></h4></div>
                <div className="col-md-2"><h4>考试类型: <small>{this.state.examType}</small></h4></div>

                <div className="col-md-12"><h4>创建时间: <small>{moment(this.state.createDate).format('YYYY-MM-DD HH:mm')}</small></h4></div>

                <div className="col-md-6"><h4>开始时间 - 结束时间: <small>{moment(moment().format('YYYY-MM-DD HH:mm'),).format('YYYY-MM-DD HH:mm')} - {moment(this.state.endTime).format('YYYY-MM-DD HH:mm')}</small></h4></div>
                <div className="col-md-6"><h4>答卷时长: <small>{this.state.examTime}</small></h4></div>

                <div className="col-md-3"><h4>所属分院: <small>{this.state.branch}</small></h4></div>
                <div className="col-md-3"><h4>所属专业: <small>{this.state.major}</small></h4></div>
                <div className="col-md-2"><h4>所属班级: <small>{this.state.classroom}</small></h4></div>

                <div className="col-md-6"><h4>答卷模式: <small>{this.state.paperType}</small></h4></div>
                <div className="col-md-6"><h4>参考次数: <small>{this.state.joinNum}</small></h4></div>
                <div className="col-md-6"><h4>考试发布时间: <small>{moment(this.state.publishDate).format('YYYY-MM-DD HH:mm')}</small></h4></div>
                <div className="col-md-6"><h4>成绩发布时间: <small>{moment(moment().format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm')}</small></h4></div>
                <div className="col-md-12"><h4>简介: <small>{this.state.examDescription}</small></h4></div>
            </div>
            <div>
            </div>

            <div>
                <h4>选择题</h4>{this.state.selectQuestions.map((selectedQuestion,i)=><div>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header={"题目"+(++i)+":"+selectedQuestion.questionContent} key={++i}>
                        <p>
                            {selectedQuestion.questionOptions.map((questionOption) => <span style={{marginRight: "30px"}}>
                    <label>{this._questionOptionText(questionOption.option)}：</label>{questionOption.optionContent}
                        </span>)}
                        </p>
                    </Panel>
                </Collapse>
            </div>)}
            </div>

            <div>
                <h4>简答题</h4>{this.state.shortAnswerQuestions.map((shortAnswerQuestion,i)=><div>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header={"题目"+(++i)+":"+shortAnswerQuestion.questionContent} key={++i}>
                    </Panel>
                </Collapse>
            </div>)}
            </div>

            <div>
                <Button onClick={this._previewPaper.bind(this)}>预览试卷</Button>
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
    _previewPaper(){
        const paperId = this.state.paperId
        hashHistory.push('/previewPaper/'+this.examId);
    }
}