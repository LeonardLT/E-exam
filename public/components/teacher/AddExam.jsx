import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import {DatePicker, message, Button, Modal, Table,Popconfirm} from 'antd';
import moment from 'moment';
const {MonthPicker, RangePicker, InputNumber} = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm';
const monthFormat = 'YYYY-MM-DD HH:mm';
const confirm = Modal.confirm;


class AddExam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            examName: '',
            examDescription: '',
            examScore: 0,
            examType: '',
            paperType: 0,
            joinNum: 0,
            beginTime: '',
            endTime: '',
            examTime: '',
            publishDate: '',
            branch: '',
            major: '',
            classroom: '',
            selectedQuestions: [],

            time: 'unknown',
            questions: [],
            type: 'all',
            //currentQuestionId: '',
            currentQuestionType: '',
            currentQuestion: '',
            currentQuestion_Id: '',
            currentQuestionRightAnswers: [],
            currentQuestionOptions: [],
            currentQuestionRightAnswer: '',
            questionType: '0',
            createUserName:'',
            userId:'',
            showScoreDate:'',
            paperVisible:false,
            paperList:[],
            examPaper:{},
            examPaperId:''
        };
    }

    onChange(date, dateString) {
        console.log(date, dateString);
    }
    paperhandleCancel(e) {
        this.setState({paperVisible: false});
    }
    paperhandleOk(e) {
        this.setState({paperVisible: false});
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
                this.setState({createUserName: realName, userId: _id});

            });
    }
    // _examTimeChange(value){
    //     console.log('changed', value);
    // }
    render() {
        const columns = [{
            title: '试卷名称',
            dataIndex: 'examPaperName',
            key: 'examPaperName',
            width: "50%"
        }, {
            title: '创建人',
            dataIndex: 'createUserName',
            key: 'createUserName',
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
            render:text =><span>{moment(text).format('YYYY-MM-DD')}</span>
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (<span>
                <span className="ant-divider"/>
                <a onClick={this._showPaperDetail(record._id)}>查看</a>
                <span className="ant-divider"/>
                <a onClick={this._addToExam(record)}>添加到考试</a>
                <span className="ant-divider"/>
            </span>),
        }];
        return (<div className="container-fluid">
            <h3>新增考试</h3>
            <hr/>
            <form className="form-horizontal" role="form" onSubmit={this._onSubmit.bind(this)}>
                <div className='col-md-6 col-md-offset-3'>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试名称</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examName"
                                   onChange={this._onExamNameChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试介绍</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examDescription"
                                   onChange={this._examDescriptionChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试总分</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examScore"
                                   onChange={this._examScoreChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试类型</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examType"
                                   onChange={this._examTypeChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">答卷模式</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="paperType"
                                   onChange={this._paperTypeChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">参考次数</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="joinNum"
                                   onChange={this._joinNumChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">开始时间-结束时间:</label>
                        <div className="col-sm-8">
                            <RangePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={this._beginEndTimeChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">答卷时长</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examTime"
                                   onChange={this._examTimeChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" >成绩发布时间</label>
                        <div className="col-sm-9">
                            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={this._showScoreDateChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">分院</label>
                        <div className="col-sm-10">
                            {/*<input className="form-control" type="text" name="branch"*/}
                            {/*onChange={this._onBranchChange.bind(this)}/>*/}
                            <select className="form-control" onChange={this._onBranchChange.bind(this)}>
                                <option value="全部">全部</option>
                                <option value="信息工程学院">信息工程学院</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">专业</label>
                        <div className="col-sm-10">
                            {/*<input className="form-control" type="text" name="major"*/}
                            {/*onChange={this._onMajorChange.bind(this)}/>*/}
                            <select className="form-control" onChange={this._onMajorChange.bind(this)}>
                                <option value="全部">全部</option>
                                <option value="软件工程">软件工程</option>
                                <option value="通信工程">通信工程</option>
                                <option value="电子信息工程">电子信息工程</option>
                                <option value="网络工程">网络工程</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">班级</label>
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
                                title={selectedQuestion.question}>{selectedQuestion.questionContent}
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
                                    <label>选项 : </label><br/>{this.state.currentQuestionOptions.map((questionOption, i) => <div>
                                    {questionOption.option}:{questionOption.optionContent}
                                </div>)}

                                    <label>正确答案 : </label><br/>
                                    {this.state.currentQuestionRightAnswers.map((rightAnswer, i) => <div>
                                        {++i}:{rightAnswer.answerContent}
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
                                <option value='2'>填空题</option>
                                <option value='1'>选择题</option>
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal"
                                    ref="showQuestions"
                                    data-target="#details" onClick={this._onShowQuestionClick(this.state.questionType)}>预览题库
                            </button>
                        </div>
                    </div>
                    <hr/>
                    <Button onClick={this._showPaperModel.bind(this)}>预览题库</Button>
                    <div className="form-group">
                        <div>选择题分值:{this.state.examPaper.selectQuestionsScore}</div>
                        <div>填空题分值：{this.state.examPaper.shortAnswerQuestionsScore}</div>
                        <div>试卷总分：{this.state.examPaper.scoreCount}</div>
                    </div>
                    {/*<input className="btn btn-lg btn-block btn-primary" type="submit" value="保存"/>*/}
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
                                    {/*<th>题目ID</th>*/}
                                    <th>题目类型</th>
                                    <th>题目内容</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.questions.map(question => <tr>
                                    {/*<td>{question._id}</td>*/}
                                    <td>{question.questionType}</td>
                                    <td>{question.questionContent}</td>
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


            <Modal title="Basic Modal" visible={this.state.paperVisible} width="80%"
                   onOk={this.paperhandleOk.bind(this)} onCancel={this.paperhandleCancel.bind(this)}>
                <div>
                    <div>
                        <Table rowKey={this.state.paperList._id} columns={columns} dataSource={this.state.paperList}
                               pagination={{defaultCurrent: 1, pageSize: 5}}/>
                    </div>
                </div>
            </Modal>

        </div>);
    }
    _showPaperModel(){
        request
            .get('/api/papers')
            .query({userId: this.state.userId})
            .end((err, res) => {
                this.setState({
                    paperList: res.body
                });
                console.log(res.body);
            this.setState({paperVisible:true});
            });
    }

    _onSubmit(event) {
        event.preventDefault();
        request
            .post("/api/exams")
            .send({
                // examId: this.state.examId,
                examName: this.state.examName,
                examDescription: this.state.examDescription,
                examScore: this.state.examScore,
                examType: this.state.examType,
                createDate: moment().format('YYYY-MM-DD HH:mm'),
                createUserName: this.state.createUserName,
                userId: this.state.userId,
                paperType: this.state.paperType,
                joinNum: this.state.joinNum,
                beginTime: this.state.beginTime,
                endTime: this.state.endTime,
                examTime: this.state.examTime,
                // publishDate: this.state.publishDate,
                publishDate: moment().format('YYYY-MM-DD HH:mm'),
                // examState: this.state.examState,
                examState: 1,
                showScoreDate: this.state.showScoreDate,
                branch: this.state.branch,
                major: this.state.major,
                classroom: this.state.classroom,
                // selectQuestions: this.state.selectedQuestions,
                examPaper:this.state.examPaper,
                examPaperId:this.state.examPaperId
            })
            .end((err, res) => {
                if (res.statusCode === 201) {
                    // alert("save success");
                    message.success("新增成功", 2, () => {
                        hashHistory.push('/examList');
                    });
                } else {
                    // alert('保存失败');
                    message.error(res.text);

                }
            });
    }

    _examDescriptionChange(e) {
        this.setState({examDescription: e.target.value});
    }

    _examScoreChange(e) {
        this.setState({examScore: e.target.value});
    }

    _examTypeChange(e) {
        this.setState({examType: e.target.value});
    }

    _paperTypeChange(e) {
        this.setState({paperType: e.target.value});
    }

    _joinNumChange(e) {
        this.setState({joinNum: e.target.value});
    }

    _beginEndTimeChange(date, dateString) {
        this.setState({beginTime: dateString[0]});
        this.setState({endTime: dateString[1]});
    }

    _examTimeChange(e) {
        this.setState({examTime: e.target.value});
    }

    _publishDateChange(date, dateString) {
        console.log(dateString);
        this.setState({publishDate: dateString});
    }
    _showScoreDateChange(date, dateString){
        console.log(dateString);
        this.setState({showScoreDate: dateString});
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
                currentQuestion: question.questionContent,
                currentQuestionType: question.questionType,
                // currentQuestionId: question.questionId,
                currentQuestionRightAnswers: question.rightAnswers,
                currentQuestionOptions: question.questionOptions,
                currentQuestionRightAnswer: rightAnswer,
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
        // this.setState({
        //     type: event.target.value
        // });
        this.setState({
            questionType: event.target.value
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
                    console.log(res.body);
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
    _showPaperDetail(paperId){
        return ()=> {
            hashHistory.push("/examPaper/"+paperId);
        };
    }
    _addToExam(paper){
        return ()=> {
            console.log(paper);
            this.setState({
                examPaper:paper,
                examPaperId:paper._id,
                paperVisible:false
            });
        };
    }
}

export default AddExam;