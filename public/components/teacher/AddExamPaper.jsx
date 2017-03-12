import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import moment from 'moment';
import {Table, Collapse, Popconfirm, Button, Tag, Icon, message, Menu, Dropdown, Modal, Input, Row, Col, InputNumber} from 'antd';
const confirm = Modal.confirm;
const Panel = Collapse.Panel;


export default class AddExamPaper extends React.Component {
    constructor(props) {
        super(props);
        this.paperId = this.props.params.id;
        this.state = {
            examPaperName: '',//试卷名称
            createDate: '',//创建时间
            createUserName: '',//创建人姓名
            userId: '',//创建人Id
            selectQuestionsScore: 100,//选择题分值
            shortAnswerQuestionsScore: 100,//简答题分值
            scoreCount: 200,//总分
            selectQuestions: [],//选择题
            shortAnswerQuestions: [],//填空题
            visible: false,
            questionModelVisible: false,
            questionBanks: [],
            paperSelectQuestions: [],
            paperShortAnswerQuestions: [],
            paperData: {}
        };
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
        request
            .get('/api/questionBank')
            .end((err, res) => {
                var data = res.body.map(({_id, questionBankName, createDate, createUserName, createUserId, bankType}) => {
                    return {_id, questionBankName, createDate: moment(createDate).format('YYYY-MM-DD HH:mm'), createUserName, createUserId, bankType};
                });
                this.setState({
                    questionBanks: data
                });
            });
        if (this.paperId !== undefined && this.paperId !== null) {
            console.log(this.paperId);
            request
                .get('/api/papers/paperId')
                .query({paperId: this.paperId})
                .end((err, res) => {
                    console.log(res.body);
                    const {
                        examPaperName, createDate, createUserName, createUserId, selectQuestionsScore,
                        shortAnswerQuestionsScore, scoreCount, selectQuestions, shortAnswerQuestions
                    } = res.body;
                    this.setState({
                        examPaperName, createDate, createUserName, createUserId, selectQuestionsScore,
                        shortAnswerQuestionsScore, scoreCount, paperSelectQuestions: selectQuestions, paperShortAnswerQuestions: shortAnswerQuestions
                    });
                });
        }
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }

    handleOk(e) {
        this.setState({visible: false});
    }

    qmhandleOk(e) {
        this.setState({questionModelVisible: false});
    }

    handleCancel(e) {
        console.log(e);
        this.setState({visible: false});
    }

    qmhandleCancel(e) {
        console.log(e);
        this.setState({questionModelVisible: false});
    }

