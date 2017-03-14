import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import moment from 'moment';
import {Icon, Tag, Collapse, Button, InputNumber, DatePicker, message, Modal, Table, Popconfirm} from 'antd';
const confirm = Modal.confirm;
const Panel = Collapse.Panel;


export default class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.examId = this.props.params.id;
        this.state = {
            user_id: '',//登录user
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
            paperId: '',
            paperVisible: false,
            paperList: []
        };
    }

    componentWillMount() {

        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/');
                }
                const {_id} = res.body;
                this.setState({user_id: _id});
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
                    examName, examDescription, examScore: examPaper.scoreCount, examType, createDate, createUserName, userId, paperType,
                    joinNum, beginTime, endTime, examTime, publishDate, examState, branch, major, classroom, showScoreDate, examPaper: examPaper,
                    selectQuestions: examPaper.selectQuestions, paperId: examPaper.paperId, shortAnswerQuestions: examPaper.shortAnswerQuestions
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

    callback(key) {
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
        return (<div>
            <div className="row" style={{padding: "15px"}}>
                <div className="col-md-5">
                    <h4>考试名称:&nbsp;
                        <small>{this.state.examName}</small>

                        &nbsp;<Tag color={(this.state.examState == 1 ? "green" : (this.state.examState == 0 ? 'blue' : 'red'))}>
                            {this.state.examState == 1 ? "正常" : (this.state.examState == 0 ? '暂存' : '已结束')}</Tag>
                    </h4>
                </div>
                <div className="col-md-3">
                    <h4><Icon type="user"/>创建人:&nbsp;
                        <small>{this.state.createUserName}</small>
                    </h4>
                </div>
                <div className="col-md-2">
                    <h4>总分:&nbsp;
                        <small>{this.state.examScore}</small>
                        &nbsp;分
                    </h4>
                </div>
                <div className="col-md-2">
                    {/*<h4>考试类型:&nbsp;*/}
                    {/*<small>{this.state.examType}</small>*/}
                    {/*</h4>*/}
                </div>

                <div className="col-md-12">
                    <h4>创建时间:&nbsp;
                        <small>{moment(this.state.createDate).format('YYYY-MM-DD HH:mm')}</small>
                    </h4>
                </div>

                <div className="col-md-6">
                    <h4>开始时间 - 结束时间:&nbsp;
                        <small>{moment(moment().format('YYYY-MM-DD HH:mm'),).format('YYYY-MM-DD HH:mm')}
                            - {moment(this.state.endTime).format('YYYY-MM-DD HH:mm')}</small>
                    </h4>
                </div>
                <div className="col-md-6">
                    <h4>答卷时长:&nbsp;
                        <small>{this.state.examTime}</small>
                        &nbsp;分钟
                    </h4>
                </div>

                <div className="col-md-3">
                    <h4>所属分院:&nbsp;
                        <small>{this.state.branch}</small>
                    </h4>
                </div>
                <div className="col-md-3">
                    <h4>所属专业:&nbsp;
                        <small>{this.state.major}</small>
                    </h4>
                </div>
                <div className="col-md-2">
                    <h4>所属班级:&nbsp;
                        <small>{this.state.classroom}</small>
                        &nbsp;班
                    </h4>
                </div>

                <div className="col-md-6">
                    <h4>
                        {/*答卷模式:&nbsp;*/}
                        {/*<small>{this.state.paperType}</small>*/}
                    </h4>
                </div>
                <div className="col-md-6">
                    <h4>参考次数:&nbsp;
                        <small>{this.state.joinNum}</small>
                        &nbsp;次
                    </h4>
                </div>
                <div className="col-md-6">
                    <h4>考试发布时间:&nbsp;
                        <small>{moment(this.state.publishDate).format('YYYY-MM-DD HH:mm')}</small>
                    </h4>
                </div>
                <div className="col-md-6">
                    <h4>成绩发布时间:&nbsp;
                        <small>{moment(moment().format('YYYY-MM-DD HH:mm')).format('YYYY-MM-DD HH:mm')}</small>
                    </h4>
                </div>
                <div className="col-md-12">
                    <h4>简介:&nbsp;
                        <small>{this.state.examDescription}</small>
                    </h4>
                </div>
            </div>
            <div>
            </div>
            <div className="">
                {this.state.user_id === this.state.userId ?
                    <Button type="green" onClick={this._editExam(this.examId)}>修改考试信息</Button>
                    : ''
                }
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-8">
                    {this.state.user_id === this.state.userId ?
                        <span>
                            <Button onClick={this._showPaperModel.bind(this)}>预览试卷库</Button> &nbsp;
                            {this.state.examPaper.paperId !== undefined ? <Button type="danger" onClick={this._cancelAdd.bind(this)}>删除</Button> : ''}
                        </span>
                        : ''
                    }
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <div>选择题分值:{this.state.examPaper.selectQuestionsScore}</div>
                        <div>填空题分值：{this.state.examPaper.shortAnswerQuestionsScore}</div>
                        <div>试卷总分：{this.state.examPaper.scoreCount}</div>
                    </div>
                </div>
            </div>

            <div>
                <h4>选择题</h4>{this.state.selectQuestions.map((selectedQuestion, i) => <div>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header={"题目" + (++i)} key={++i}>
                        <p>{selectedQuestion.questionContent}</p>
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
                <h4>简答题</h4>{this.state.shortAnswerQuestions.map((shortAnswerQuestion, i) => <div>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header={"题目" + (++i) } key={++i}>
                        <p>{shortAnswerQuestion.questionContent}</p>
                    </Panel>
                </Collapse>
            </div>)}
            </div>


            <div>
                {this.state.examPaper.paperId !== undefined ? <Button type="primary" onClick={this._previewPaper.bind(this)}>预览试卷</Button>
                    : ''}


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

    paperhandleCancel(e) {
        this.setState({paperVisible: false});
    }

    paperhandleOk(e) {
        this.setState({paperVisible: false});
    }

    _cancelAdd() {
        this.setState({
            examPaper: {},
            paperId: '',
            paperVisible: false,
            selectQuestions: [],
            shortAnswerQuestions: [],
            examScore: 0
        });
        request
            .put('/api/exams')
            .send({
                examId: this.examId,
                examName: this.state.examName,
                examDescription: this.state.examDescription,
                examScore: 0,
                examType: this.state.examType,
                createDate: this.state.createDate,
                createUserName: this.state.createUserName,
                userId: this.state.userId,
                paperType: this.state.paperType,
                joinNum: this.state.joinNum,
                beginTime: this.state.beginTime,
                endTime: this.state.endTime,
                examTime: this.state.examTime,
                publishDate: this.state.publishDate,
                examState: this.state.examState,
                branch: this.state.branch,
                major: this.state.major,
                classroom: this.state.classroom,
                showScoreDate: this.state.showScoreDate,
                examPaper: '',
                paperId: ''
            }).end((err, res) => {
            if (res.statusCode === 200) {
                message.success('更新成功');
            } else {
                message.warning("操作失败");
            }
        });
    }
    _editExam(examId) {
        return () => {
            return hashHistory.push('/editExam/' + examId);
        }
    }

    _addToExam(paper) {
        return () => {
            this.setState({
                examPaper: paper,
                paperId: paper._id,
                paperVisible: false,
                selectQuestions: paper.selectQuestions,
                shortAnswerQuestions: paper.shortAnswerQuestions,
                examScore: paper.scoreCount
            });
            request
                .put('/api/exams')
                .send({
                    examId: this.examId,
                    examName: this.state.examName,
                    examDescription: this.state.examDescription,
                    examScore: paper.scoreCount,
                    examType: this.state.examType,
                    createDate: this.state.createDate,
                    createUserName: this.state.createUserName,
                    userId: this.state.userId,
                    paperType: this.state.paperType,
                    joinNum: this.state.joinNum,
                    beginTime: this.state.beginTime,
                    endTime: this.state.endTime,
                    examTime: this.state.examTime,
                    publishDate: this.state.publishDate,
                    examState: this.state.examState,
                    branch: this.state.branch,
                    major: this.state.major,
                    classroom: this.state.classroom,
                    showScoreDate: this.state.showScoreDate,
                    examPaper: paper,
                    paperId: this.state.paperId
                }).end((err, res) => {
                if (res.statusCode === 200) {
                    message.success('更新成功');
                    this.setState({
                        examPaper: res.body.examPaper,
                    });
                } else {
                    message.warning("操作失败");
                }
            });
        };
    }

    _showPaperDetail(paperId) {
        return () => {
            hashHistory.push("/examPaper/" + paperId);
        };
    }

    _showPaperModel() {
        request
            .get('/api/papers')
            .query({userId: this.state.userId})
            .end((err, res) => {
                this.setState({
                    paperList: res.body
                });
                console.log(res.body);
                this.setState({paperVisible: true});
            });
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

    _previewPaper() {
        const paperId = this.state.paperId
        hashHistory.push('/previewPaper/' + this.examId);
    }
}