require("bootstrap-webpack");
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Teacher from './teacher.jsx';
import TeacherIndex from './components/teacher/TeacherIndex.jsx';
import LoginForm from './components/LoginForm.jsx';
import AddExam from './components/teacher/AddExam.jsx';
import BlankQuestion from './components/teacher/BlankQuestion.jsx';
import QuestionBankList from './components/teacher/QuestionBankList.jsx';
import QuestionBank from './components/teacher/QuestionBank.jsx';
import AddQuestionBank from './components/teacher/AddQuestionBank.jsx';
import AddSelectQuestion from './components/teacher/AddSelectQuestion.jsx';
import QuestionList from './components/teacher/QuestionList.jsx';
import ExamList from './components/teacher/ExamList.jsx';
import Exam from './components/teacher/Exam.jsx';
import AddExamPaper from './components/teacher/AddExamPaper.jsx';
import ExamPaperList from './components/teacher/ExamPaperList.jsx';
import AddShortAnswerQuestion from './components/teacher/AddShortAnswerQuestion.jsx';
import TPersonalPage from './components/teacher/TPersonalPage.jsx';
import ExamPaper from './components/teacher/ExamPaper.jsx';
import ScoreList from './components/teacher/ScoreList.jsx';
import {isLogin} from './js/UserUtil'
import './components/teacher/css/main.css';
import 'antd/dist/antd.css';



const router = <Router history={hashHistory}>
    <Route path="/index" component={Teacher} onEnter={isLogin}>
        {/*<IndexRoute components={TeacherIndex}/>*/}
        <Route path='/questionBankList' component={QuestionBankList} onEnter={isLogin}/>
        <Route path='/examList' component={ExamList} onEnter={isLogin}/>
        <Route path='/exam/:id' component={Exam} onEnter={isLogin}/>
        <Route path='/addQuestionBank' component={AddQuestionBank} onEnter={isLogin}/>
        <Route path='/examPaper' component={AddExamPaper} onEnter={isLogin}/>
        <Route path='/examPaper/:id' component={AddExamPaper} onEnter={isLogin}/>
        <Route path='/examPaperList' component={ExamPaperList} onEnter={isLogin}/>
        <Route path='/previewPaper/:examId' component={ExamPaper} onEnter={isLogin}/>
        <Route path='/questionBank/:qbid' component={QuestionBank}>
            <IndexRoute components={QuestionList} onEnter={isLogin}/>
            <Route path='/selectQuestion/:qbid' components={AddSelectQuestion} onEnter={isLogin}/>
            <Route path='/shortAnswerQuestion/:qbid' components={AddShortAnswerQuestion} onEnter={isLogin}/>
            <Route path='/blankQuestion' components={BlankQuestion} onEnter={isLogin}/>
        </Route>
        <Route path='/addExam' components={AddExam} onEnter={isLogin}/>
        <Route path='/personalPage' components={TPersonalPage} onEnter={isLogin}/>
        <Route path='/scoreList' components={ScoreList} onEnter={isLogin}/>

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
