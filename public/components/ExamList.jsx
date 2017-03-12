import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
import {Table, Tag, Popconfirm, Button, Icon, message, Modal} from 'antd';
import moment from 'moment';
const confirm = Modal.confirm;


class ExamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examLists: [],
            realName: '',
            branch: '',
            major: '',
            classroom: '',
            userId: ''
        };
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    message.error("请先登录");
                    return hashHistory.push('/login');
                }
                const {_id, realName, branch, major, classroom} = res.body;
                this.setState({userId: _id, realName, branch, major, classroom});
                request.get("/api/exams/myExam")
                    .query({branch, major, classroom})
                    .end((err, res) => {
                        const data = res.body.map(({_id, joinNum, examName, beginTime, endTime}) => {
                            return {
                                _id,
                                examName,
                                joinNum,
                                beginTime: moment(beginTime).format('YYYY-MM-DD HH:mm'),
                                endTime: moment(endTime).format('YYYY-MM-DD HH:mm')
                            };
                        });
                        this.setState({
                            examLists: data
                        });
                    });
            });
    }

    render() {
        const columns = [{
            title: '考试名称',
            dataIndex: 'examName',
            key: 'examName',
            width: '30%'
        }, {
            title: '开始时间',
            dataIndex: 'beginTime',
            key: 'beginTime',
            width: '30%'
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: '30%'
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    {moment().isAfter(record.endTime)
                        ? <Tag color="red">已过期</Tag>
                        : <span>
                            <span className="ant-divider"/>
                            <a onClick={this._joinTheExam(record)}>参加考试</a>
                            <span className="ant-divider"/>
                    </span>}
                </span>
            ),
        }];
        return (<div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <h3>我的考试</h3>
                    <hr/>
                    <Table rowKey={this.state.examLists._id} columns={columns} dataSource={this.state.examLists}
                           pagination={{defaultCurrent: 1, pageSize: 5}}/>
                </div>
            </div>


        </div>);
    }

    _joinTheExam(exam) {
        return () => {
            if (moment().isAfter(exam.endTime)) {
                return message.warning('考试已经过期，不能参加考试');
            }
            const {_id, joinNum} = exam;
            const examId = _id;
            request
                .get('/api/exams/joined')
                .query({examId, userId: this.state.userId})
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        const {joinedTimes} = res.body;
                        if (joinedTimes >= joinNum) {
                            return message.warning('您已经参加过' + joinedTimes + '次该考试，这场考试只允许参加' + joinNum + '次', 2);
                        } else {
                            let num = joinedTimes + 1;
                            message.success('这是您第' + num + '次参加该场考试，祝你好运！', 3);
                            return hashHistory.push('/examPaper/' + examId);
                        }
                    }
                });
        };
    }
}

export default ExamList;

