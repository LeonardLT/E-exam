import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import moment from 'moment';
import {Link} from 'react-router';
import {Button, message} from 'antd';


export default class AddQuestionBank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBankId: String,
            createUserName: '',
            questionBankName: '',
            user_id: Object,
            bankType: 1,
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
                this.setState({createUserName: realName, user_id: _id});

            });
    }

    render() {
        return (<div>
            <div className="row">
                <div className="col-md-2">
                    <h3>题库名称
                        <input type="text" className="form-control" id="questionBankName" placeholder="题库名称"
                               onChange={this._questionBankNameChange.bind(this)} value={this.state.questionBankName}/>
                    </h3>
                </div>
                <div className="col-md-10"></div>
            </div>

            <div>
                <Button type="primary" onClick={this._saveQuestionBank()}>保存</Button>
            </div>

            <div>{this.props.children}</div>


        </div>);
    }

    _questionBankNameChange(event) {
        this.setState({questionBankName: event.target.value});
    }

    _saveQuestionBank() {
        return () => {
            request
                .post('/api/questionBank')
                .send({
                    questionBankName: this.state.questionBankName,
                    createDate: moment().format('YYYY-MM-DD HH:mm'),
                    createUserName: this.state.createUserName,
                    createUserId: this.state.user_id,
                    bankType: this.state.bankType
                })
                .end((err, res) => {
                    const stateCode = res.statusCode;
                    if (stateCode === 201) {
                        message.success("新增成功");
                        this.setState({
                            questionBankId: res.body.questionBankId
                        });
                        return hashHistory.push("/questionBank/" + res.body.questionBankId);
                    }
                    else if (stateCode === 400) {
                        return message.error("操作失败");
                    }
                });
        };
    }

}