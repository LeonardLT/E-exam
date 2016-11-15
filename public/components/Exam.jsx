import React from 'react';
import request from 'superagent';


export default class Exam extends React.Component {

    constructor(props) {
        super(props);
        this.studentAnswers = [];
        this.state = {
            exam: {},
            problems: [],
        };
    }

    componentWillMount() {
        request.get('/api/problem')
            .end((err, data) => {
                this.setState({
                    exam: data.body,
                    problems: data.body.problems,
                });
            });
    }

    render() {
        const exam = this.state.exam;
        const problems = this.state.problems;
        return (
            <div className="container">
                {exam._id}
                <div>考试ID：{exam.examId}</div>
                <div>考试名称：{exam.examName}</div>
                <div>考试时间：{exam.time}</div>
                <hr/>

                <div>
                    <form onSubmit={this._onSubmit.bind(this)}>
                        <div>{problems.map(p =><div>
                            <Problem problemId={p.problemId}
                                     problem={p.problem}
                                     answer={p.answer}
                                     studentAnswer={p.studentAnswer}
                                     saveAnswers={this._saveAnswers.bind(this)}
                            />
                        </div>)}</div>

                        <input className="btn btn-primary" type="submit" value="交卷"/>
                    </form>
                </div>

            </div>
        );
    }

    _saveAnswers(problemId, answer) {

        const isExistInArray = (problemId, array) => {
            for (let item of array) {
                if (item.problemId == problemId) {
                    return item;
                }
            }
            return null;
        };

        let item = isExistInArray(problemId, this.studentAnswers);
        if (item === null) {
            this.studentAnswers.push({
                problemId: problemId,
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
        request.post('/api/answer')
            .send(
                {
                    'examId': this.state.exam.examId,
                    'studentAnswers': this.studentAnswers
                }
            )
            .end();
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
        let {problemId, problem, answer} = this.props;
        return (<div>
                <div>
                    <div>题目ID:{problemId}</div>
                    <h4>题目：{problem}</h4>
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
        this.saveAnswers(this.props.problemId, event.target.value);
    }


}

