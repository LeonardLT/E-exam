import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import moment from 'moment';
import {Link} from 'react-router';
import {Table, Popconfirm, Button, Icon, message, Modal} from 'antd';
const confirm = Modal.confirm;

export default class ExamPaperList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paperList: [],
            createUserName: '',
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
                this.setState({createUserName: realName, userId: _id});
                request
                    .get('/api/papers')
                    .query({userId: this.state.userId})
                    .end((err, res) => {
                        this.setState({
                            paperList: res.body
                        });
                        console.log(res.body);
                    });
            });

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
            render:text =><span>{moment(text).format('YYYY-MM-DD')}</span>
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (<span>
                <span className="ant-divider"/>
                <a onClick={this._showPaperDetail(record._id)}>查看</a>
                <span className="ant-divider"/>
                <Popconfirm title="确定删除？" onConfirm={this._deletePaper(record._id)}
                            onCancel={this.cancel} okText="删除" cancelText="取消">
                    <a href="#">删除</a>
                </Popconfirm>
                <span className="ant-divider"/>
            </span>),
        }];
        return (<div style={{padding: "10px"}}>
            <Button onClick={this._addExamPaper.bind(this)}>
                <Icon type="plus"/>新增
            </Button>
            <div>
                <Table rowKey={this.state.paperList._id} columns={columns} dataSource={this.state.paperList}
                       pagination={{defaultCurrent: 1, pageSize: 5}}/>
            </div>
        </div>);
    }

    _addExamPaper() {
        hashHistory.push("/examPaper");
    }
    _showPaperDetail(paperId){
        return ()=> {
            hashHistory.push("/examPaper/"+paperId);
        };
    }
    _deletePaper(paperId){
        return ()=> {
            message.success("删除成功");
        };
    }
}