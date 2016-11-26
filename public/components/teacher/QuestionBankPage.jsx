import React from 'react';
import {Link} from 'react-router';

class QuestionBankPage extends React.Component {
    render() {
        return (<div>
            <Link to="/addQuestion">AddBlankQuestion</Link>
        </div>);
    }
}

export default QuestionBankPage;