import React from 'react';
import request from 'superagent';


export default class Exam extends React.Component {

    constructor(props) {
        super(props);
        this.s = [];
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
            <div>
                <div>考试名称：{exam.examName}</div>
                <div>考试时间：{exam.time}</div>
                <hr/>

                <div>
                    <form onSubmit={this._onSubmit.bind(this)}>
                        <div>{problems.map(p =><div>
                            <Problem id={p.id}
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

    _saveAnswers(id, answer) {

        const isExistInArray = (id, array) => {
            for (let item of array) {
                if (item.id == id) {
                    return item;
                }
            }
            return null;
        };

        let item = isExistInArray(id, this.s);
        if (item === null) {
            this.s.push({
                id: id,
                answer: answer
            });
        } else {
            item.answer = answer;
        }
        console.log(this.s);
    }


    _onSubmit(event) {
        event.preventDefault();
        console.log(this.s);
        request.post('/api/answer')
            .send(this.s)
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
        let {id, problem, answer} = this.props;
        return (<div>
                <div>
                    <div>ID:{id}</div>
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
        this.saveAnswers(this.props.id, event.target.value);
    }


}

