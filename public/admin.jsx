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
import ExamList from './components/teacher/ExamList.jsx';
import Exam from './components/teacher/Exam.jsx';
import AddExamPaper from './components/teacher/AddExamPaper.jsx';
import ExamPaperList from './components/teacher/ExamPaperList.jsx';
import AddShortAnswerQuestion from './components/teacher/AddShortAnswerQuestion.jsx';
import PreviewPaper from './components/teacher/PreviewPaper.jsx';
import TPersonalPage from './components/teacher/TPersonalPage.jsx';
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
        <Route path='/previewPaper/:examId' component={PreviewPaper} onEnter={isLogin}/>
        <Route path='/questionBank/:qbid' component={QuestionBank}>
            <IndexRoute components={QuestionList} onEnter={isLogin}/>
            <Route path='/selectQuestion/:qbid' components={AddSelectQuestion} onEnter={isLogin}/>
            <Route path='/shortAnswerQuestion/:qbid' components={AddShortAnswerQuestion} onEnter={isLogin}/>
            <Route path='/blankQuestion' components={BlankQuestion} onEnter={isLogin}/>
            <Route path='/Pagination' components={Pagination} onEnter={isLogin}/>
        </Route>
        <Route path='/personalPage' component={PersonalPage} onEnter={isLogin}/>
        <Route path='/questionBankPage' components={QuestionBankPage} onEnter={isLogin}/>
        <Route path='/examQuestionBankPage' components={ExamQuestionBankPage} onEnter={isLogin}/>
        <Route path='/practiceQuestionBankPage' components={PracticeQuestionBankPage} onEnter={isLogin}/>
        <Route path='/addExam' components={AddExam} onEnter={isLogin}/>
        <Route path='/showExam' components={ShowExam} onEnter={isLogin}/>
        <Route path='/personalPage' components={TPersonalPage} onEnter={isLogin}/>
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
