import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionType: 'blankQuestion',
            questionId: 'unknown',
            question: 'unknown',
            rightAnswer: 'unknown',
            rightAnswers: []
        }

    }

    render() {
        return (<div>
                add QS!

                <form onSubmit={this._onSubmit.bind(this)}>
                    <label>questionType:{this.state.questionType}</label><br/>
                    <label>questionId:</label>
                    <input className="form-control" type="text" name="questionId"
                           onChange={this._onQuestionIdChange.bind(this)}/>
                    {this.state.questionId}
                    <label>question:</label>
                    <input className="form-control" type="text" name="question"
                           onChange={this._onQuestionChange.bind(this)}/>
                    {this.state.question}
                    <label>rightAnswers:</label>
                    <input className="form-control" type="text" name="rightAnswers"
                           onChange={this._onRightAnswerChange.bind(this)}/>
                    {this.state.rightAnswer}
                    <input className="btn btn-lg btn-block btn-primary" type="submit" value="保存"/>
                </form>
            </div>
        );

    }

    _onSubmit(event) {
        event.preventDefault();
        request.post('/api/question')
            .send({
                questionId: this.state.questionId,
                question: this.state.question,
                rightAnswer: this.state.rightAnswer,
                questionType: this.state.questionType
            })
            .end((err, res) => {
                if (res.statusCode === 201) {
                    alert("success");
                    hashHistory.push('/questionBankPage');
                }
            });

    }

    _onQuestionIdChange(event) {
        this.setState({
            questionId: event.target.value
        });
    }

    _onQuestionChange(event) {
        this.setState({
            question: event.target.value
        });
    }

    _onRightAnswerChange(event) {
        this.setState({
            rightAnswer: event.target.value
        });
    }
}

export default AddQuestion;
