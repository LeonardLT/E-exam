import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import moment from 'moment';

export default class BlankQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: '',
            realName: '',
            questionType: 1,
            blankType: '',
            questionId: '',
            question: '',
            rightAnswer: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            // rightAnswer:{},
            rightAnswerA: '',
            rightAnswerB: '',
            rightAnswerC: '',
            rightAnswerD: '',
            rightAnswers: [],
            answerAnalysis: '',
            questionLevel: 0
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
                const {userAccount, realName} = res.body;
                this.setState({userAccount, realName});

            });
    }
    render() {
        return (<div>
            BlankQuestion

        </div>);
    }

}