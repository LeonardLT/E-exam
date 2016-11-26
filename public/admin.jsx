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

const router = <Router history={hashHistory}>
    <Route path="/teacher" component={Teacher}>
        <IndexRoute components={TeacherIndex}/>
        <Route path='/personalPage' component={PersonalPage}/>
        <Route path='/addQuestion' components={AddQuestion}/>
        <Route path='/questionBankPage' components={QuestionBankPage}/>
    </Route>
    <Route path='/' component={LoginForm}/>
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
