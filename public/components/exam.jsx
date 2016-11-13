import React from 'react';
import request from 'superagent';


export default class Exam extends React.Component {

    constructor(props) {
        super(props);
        this.s = [];
        this.state = {
            exam: {},
            problems: [],
            studentAnswer: '',
            tmp: {},
            s: []
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
        var sAnswer = [];
        return (
            <div>
                <div>考试名称：{exam.examName}</div>
                <div>考试时间：{exam.time}</div>
                <hr/>


                <div>
                    <form onSubmit={this._onSubmit.bind(this)}>
                        <div>{problems.map(p =><div>
                            <Problem problem={p.problem} answer={p.answer}
                                     studentAnswer={p.studentAnswer}
                                     id={p.id}
                                     sAnswers={sAnswer}
                                     setSta={this._setSta.bind(this)}
                                     changeS={this._changeS.bind(this)}
                            />
                            {/*<div>题目：{p.problem}</div>*/}
                            {/*<input type="text" className="form-control"*/}
                            {/*value={this.state.studentAnswer}*/}
                            {/*onChange={this._onAnswerChange.bind(this)}*/}
                            {/*onBlur={this._changeSAn(p.studentAnswer).bind(this)}*/}
                            {/*/>*/}
                            {/*<div>答案：{p.answer}</div>*/}
                            {/*<div>学生答案： {p.studentAnswer}</div>*/}
                            {/*<hr/>*/}
                            {typeof p.id}
                        </div>)}</div>

                        <input className="btn btn-primary" type="submit" value="交卷"/>
                    </form>
                </div>

            </div>
        );
    }

    _changeS(id, answer) {
        console.log(id + ',' + answer);
        console.log(typeof id);
        console.log(typeof this.s);

        var isExist = (id, array) => {

            for (let item of array) {
                if (item.id == id) {
                    return item;
                }
            }
            return null;
        };

        console.log(isExist(id,this.s));
        let item = isExist(id,this.s);
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

    _setSta(obj) {
        this.setState(obj);
    }

    // _onAnswerChange(event) {
    //     this.setState({
    //         studentAnswer: event.target.value
    //     });
    // }
    //
    // _changeSAn(event, studentAnswer) {
    //     return () => {
    //
    //         studentAnswer = '';
    //         console.log(studentAnswer);
    //         console.log(event.target.value);
    //     }
    // }


    _onSubmit(event) {
        event.preventDefault();
        console.log(this.s);
    }
}

class Problem extends React.Component {

    constructor(props) {
        super(props);
        // this.sAnswers = this.props.sAnswers;
        this.sAnswers = [1];
        this.studentAnswer = this.props.studentAnswer;
        this.setSta = this.props.setSta;
        this.changeS = this.props.changeS;
        console.log(props);
        this.state = {
            t: '',
            an: []
        };
    }

    render() {
        let {id, problem, studentAnswer, answer} = this.props;
        return (<div>
                <div>题目：{problem}</div>
                <div>ID:{id}</div>
                <div>答案： <input className="form-control" type="text"
                                value={this.state.t}
                                onChange={this._onChange.bind(this)}
                                onBlur={this._onBlur.bind(this)}
                />
                    {this.state.t}
                    {studentAnswer}
                </div>
                <div>正确答案：{answer}</div>
                <hr/>
            </div>
        );
    }

    _onChange(event) {
        this.setState({
            t: event.target.value
        });
    }

    _onBlur(event) {
        // console.log(super.props);
        // console.log('----------------');
        // this.sAnswers.push(event.target.value);
        // console.log("+" + this.sAnswers);
        // console.log("---" + this.props.sAnswers);
        // this.studentAnswer = event.target.value;
        // console.log("!!!!" + this.studentAnswer);
        // console.log(this.props.id);


        // this.sAnswers.map(s => {
        //     if (s.id == this.props.id) {
        //         s.answer = event.target.value;
        //     } else {
        //         // console.log(this.props.id + ';;;');
        //         this.sAnswers.push({
        //             id: this.props.id,
        //             answer: event.target.value
        //         });
        //     }
        //     // this.sAnswers.push({'name': 1});
        //     // console.log(s==2);
        // });

        this.changeS(this.props.id, event.target.value);
        // console.log(this.sAnswers);


        this.setSta({
            studentAnswer: this.sAnswers
        });
    }


}

