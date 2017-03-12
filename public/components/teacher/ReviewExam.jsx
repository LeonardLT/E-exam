import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import {Table, Popconfirm, Button, Icon, message, Modal} from 'antd';
import moment from 'moment';
const confirm = Modal.confirm;


export default class ReviewExam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            examLists: [],
            username: '',
            userId: '',
            realName: '',
            branch: '',
            major: '',
            classroom: '',
            modelVisible: false,
            studentList: []
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
                const {realName, _id, username, branch, major, classroom} = res.body;
                this.setState({realName, userId: _id, username, branch, major, classroom});
                request.get("/api/exams/allExam")
                    .end((err, res) => {
                        const data = res.body.map(({_id, examName, publishDate, branch, major, classroom}) => {
                            return {_id, examName, publishDate: moment(publishDate).format('YYYY-MM-DD'), branch, major, classroom};
                        });
                        this.setState({
                            examLists: data
                        });
                    });
            });
    }

    paperhandleCancel(e) {
        this.setState({modelVisible: false});
    }

    paperhandleOk(e) {
        this.setState({modelVisible: false});
    }

    _showPaper(examId, userId) {
        return () => {
            hashHistory.push('/reviewExamPaper/' + examId + "&" + userId);
        };
    }

    render() {
        const studentListColumns = [{
            title: '考试名称',
            dataIndex: 'examName',
            key: 'examName',
            width: '40%'
        }, {
            title: '学生姓名',
            dataIndex: 'userName',
            key: 'userName',
            width: '15%'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span className="ant-divider"/>
                    <a onClick={this._showPaper(record.examId, record.userId)}>查看</a>
                    <span className="ant-divider"/>
                </span>
            ),
        }];
        const columns = [{
            title: '考试名称',
            dataIndex: 'examName',
            key: 'examName',
            width: '40%'
        }, {
            title: '分院',
            dataIndex: 'branch',
            key: 'branch',
            width: '15%'
        }, {
            title: '专业',
            dataIndex: 'major',
            key: 'major',
            width: '15%'
        }, {
            title: '班级',
            dataIndex: 'classroom',
            key: 'classroom',
            width: '15%'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span className="ant-divider"/>
                    <a onClick={this._showPaperModel(record).bind(this)}>查看</a>
                    <span className="ant-divider"/>
                </span>
            ),
        }];
        return (<div style={{padding: "10px"}}>
            <h2>评阅简答题</h2>
            <hr/>
            <Table rowKey={this.state.examLists._id} columns={columns} dataSource={this.state.examLists}
                   pagination={{defaultCurrent: 1, pageSize: 5}}/>


            <Modal title={this.state.examName} visible={this.state.modelVisible} width="80%"
                   onOk={this.paperhandleOk.bind(this)} onCancel={this.paperhandleCancel.bind(this)}>
                <div>

                    <Table rowKey={this.state.studentList._id} columns={studentListColumns} dataSource={this.state.studentList}
                           pagination={{defaultCurrent: 1, pageSize: 5}}/>
                </div>
            </Modal>
        </div>);
    }

    _showPaperModel(exam) {
        return () => {
            request
                .get('/api/studentAnswer/students')
                .query({examId: exam._id})
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        console.log(res.body);
                        this.setState({
                            modelVisible: true,
                            examName: res.body.examName,
                            studentList: res.body
                        });
                    } else {
                        message.error("操作失败");
                    }
                });
        }
    }
}