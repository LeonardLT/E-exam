import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import moment from 'moment';
import {Link} from 'react-router';
import {message} from 'antd';
import {Menu, Dropdown, Button, Icon} from 'antd';


export default class QuestionBank extends React.Component {
    constructor(props) {
        super(props);
        this.bankId = this.props.params.qbid;
        this.state = {
            createUserName: '',
            questionBankName: '',
            user_id: Object,
            bankType: 1,
            questions: [],
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
        request.get('/api/questionBank/bankId')
            .query({bankId: this.bankId})
            .end((err, res) => {
                const {questionBankName} = res.body;
                this.setState({
                    questionBankName: questionBankName
                });
            });

        request.get('/api/question/bankQuestions')
            .query({bankId: this.bankId})
            .end((err, res) => {
                var data = res.body.map(({_id, userName, answerAnalysis, questionLevel, questionType, questionContent, questionOptions, createDate, rightAnswers}) => {
                    return {
                        _id,
                        userName,
                        answerAnalysis,
                        questionType: questionType,
                        questionLevel,
                        questionContent,
                        questionOptions,
                        createDate: moment(createDate).format('YYYY-MM-DD HH:mm'),
                        rightAnswers
                    };
                });
                this.setState({
                    // questions: res.body
                    questions: data
                });
            });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.addSelectQuestion()}>选择题</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this._addQuestion("3")}>简答题</a>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/blankQuestion">填空题</Link>
                </Menu.Item>
            </Menu>
        );
        return (<div>
            <div className="row">
                <div className="col-md-9" style={{marginTop: "10px", height: "58px"}}>
                    <div className="col-md-2" style={{width: "15%", paddingRight: "0px"}}>
                        <h4>
                            题库名称：
                        </h4>
                    </div>
                    <div className="col-md-4" id="bankName" style={{paddingLeft: "0", marginTop: "-2px"}}>
                        <h4>
                            {this.state.questionBankName}
                            <span style={{marginLeft: "10px"}} className="glyphicon glyphicon-edit "
                                  onClick={this._editBankName.bind(this)}/>
                        </h4>
                    </div>
                    <div className="col-md-8" id="updateBankNameArea" style={{display: "none"}}>
                        <input type="text" className="form-control" id="questionBankName" placeholder="题库名称"
                               onChange={this._questionBankNameChange.bind(this)} value={this.state.questionBankName}/>
                        <button className="btn-primary btn" type="button" onClick={this._updateBank()}>保存</button>
                    </div>
                    <span>
                        </span>
                </div>
                <div className="col-md-3" style={{marginTop: "17px"}}>
                    <Button type="primary" style={{display:"none"}} id="goBack" onClick={this._goBack.bind(this)}>
                        <Icon type="left"/>返回
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>新增题目</Button>
                    </Dropdown>

                </div>
            </div>

            <div className="col-md-10" id="test" style={{marginTop: "20px"}}>
            </div>

            <div>{this.props.children}</div>


        </div>);
    }
    _goBack(){
        hashHistory.push("/questionBank/"+this.bankId);
        $("#goBack").hide();
    }

    _editBankName(event) {
        $('#bankName').hide();
        $('#updateBankNameArea').show();
    }

    _questionBankNameChange(event) {
        this.setState({
            questionBankName: event.target.value
        });
    }

    _updateBank() {
        return () => {
            request
                .put('/api/questionBank')
                .send({
                    bankId: this.bankId,
                    questionBankName: this.state.questionBankName,
                    createDate: moment().format('YYYY-MM-DD HH:mm'),
                    createUserName: this.state.createUserName,
                    createUserId: this.state.user_id,
                    bankType: this.state.bankType
                })
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        message.success('更新成功');
                        $('#bankName').show();
                        $('#updateBankNameArea').hide();
                    } else {
                        message.error('更新失败');
                    }
                });
        };
    }


    onChange(page, current, total) {
        console.log("page" + page);
        console.log("current" + current);
        console.log("total" + total);
    }

    addSelectQuestion() {
        return () => {
            $("#goBack").show();
            hashHistory.push('/selectQuestion/' + this.bankId);
        };
    }

    _addQuestion(questionType){
        return () => {
            $("#goBack").show();
            if(questionType==3){
                hashHistory.push('/shortAnswerQuestion/' + this.bankId);
            }
        };
    }
}