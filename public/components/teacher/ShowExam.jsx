import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'


class ShowExam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examLists: [],
            username: 'unknown',
            branch: 'unknown',
            major: 'unknown',
            classroom: 'unknown',
            currentExam_id: 'unknown',
            currentExamName: 'unknown',
            currentExamTime: 'unknown',
            currentExamBranch: 'unknown',
            currentExamMajor: 'unknown',
            currentExamClassroom: 'unknown',
            currentQuestions: []
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
                const {username, branch, major, classroom} = res.body;
                this.setState({username, branch, major, classroom});
                request.get("/api/exams/allExam")
                    .query({branch, major, classroom})
                    .end((err, res) => {
                        this.setState({
                            examLists: res.body
                        });
                    });
            });
    }

    render() {
        return (<div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <h3>我发布的考试</h3>
                    <hr/>
                    <table className="table">
                        <thead>
                        <tr>
                            {/*<th>考试Id</th>*/}
                            <th>考试名称</th>
                            <th>时间</th>
                            <th>分院</th>
                            <th>专业</th>
                            <th>班级</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.examLists.map(exam => <tr>
                                {/*<td>{exam._id}</td>*/}
                                <td>{exam.examName}</td>
                                <td>{exam.time}</td>
                                <td>{exam.branch}</td>
                                <td>{exam.major}</td>
                                <td>{exam.classroom}</td>
                                <td><input className="btn btn-success btn-sm" type="button" value="查看详情"
                                           data-toggle="modal" data-target=".showExamDetail"
                                           onClick={this._showDetail(exam)}/>
                                    {/*<input className="btn btn-primary btn-sm" type="button" value="修改"*/}
                                    {/*data-toggle="modal" data-target=".updateExamDetail" ref="updateDetailBtn"*/}
                                    {/*onClick={this._updateExam.bind(this)}/>*/}
                                    <input value="删除" type="button" className="btn btn-danger btn-sm"
                                           onClick={this._deleteExam(exam._id)}/>
                                </td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="modal fade showExamDetail" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span className="sr-only"
                                                                       ref="detailCloseBtn">Close</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <p>考试ID：{this.state.currentExam_id}</p>
                            <p>考试名称：{this.state.currentExamName}</p>
                            <p>考试时间：{this.state.currentExamTime}</p>
                            <p>分院：{this.state.currentExamBranch}</p>
                            <p>专业：{this.state.currentExamMajor}</p>
                            <p>班级：{this.state.currentExamClassroom}</p>
                            <p>问题数量：{this.state.currentQuestions.length}</p>
                            <hr/>
                            <p>题目：{this.state.currentQuestions.map(question => <div>
                                问题类型：{question.questionType}<br/>
                                问题内容：{question.question}<br/>
                                问题答案：{question.rightAnswers[0].rightAnswer}<br/>
                                <hr/>
                            </div>)}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this._closeDetail.bind(this)}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary"
                                    data-toggle="modal" data-target=".updateExamDetail">修改
                            </button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade updateExamDetail" tabIndex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span>
                                <span className="sr-only" ref="updateDetailBtn">Close</span></button>
                            <h4 className="modal-title">考试详情</h4>
                        </div>
                        <div className="modal-body">
                            <p>考试ID：{this.state.currentExam_id}</p>
                            <p>考试名称：<input className="form-control" type="text" value={this.state.currentExamName}
                                           onChange={this._onExamNameChange.bind(this)}/></p>
                            <p>考试时间：<input className="form-control" type="text" value={this.state.currentExamTime}
                                           onChange={this._onExamTimeChange.bind(this)}/></p>
                            <p>分院：
                                {/*<input className="form-control" type="text" value={this.state.currentExamBranch}*/}
                                {/*onChange={this._onExamBranchChange.bind(this)}/>*/}
                                <select className="form-control" onChange={this._onExamBranchChange.bind(this)}
                                        value={this.state.currentExamBranch}>
                                    <option value="全部">全部</option>
                                    <option value="信息工程学院">信息工程学院</option>
                                </select>
                            </p>
                            <p>专业：
                                {/*<input className="form-control" type="text" value={this.state.currentExamMajor}*/}
                                {/*onChange={this._onExamMajorChange.bind(this)}/>*/}
                                <select className="form-control" onChange={this._onExamMajorChange.bind(this)}
                                        value={this.state.currentExamMajor}>
                                    <option value="全部">全部</option>
                                    <option value="软件工程">软件工程</option>
                                    <option value="通信工程">通信工程</option>
                                    <option value="电子信息工程">电子信息工程</option>
                                    <option value="网络工程">网络工程</option>
                                </select>
                            </p>
                            <p>班级：<input className="form-control" type="text" value={this.state.currentExamClassroom}
                                         onChange={this._onExamClassroomChange.bind(this)}/>
                            </p>
                            <p>问题数量：{this.state.currentQuestions.length}</p>
                            <hr/>
                            <p>题目：{this.state.currentQuestions.map(question => <div>
                                问题类型：{question.questionType}<br/>
                                问题内容：{question.question}<br/>
                                问题答案：{question.rightAnswers[0].rightAnswer}<br/>
                                <input type="button" value="移除" className="btn btn-danger"
                                       onClick={this._onRemoveQuestion(question._id)}/>
                                <hr/>
                            </div>)}</p>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" onClick={this._closeDetail.bind(this)}
                                   ref="btnClose" value="关闭"/>

                            <button type="button" className="btn btn-primary" onClick={this._updateExam.bind(this)}>
                                保存修改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

    _deleteExam(exam_id) {
        return () => {
            alert("delete success");
            request.delete("/api/exams")
                .query({_id: exam_id})
                .end((err, res) => {
                    this.setState({
                        examLists: res.body
                    });
                });
        };
    }

    _onRemoveQuestion(id) {
        return () => {
            var arr = [];
            this.state.currentQuestions.forEach((question) => {
                if (question._id != id) {
                    arr.push(question)
                }
            });
            this.setState({
                currentQuestions: arr
            });
        }
    }

    _closeDetail(event) {
        this.refs.updateDetailBtn.click();
        this.refs.detailCloseBtn.click();

    }

    _onExamNameChange(event) {
        this.setState({
            currentExamName: event.target.value
        });
    }

    _onExamTimeChange(event) {
        this.setState({
            currentExamTime: event.target.value
        });
    }

    _onExamBranchChange(event) {
        this.setState({
            currentExamBranch: event.target.value
        });
    }

    _onExamMajorChange(event) {
        this.setState({
            currentExamMajor: event.target.value
        });
    }

    _onExamClassroomChange(event) {
        this.setState({
            currentExamClassroom: event.target.value
        });
    }

    _showDetail(exam) {
        return () => {
            this.setState({
                currentExam_id: exam._id,
                currentExamName: exam.examName,
                currentExamTime: exam.time,
                currentExamBranch: exam.branch,
                currentExamMajor: exam.major,
                currentExamClassroom: exam.classroom,
                currentQuestions: exam.questions
            });
        };
    }


    _updateExam(event) {
        this.refs.btnClose.click();
        request.post("/api/exams/updateExam")
            .send({
                exam_Id: this.state.currentExam_id,
                examName: this.state.currentExamName,
                time: this.state.currentExamTime,
                branch: this.state.currentExamBranch,
                major: this.state.currentExamMajor,
                classroom: this.state.currentExamClassroom,
                questions: this.state.currentQuestions
            })
            .end((err, res) => {
                this.setState({
                    examLists: res.body
                });
            });
    }

}

export default ShowExam;

