require("bootstrap-webpack");
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Student from './student.jsx';
import StudentIndex from './components/StudentIndex.jsx';
import Exam from './components/Exam.jsx';
import LoginForm from './components/LoginForm.jsx';
import Register from './components/Register.jsx';
import PersonalPage from './components/PersonalPage.jsx';
import ExamList from './components/ExamList.jsx';
import PracticeExamList from './components/PracticeExamList.jsx';
import MyScore from './components/MyScore.jsx';
import UploadForm from './components/UploadForm.jsx';
import ExamPaper from './components/ExamPaper.jsx';
import {isLogin} from './js/UserUtil';
import 'antd/dist/antd.css';


const router = <Router history={hashHistory}>
    <Route path="/" component={Student}>
        <IndexRoute component={StudentIndex}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={LoginForm}/>
        {/*<Route path='/joinExam/:examId' component={Exam} onEnter={isLogin}/>*/}
        <Route path='/examPaper/:examId' component={ExamPaper} onEnter={isLogin}/>
        <Route path='/exam' component={ExamList} onEnter={isLogin}/>
        <Route path='/practice' component={PracticeExamList} onEnter={isLogin}/>
        <Route path='/uploadForm' component={UploadForm} onEnter={isLogin}/>
        <Route path='/personalPage' component={PersonalPage} onEnter={isLogin}>
            {/*<Route path="/myScore" component={MyScore} onEnter={isLogin}/>*/}
        </Route>
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
