import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import {Table, Popconfirm, Button, Icon, message, Modal} from 'antd';
import moment from 'moment';
const confirm = Modal.confirm;

export default class ExamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examLists: [],
            username: '',
            branch: '',
            major: '',
            classroom: '',
            currentExam_id: '',
            currentExamName: '',
            currentExamTime: '',
            currentExamBranch: '',
            currentExamMajor: '',
            currentExamClassroom: '',
            currentQuestions: [],
            visible: false
        };
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }

    handleOk(e) {
        this.setState({
            visible: false,
        });
    }

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/');
                }
                const {username, branch, major, classroom} = res.body;
                this.setState({username, branch, major, classroom});
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

    showConfirm(examId, _this) {
        return () => {
            confirm({
                title: '提示信息：',
                content: '确定要删除？',
                onOk() {
                    // console.log(examId);
                    //
                    return new Promise((resolve, reject) => {
                        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                        _this._deleteExam(examId);
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {
                },
            });
        }
    }

    render() {
        const columns = [{
            title: '考试名称',
            dataIndex: 'examName',
            key: 'examName',
            width: '40%'
        }, {
            title: '发布时间',
            dataIndex: 'publishDate',
            key: 'publishDate',
            width: '10%'
        }, {
            title: '分院',
            dataIndex: 'branch',
            key: 'branch',
            width: '10%'
        }, {
            title: '专业',
            dataIndex: 'major',
            key: 'major',
            width: '10%'
        }, {
            title: '班级',
            dataIndex: 'classroom',
            key: 'classroom',
            width: '10%'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>

      <span className="ant-divider"/>
      <a onClick={this.goToPage("exam", record._id)}>查看</a>
      <span className="ant-divider"/>
                    {/*<Popconfirm title="确定删除？" onConfirm={this._deleteExam(record._id)} onCancel={this.cancel} okText="删除" cancelText="取消">*/}
                    {/*<a href="#">删除</a>*/}
                    {/*</Popconfirm>*/}
                    <a onClick={this.showConfirm(record._id, this)}>删除</a>
      <span className="ant-divider"/>

    </span>
            ),
        }];
        return (<div style={{padding: "10px"}}>
            <div>
                <Modal title="Basic Modal" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
            <div>
                <Button onClick={this.addExam("/addExam")}>
                    <Icon type="plus"/>新增
                </Button>
            </div>
            <div>
                <Table rowKey={this.state.examLists._id} columns={columns} dataSource={this.state.examLists}
                       pagination={{defaultCurrent: 1, pageSize: 10}}/>
            </div>
        </div>);
    }

    _formatDate(data) {
        return data.map(({_id, examName, publishDate, branch, major, classroom}) => {
            return {_id, examName, publishDate: moment(publishDate).format('YYYY-MM-DD'), branch, major, classroom};
        });
    }

    goToPage(page, examId) {
        return () => {
            hashHistory.push(page + "/" + examId);
        };
    }

    addExam(page) {
        return () => {
            hashHistory.push(page);
        };
    }


    _deleteExam(exam_id) {
        // return () => {
        request.delete("/api/exams")
            .query({_id: exam_id})
            .end((err, res) => {
                if (res.statusCode === 200) {
                    message.success("删除成功", 1, () => {
                        const data = this._formatDate(res.body);
                        this.setState({
                            examLists: data
                        });
                    });
                } else {
                    message.error("失败");
                }
            });

    };

    // }
}