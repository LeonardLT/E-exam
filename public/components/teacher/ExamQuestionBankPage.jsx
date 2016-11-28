import React from 'react';
import AddQuestion from './AddQuestion.jsx';
import {Link} from 'react-router';
import request from 'superagent';


class ExamQuestionBankPage extends React.Component {
    componentWillMount() {
        request
            .get('/api/question/examQuestions')
            .end();
    }

    render() {
        return (<div>
            <div className="col-md-4">
                <h1>ExamQuestionBankPage</h1>
                <Link to="/addQuestion">AddBlankQuestion</Link>
            </div>
            <div className="col-md-8">1111</div>
        </div>);
    }
}

export default ExamQuestionBankPage;

