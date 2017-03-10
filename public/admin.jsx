require("bootstrap-webpack");
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Teacher from './teacher.jsx';
import TeacherIndex from './components/teacher/TeacherIndex.jsx';
import LoginForm from './components/LoginForm.jsx';
import PersonalPage from './components/PersonalPage.jsx';
import AddQuestion from './components/teacher/AddQuestion.jsx';
import QuestionBankPage from './components/teacher/QuestionBankPage.jsx';
import ExamQuestionBankPage from './components/teacher/ExamQuestionBankPage.jsx';
import PracticeQuestionBankPage from './components/teacher/PracticeQuestionBankPage.jsx';
import AddExam from './components/teacher/AddExam.jsx';
import ShowExam from './components/teacher/ShowExam.jsx';
import SelectQuestion from './components/teacher/SelectQuestion.jsx';
import BlankQuestion from './components/teacher/BlankQuestion.jsx';
import Pagination from './components/teacher/Pagination.jsx';
import QuestionBankList from './components/teacher/QuestionBankList.jsx';
import QuestionBank from './components/teacher/QuestionBank.jsx';
import AddQuestionBank from './components/teacher/AddQuestionBank.jsx';
import AddSelectQuestion from './components/teacher/AddSelectQuestion.jsx';
import QuestionList from './components/teacher/QuestionList.jsx';
import {isLogin} from './js/UserUtil'
import './components/teacher/css/main.css';
import 'antd/dist/antd.css';


const router = <Router history={hashHistory}>
    <Route path="/index" component={Teacher} onEnter={isLogin}>
        {/*<IndexRoute components={TeacherIndex}/>*/}
        <Route path='/questionBankList' component={QuestionBankList}>
        </Route>
        <Route path='/addQuestionBank' component={AddQuestionBank}>
            {/*<Route path='/addQuestion' components={AddQuestion}>*/}
            {/*</Route>*/}
        </Route>
        <Route path='/questionBank/:qbid' component={QuestionBank}>
            <IndexRoute components={QuestionList}/>
            <Route path='/selectQuestion/:qbid' components={AddSelectQuestion}/>
            <Route path='/blankQuestion' components={BlankQuestion}/>
            <Route path='/Pagination' components={Pagination}/>

        </Route>
        <Route path='/personalPage' component={PersonalPage}/>
        <Route path='/questionBankPage' components={QuestionBankPage}/>
        <Route path='/examQuestionBankPage' components={ExamQuestionBankPage}/>
        <Route path='/practiceQuestionBankPage' components={PracticeQuestionBankPage}/>
        <Route path='/addExam' components={AddExam}/>
        <Route path='/showExam' components={ShowExam}/>
    </Route>
    <Route path='/' component={LoginForm}>
        <Route path='/login' component={LoginForm}/>
    </Route>
</Router>;


ReactDOM.render(
    router,
    document.getElementById("content")
);

// use jquery
console.log($('#content').text());

// Notice!!!
// Following is required to make reloading happen
if (module.hot) {
    module.hot.accept();
}
