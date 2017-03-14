import React from 'react';
import {hashHistory} from 'react-router';
import {Link} from 'react-router';
import request from 'superagent';
import moment from 'moment';
import {Button, Icon, Table, Radio, Pagination, Popconfirm, message} from 'antd';

class QuestionBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionBanks: [],
            userId: ''
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
                this.setState({userId: _id});

            });
        request
            .get('/api/question/examQuestions')
            .end((err, res) => {
                var data = res.body.map(({_id, userName, answerAnalysis, questionLevel, questionType, questionContent, questionOptions, createDate, rightAnswers}) => {
                    return {
                        _id,
                        userName,
                        answerAnalysis,
                        questionType: questionType === 1 ? "选择题" : "other",
                        questionLevel,
                        questionContent,
                        questionOptions,
                        createDate: moment(createDate).format('YYYY-MM-DD'),
                        rightAnswers
                    };
                });
                this.setState({
                    questions: data
                });

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
    }


    render() {
        const columns = [{
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
                    <a onClick={this._onDetailsClick(record)}>查看</a>
                    <span className="ant-divider"/>
                    {record.createUserId === this.state.userId ?
                        <span>
                        <Popconfirm title="确定删除？" onConfirm={this.deleteBank(record._id)} onCancel={this.cancel} okText="删除" cancelText="取消">
                            <a href="#">删除</a>
                        </Popconfirm>
                        <span className="ant-divider"/>
                        </span> : ''}

    </span>
            ),
        }];

        return (<div style={{padding: "10px"}}>
            <div>
                <Button onClick={this.goToPage("addQuestionBank")}>
                    <Icon type="plus"/>新增
                </Button>
            </div>
            <div className="row" style={{background: "#f7f7f7", padding: "5px"}}>
                <div className="col-md-10"></div>
                <div className="col-md-2 text-right"> 题库数量：{this.state.questionBanks.length}
                </div>
            </div>
            {this.props.children}
            <div className="col-md-12" id="test" style={{marginTop: "20px"}}>
                <Table rowKey={this.state.questionBanks._id} columns={columns} dataSource={this.state.questionBanks}
                       pagination={{defaultCurrent: 1, pageSize: 10}}/>
            </div>

        </div>);
    }

    goToPage(page) {
        return () => {
            hashHistory.push(page);
        };
    }

    _onDetailsClick(record) {
        return () => {
            hashHistory.push('/questionBank/' + record._id);
        };
    }

    deleteBank(bankId) {
        return () => {
            request
                .delete('/api/questionBank')
                .query({bankId: bankId})
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        message.success('删除成功');
                        this.setState({
                            questionBanks: res.body
                        });
                    }
                });
        }
    }

    cancel(e) {
        // message.error('Click on No');
    }

    onChange(page, current, total) {
    }
}

export default QuestionBank;

