import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
import {Table, Popconfirm, Button, Icon, message, Modal} from 'antd';
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
            classroom: ''
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
                const {realName, branch, major, classroom} = res.body;
                this.setState({realName, branch, major, classroom});
                request.get("/api/exams/myExam")
                    .query({branch, major, classroom})
                    .end((err, res) => {
                        const data = res.body.map(({_id, examName, beginTime, endTime}) => {
                            return {
                                _id,
                                examName,
                                beginTime: moment(beginTime).format('YYYY-MM-DD HH:mm'),
                                endTime: moment(endTime).format('YYYY-MM-DD HH:mm')
                            };
                        });
                        console.log(res.body);
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
                    <span className="ant-divider"/>
                    <a onClick={this._joinTheExam(record._id)}>参加考试</a>
                    <span className="ant-divider"/>
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

    _joinTheExam(examId) {
        return () => {
            message.success("joinTheExam" + examId);
            return hashHistory.push('/examPaper/' + examId);
        };
    }
}

export default ExamList;

