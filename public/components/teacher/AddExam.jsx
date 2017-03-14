import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import {InputNumber, DatePicker, message, Button, Modal, Table, Popconfirm, Tag, Tooltip,Radio} from 'antd';
import moment from 'moment';
const {MonthPicker, RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm';
const monthFormat = 'YYYY-MM-DD HH:mm';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const text = <span>点击切换状态</span>;

class AddExam extends React.Component {
    constructor(props) {
        super(props);
        this.examId = this.props.params.examId;
        this.state = {
            examId: '',
            examName: '',
            examDescription: '',
            examScore: 0,
            examState: '',
            examType: '',
            paperType: 0,
            joinNum: 1,
            beginTime: moment(),
            endTime: moment(),
            examTime: 60,
            publishDate: moment(),
            branch: '',
            major: '',
            classroom: '',
            selectedQuestions: [],

            time: 'unknown',
            questions: [],
            type: 'all',
            currentQuestionType: '',
            currentQuestion: '',
            currentQuestion_Id: '',
            currentQuestionRightAnswers: [],
            currentQuestionOptions: [],
            currentQuestionRightAnswer: '',
            questionType: '0',
            createUserName: '',
            userId: '',
            showScoreDate: moment(),
            paperVisible: false,
            paperList: [],
            examPaper: {},
            examPaperId: '',
            loading: false,
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

    _changeExamState(e) {
        if (this.state.examState !== 1) {
            this.setState({
                examState: 1
            });
        } else {
            this.setState({
                examState: 0
            });
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
                this.setState({createUserName: realName, userId: _id});
            });

        if (this.examId !== undefined && this.examId !== null) {
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
                        joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper
                    });
                    const timeIsAfter = moment(this.state.endTime).isAfter(new Date());
                    if (examState == 0) {
                        this.setState({
                            examState: 0//暂存状态
                        });
                    }
                    else if (timeIsAfter) {
                        this.setState({
                            examState: 1
                        });
                    } else {
                        this.setState({
                            examState: -1
                        });
                    }

                });
        }
    }

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
            render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>
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
            <form id="examForm" className="form-horizontal" role="form" onSubmit={this._onSubmit.bind(this)}>
                <div className='col-md-6 col-md-offset-3'>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试状态</label>
                        <div className="col-sm-10">
                            <Tooltip placement="right" title={text}>
                                &nbsp;<Tag onClick={this._changeExamState.bind(this)}
                                           color={(this.state.examState == 1 ? "green" : (this.state.examState == 0 ? 'blue' : 'red'))}>
                                {this.state.examState == 1 ? "正常" : (this.state.examState == 0 ? '暂存' : '已结束')}</Tag>
                            </Tooltip>

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试名称</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examName"
                                   value={this.state.examName}
                                   onChange={this._onExamNameChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试介绍</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="examDescription"
                                   value={this.state.examDescription}
                                   onChange={this._examDescriptionChange.bind(this)}/>
                        </div>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*<label className="col-sm-2 control-label">考试总分</label>*/}
                    {/*<div className="col-sm-10">*/}
                    {/*<input className="form-control" type="text" name="examScore"*/}
                    {/*value={this.state.examScore}*/}
                    {/*onChange={this._examScoreChange.bind(this)}/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <label className="col-sm-2 control-label">考试类型</label>
                        <div className="col-sm-10">
                            <RadioGroup onChange={this._examTypeChange.bind(this)} value={this.state.examType}>
                                <Radio value={1}>在线测试</Radio>
                                <Radio value={2}>在线练习</Radio>
                            </RadioGroup>
                            {/*<input className="form-control" type="text" name="examType"*/}
                                   {/*onChange={}/>*/}
                        </div>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*<label className="col-sm-2 control-label">答卷模式</label>*/}
                    {/*<div className="col-sm-10">*/}
                    {/*<input className="form-control" type="text" name="paperType"*/}
                    {/*onChange={this._paperTypeChange.bind(this)}/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <label className="col-sm-2 control-label">参考次数</label>
                        <div className="col-sm-3">
                            <InputNumber min={1} max={10} defaultValue={1} name="joinNum"
                                         value={this.state.joinNum}
                                         onChange={this._joinNumChange.bind(this)}/>
                            次
                        </div>

                        <label className="col-sm-2 control-label">答卷时长</label>
                        <div className="col-sm-4">
                            <InputNumber min={1} defaultValue={60} name="examTime"
                                         value={this.state.examTime}
                                         onChange={this._examTimeChange.bind(this)}/>
                            分钟
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">开始时间-结束时间:</label>
                        <div className="col-sm-8">
                            <RangePicker defaultValue={[this.state.beginTime, this.state.endTime]} format={dateFormat}

                                         onChange={this._beginEndTimeChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">成绩发布时间</label>
                        <div className="col-sm-9">
                            <DatePicker format={dateFormat}
                                        defaultValue={this.state.showScoreDate}
                                        onChange={this._showScoreDateChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">分院</label>
                        <div className="col-sm-10">
                            <select className="form-control" value={this.state.branch}
                                    onChange={this._onBranchChange.bind(this)}>
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
                            <select className="form-control" value={this.state.major}
                                    onChange={this._onMajorChange.bind(this)}>
                                <option value="全部">全部</option>
                                <option value="软件工程">软件工程</option>
                                <option value="通信工程">通信工程</option>
                                <option value="电子信息工程">电子信息工程</option>
                                <option value="网络工程">网络工程</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">{this.state.classroom}班级</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="classroom"
                                   value={this.state.classroom}
                                   onChange={this._onClassroomChange.bind(this)}/>
                        </div>
                    </div>

                    <hr/>
                    <div className="row">
                        <div className="col-md-8">
                            <Button onClick={this._showPaperModel.bind(this)}>预览题库</Button>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <div>选择题分值:{this.state.examPaper.selectQuestionsScore}</div>
                                <div>填空题分值：{this.state.examPaper.shortAnswerQuestionsScore}</div>
                                <div>试卷总分：{this.state.examPaper.scoreCount}</div>
                            </div>
                        </div>
                    </div>

                    {this.examId !== null && this.examId !== undefined ?
                        <Button style={{width: "100%", fontSize: "17px", height: "50px"}} type="primary" loading={this.state.loading}
                                onClick={this._updateExam.bind(this)}>
                            更新
                        </Button>
                        : <span>
                        <Button style={{width: "45%", fontSize: "17px", height: "50px"}} type="primary" loading={this.state.loading}
                                onClick={this._onSubmit.bind(this)}>
                            新增
                        </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button style={{width: "45%", fontSize: "17px", height: "50px"}}
                                    onClick={this._tmpSave.bind(this)}>
                        暂存
                        </Button>
                        </span>
                    }


                    <br/>
                    <br/>
                </div>
            </form>


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

    _showPaperModel() {
        request
            .get('/api/papers')
            .query({userId: this.state.userId})
            .end((err, res) => {
                this.setState({
                    paperList: res.body
                });
                this.setState({paperVisible: true});
            });
    }

    _updateExam(event) {
        event.preventDefault();
        const {
            examName, examDescription, examScore, examType, createDate, createUserName, userId, paperType,
            joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper
        } = this.state;
        this.setState({loading: true});
        request
            .put("/api/exams")
            .send({
                examId: this.examId,
                examName,
                examDescription,
                examScore,
                examType,
                createDate,
                createUserName,
                userId,
                paperType,
                joinNum,
                beginTime,
                endTime,
                examTime,
                publishDate,
                examState,
                branch,
                major,
                classroom,
                showScoreDate,
                examPaper
            })
            .end((err, res) => {
                if (res.statusCode === 200) {
                    // alert("save success");
                    message.success("更新成功", 2, () => {
                        hashHistory.push('/examList');
                    });
                } else {
                    // alert('保存失败');
                    message.error('操作失败');
                    this.setState({loading: false});
                }
            });
    }

    _tmpSave(event) {
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
                // paperType: this.state.paperType,
                paperType: 1,
                joinNum: this.state.joinNum,
                beginTime: this.state.beginTime,
                endTime: this.state.endTime,
                examTime: this.state.examTime,
                // publishDate: this.state.publishDate,
                publishDate: moment().format('YYYY-MM-DD HH:mm'),
                // examState: this.state.examState,
                examState: 0,
                showScoreDate: this.state.showScoreDate,
                branch: this.state.branch,
                major: this.state.major,
                classroom: this.state.classroom,
                // selectQuestions: this.state.selectedQuestions,
                examPaper: this.state.examPaper,
                examPaperId: this.state.examPaperId
            })
            .end((err, res) => {
                if (res.statusCode === 201) {
                    // alert("save success");
                    message.success("暂存成功", 2, () => {
                        hashHistory.push('/examList');
                    });
                } else {
                    // alert('保存失败');
                    message.error(res.text);
                    this.setState({loading: false});

                }
            });
    }

    _onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true});
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
                // paperType: this.state.paperType,
                paperType: 1,
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
                examPaper: this.state.examPaper,
                examPaperId: this.state.examPaperId
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
                    this.setState({loading: false});

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

    _joinNumChange(value) {
        this.setState({joinNum: value});
    }

    _beginEndTimeChange(date, dateString) {
        this.setState({beginTime: dateString[0]});
        this.setState({endTime: dateString[1]});
    }

    _examTimeChange(value) {
        this.setState({examTime: value});
    }

    _publishDateChange(date, dateString) {
        console.log(dateString);
        this.setState({publishDate: dateString});
    }

    _showScoreDateChange(date, dateString) {
        console.log(dateString);
        this.setState({showScoreDate: dateString});
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

    _showPaperDetail(paperId) {
        return () => {
            hashHistory.push("/examPaper/" + paperId);
        };
    }

    _addToExam(paper) {
        return () => {
            console.log(paper);
            this.setState({
                examPaper: paper,
                examPaperId: paper._id,
                paperVisible: false
            });
        };
    }
}

export default AddExam;