    render() {

        const questionBankColumns = [{
            title: '题库名称',
            dataIndex: 'questionBankName',
            key: 'questionType',
            width: '30%'
        }, {
            title: '创建人',
            dataIndex: 'createUserName',
            key: 'questionContent',
            width: '20%'
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
            width: '20%'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>

      <span className="ant-divider"/>
      <a onClick={this._showSelectQuestionList(record).bind(this)}>查看</a>
    </span>
            ),
        }];
        const selectQuestionColumns = [{
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
      <a onClick={this._addToPaper(record)}>添加到试卷</a>
                    {/*<span className="ant-divider"/>*/}
                    {/*<a href="#">修改</a>*/}
                    <span className="ant-divider"/>


    </span>
            ),
        }];

        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this._showQuestionBankList.bind(this)}>选择题</a>
                </Menu.Item>
                <Menu.Item>
                    <a>简答题</a>
                </Menu.Item>
                <Menu.Item>
                    <a>填空题</a>
                </Menu.Item>
            </Menu>
        );
        return (<div style={{padding: "10px"}}>
            <h3>{this.paperId === undefined ? "新增试卷" : "试卷详情"}</h3>
            <div className="pull-right">
                <Button onClick={() => {
                    history.go(-1)
                } }><Icon type="left"/>返回</Button>
            </div>
            <hr/>
            <Row>
                <Col span={12}>
                    <Col span={4}><label> 试卷名称：</label></Col>{this.state.examPaperName}
                    <Col span={10}>
                        <Input placeholder="试卷名称" value={this.state.examPaperName}
                               onChange={this._examPaperChange.bind(this)}/>
                    </Col>
                </Col>
                <Col span={6}/><Col span={6}/>
            </Row>

            <Row>
                <Col span={12}>
                    <Col span={4}><label> 选择题分值：</label></Col>{this.state.selectQuestionsScore}
                    <Col span={10}>
                        <InputNumber min={0} defaultValue={100} onChange={this._selectQuestionsScoreChange.bind(this)}/>

                    </Col>
                </Col>
                <Col span={6}/><Col span={6}/>
            </Row>
            <Row>
                <Col span={12}>
                    <Col span={4}><label> 简答题分值：</label></Col>{this.state.shortAnswerQuestionsScore}
                    <Col span={10}>
                        <InputNumber min={0} defaultValue={100} onChange={this._shortAnswerQuestionsScoreChange.bind(this)}/>
                    </Col>
                </Col>
                <Col span={6}/><Col span={6}/>
            </Row>
            <Row>
                <Col span={12}>
                    <Col span={4}><label> 总分：</label></Col>{this.state.scoreCount}
                </Col>
                <Col span={6}/><Col span={6}/>
            </Row>
            <Row>
                <Col span={20}>
                </Col>
                <Col span={4}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>添加题目</Button>
                    </Dropdown>
                    <Button onClick={this._showQuestionBankList.bind(this)}>预览题库</Button>

                </Col>
            </Row>
            <Row>
                <Button type="primary" onClick={this._addPaper.bind(this)}>{this.paperId !== undefined ? "保存" : "新增"}</Button>
                {/*&nbsp;<Button onClick={this._previewPaper.bind(this)}>预览试卷</Button>*/}
            </Row>

            <Modal title="Basic Modal" visible={this.state.visible} width="80%"
                   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                <div>
                    <Table rowKey={this.state.questionBanks._id} columns={questionBankColumns} dataSource={this.state.questionBanks}
                           pagination={{defaultCurrent: 1, pageSize: 5}}/>
                </div>
            </Modal>

            <Modal title="Basic Modal" visible={this.state.questionModelVisible} width="80%"
                   onOk={this.qmhandleOk.bind(this)} onCancel={this.qmhandleCancel.bind(this)}>
                <div>
                    <Table rowKey={this.state.selectQuestions._id} columns={selectQuestionColumns} dataSource={this.state.selectQuestions}
                           pagination={{defaultCurrent: 1, pageSize: 5}}/>
                </div>
            </Modal>

            <div>
                <h4>选择题：</h4>{this.state.paperSelectQuestions.map((selectedQuestion, i) => <div>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header={"题目" + (++i) + ":" + selectedQuestion.questionContent} key={++i}>
                        <p>
                            {selectedQuestion.questionOptions.map((questionOption) => <span style={{marginRight: "30px"}}>
                    <label>{this._questionOptionText(questionOption.option)}：</label>{questionOption.optionContent}
                        </span>)}
                            <Button type="danger" onClick={this._deleteSelQuestion(selectedQuestion)}>删除</Button>
                        </p>
                    </Panel>
                </Collapse>
            </div>)}
            </div>

            <div>
                <h4>简答题：</h4>{this.state.paperShortAnswerQuestions.map((shortAnswerQuestion, i) => <div>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header={"题目" + (++i) + ":" + shortAnswerQuestion.questionContent} key={++i}>
                        <Button type="danger" onClick={this._deleteShortQuestion(shortAnswerQuestion)}>删除</Button>
                    </Panel>
                </Collapse>
            </div>)}
            </div>

        </div>);
    }

    _examPaperChange(e) {
        this.setState({examPaperName: e.target.value});
    }

    _selectQuestionsScoreChange(value) {
        this.setState({
            selectQuestionsScore: value,
            scoreCount: (value + this.state.shortAnswerQuestionsScore)
        });
    }

    _shortAnswerQuestionsScoreChange(value) {
        this.setState({shortAnswerQuestionsScore: value, scoreCount: (this.state.selectQuestionsScore + value)});
    }

    _addPaper(e) {
        if (this.paperId !== undefined) {
            console.log("-------");
            request
                .put('/api/papers')
                .send({
                    paperId: this.paperId,
                    examPaperName: this.state.examPaperName,
                    createUserName: this.state.createUserName,
                    createUserId: this.state.userId,
                    selectQuestionsScore: this.state.selectQuestionsScore,
                    shortAnswerQuestionsScore: this.state.shortAnswerQuestionsScore,
                    scoreCount: this.state.scoreCount,
                    selectQuestions: this.state.paperSelectQuestions,
                    shortAnswerQuestions: this.state.paperShortAnswerQuestions,
                })
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        message.success("更新成功");
                        hashHistory.push("/examPaperList");
                    } else {
                        message.error("操作失败");
                    }
                });
        } else {
            console.log(this.state.shortAnswerQuestions);
            request
                .post("/api/papers")
                .send({
                    examPaperName: this.state.examPaperName,
                    createUserName: this.state.createUserName,
                    createUserId: this.state.userId,
                    selectQuestionsScore: this.state.selectQuestionsScore,
                    shortAnswerQuestionsScore: this.state.shortAnswerQuestionsScore,
                    scoreCount: this.state.scoreCount,
                    selectQuestions: this.state.paperSelectQuestions,
                    shortAnswerQuestions: this.state.paperShortAnswerQuestions,
                })
                .end((err, res) => {
                    if (res.statusCode === 201) {
                        message.success("新增成功");
                        hashHistory.push("/examPaperList");
                    } else {
                        message.error("失败");
                    }
                });
        }
    }

    _showQuestionBankList() {
        this.setState({visible: true});
    }

    _showSelectQuestionList(data) {
        return () => {
            console.log(data._id);
            const bankId = data._id;
            request.get('/api/question/bankQuestions')
                .query({bankId: bankId})
                .end((err, res) => {
                    var data = this._formatDate(res.body);
                    this.setState({
                        selectQuestions: data
                    });
                    // this.setState({visible: false});
                    this.setState({questionModelVisible: true});
                });

        };
    }

    _formatDate(data) {
        return data.map(({_id, userName, answerAnalysis, questionLevel, questionType, questionContent, questionOptions, createDate, rightAnswers}) => {
            return {
                _id,
                userName,
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

    _addToPaper(question) {
        return () => {
            console.log(question);
            if (question.questionType === '选择题') {
                let questions = this.state.paperSelectQuestions;
                question.questionType = 1;
                questions.push(question);
                this.setState({
                    paperSelectQuestions: questions
                });
            } else if (question.questionType === '简答题') {
                console.log("-----");
                let questions = this.state.paperShortAnswerQuestions;
                question.questionType = 3;
                questions.push(question);
                this.setState({
                    paperShortAnswerQuestions: questions
                });
                console.log("========");
                console.log(this.state.paperShortAnswerQuestions);
                console.log("========");
            }
        };
    }

    callback(key) {
        console.log(key);
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

    _deleteSelQuestion(question) {
        return () => {
            console.log(question);
            var questions = this.removeByValue(this.state.paperSelectQuestions, question)
            this.setState({
                paperSelectQuestions: questions
            });
            message.success("success");
        };
    }

    _deleteShortQuestion(question) {
        return () => {
            console.log(question);
            var questions = this.removeByValue(this.state.paperShortAnswerQuestions, question)
            this.setState({
                paperShortAnswerQuestions: questions
            });
            message.success("success");
        };
    }

    removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                return arr;
            }
        }
    }
}