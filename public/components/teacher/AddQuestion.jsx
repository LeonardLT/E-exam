import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import SelectQuestion from './SelectQuestion.jsx';
import {Link} from 'react-router';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: '',
            realName: '',
            questionType: '',
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
        return (<div className="container-fluid">

                <h3>
                    添加题目
                    <span><Link to="/selectQuestion">添加选择题</Link></span>
                    <span><Link to="/blankQuestion">添加填空题</Link></span>
                </h3>
                <hr/>
                {this.props.children}
            </div>
        );

    }

}

export default AddQuestion;
