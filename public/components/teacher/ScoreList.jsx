import React from 'react';
import {Button, Icon, Table, Pagination, Popconfirm, message, Modal,Tag} from 'antd';
import {hashHistory} from 'react-router';
import moment from 'moment';
import request from 'superagent';
const confirm = Modal.confirm;

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelVisible: false,
            examLists: [],
            scores: [],
            examName: ''
        }
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
                        const data = res.body.map(({_id,endTime,examType, examName, publishDate, branch, major, classroom}) => {
                            return {_id,endTime,examType, examName, publishDate: moment(publishDate).format('YYYY-MM-DD'), branch, major, classroom};
                        });
                        this.setState({
                            examLists: data
                        });
                        console.log(this.state.examLists);
                    });
            });
    }

    paperhandleCancel(e) {this.setState({modelVisible: false});}
    paperhandleOk(e) {this.setState({modelVisible: false});}

    render() {
        const examColumns = [{
            title: '考试名称',
            dataIndex: 'examName',
            key: 'examName',
            width: '35%'
        },{
            title:'类型',
            dataIndex:'examType',
            key:'examType',
            width: '10%',
            render :text=><Tag color={text===1?'#108ee9':''}>{text===1?'在线测试':'在线练习'}</Tag>
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: '15%',
            render: text => <span>{moment().isAfter(moment(text))?<span><Tag color="red">已结束</Tag>
                    <br/>{moment(text).format("YYYY-MM-DD HH:mm")}</span>:moment(text).format("YYYY-MM-DD HH:mm")}</span>
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
      <a onClick={this._showPaperModel(record).bind(this)}>查看</a>
      <span className="ant-divider"/>


    </span>
            ),
        }];
        const columns = [{
            title: '考试名称',
            dataIndex: 'examName',
            key: 'examName',
        }, {
            title: '学生姓名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '成绩',
            dataIndex: 'score',
            key: 'score',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (<span>
                <span className="ant-divider"/>
                <a>查看</a>
                <span className="ant-divider"/>
            </span>),
        }];
        return (<div style={{padding: "10px"}}>
            <Table rowKey={this.state.examLists._id} columns={examColumns} dataSource={this.state.examLists}
                   pagination={{defaultCurrent: 1, pageSize: 10}}/>


            <Modal title={this.state.examName} visible={this.state.modelVisible} width="80%"
                   onOk={this.paperhandleOk.bind(this)} onCancel={this.paperhandleCancel.bind(this)}>
                <div>

                    <Table rowKey={this.state.scores._id} columns={columns} dataSource={this.state.scores}
                           pagination={{defaultCurrent: 1, pageSize: 10}}/>

                </div>
            </Modal>
        </div>);
    }

    _showPaperModel(exam) {
        return () => {
            request
                .get('/api/score/examScore')
                .query({examId: exam._id})
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        message.success("success");
                        console.log(res.body);
                        this.setState({
                            modelVisible: true,
                            examName: exam.examName,
                            scores: res.body
                        });
                    } else {
                        message.error("操作失败");
                    }
                });
        }
    }
}