import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'


export default class Exam extends React.Component {

    constructor(props) {
        super(props);
        this.studentAnswers = [];
        this._id = this.props.params._id;
        this.state = {
            username:'unknown',
            exam: {},
            questions: [],
        };
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/login');
                }
                const {username} = res.body;
                this.setState({username: username});
            });
        console.log("～～～" + this.props.params._id);
        request.get('/api/problem')
            .query({_id: this.props.params._id})
            .end((err, data) => {
                this.setState({
                    exam: data.body,
                    questions: data.body.questions,
                });
            });
    }

    render() {
        const exam = this.state.exam;
        const questions = this.state.questions;
        return (
            <div className="container">
                {exam._id}
                <div>考试ID：{exam.examId}</div>
                <div>考试名称：{exam.examName}</div>
                <div>考试时间：{exam.time}</div>
                <hr/>

                <div>
                    <form onSubmit={this._onSubmit.bind(this)}>
                        <div>{questions.map(question => <div>
                            <Problem questionId={question.questionId}
                                     question={question.question}
                                     answer={question.answer}
                                     saveAnswers={this._saveAnswers.bind(this)}
                            />
                        </div>)}</div>

                        <input className="btn btn-primary" type="submit" value="交卷"/>
                    </form>
                </div>

            </div>
        );
    }

    _saveAnswers(questionId, answer) {

        const isExistInArray = (questionId, array) => {
            for (let item of array) {
                if (item.questionId == questionId) {
                    return item;
                }
            }
            return null;
        };

        let item = isExistInArray(questionId, this.studentAnswers);
        if (item === null) {
            this.studentAnswers.push({
                questionId: questionId,
                answer: answer
            });
        } else {
            item.answer = answer;
        }
        console.log(this.studentAnswers);
    }


    _onSubmit(event) {
        event.preventDefault();
        console.log(this.studentAnswers);
        console.log(this.state.username+"======");
        request.post('/api/answer')
            .send(
                {
                    'username':this.state.username,
                    '_id': this.state.exam._id,
                    'studentAnswers': this.studentAnswers
                }
            )
            .end((err, res) => {
                const score = res.body.score;
                alert('你的成绩：' + score);
                hashHistory.push('/');
            });
    }
}

class Problem extends React.Component {

    constructor(props) {
        super(props);
        this.saveAnswers = this.props.saveAnswers;
        this.state = {
            studentAnswer: '',
        };
    }

    render() {
        let {questionId, question, answer} = this.props;
        return (<div>
                <div>
                    <div>题目ID:{questionId}</div>
                    <h4>题目：{question}</h4>
                </div>
                <div>答案： <input className="form-control" type="text"
                                value={this.state.studentAnswer}
                                onChange={this._onChange.bind(this)}
                                onBlur={this._onBlur.bind(this)}
                />
                    <div>{this.state.studentAnswer}</div>
                </div>
                <div>正确答案：{answer}</div>
                <hr/>
            </div>
        );
    }

    _onChange(event) {
        this.setState({
            studentAnswer: event.target.value
        });
    }

    _onBlur(event) {
        this.saveAnswers(this.props.questionId, event.target.value);
    }


}

