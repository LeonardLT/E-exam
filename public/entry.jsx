require("bootstrap-webpack");
import Student from './student.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import SignIn from './components/sign-in.jsx';
import StudentIndex from './components/student-index.jsx';
import Exam from './components/exam.jsx';
import LoginForm from './components/LoginForm.jsx';
import Register from './components/register.jsx';


const router = <Router history={hashHistory}>
    <Route path="/" component={Student}>
        <IndexRoute component={StudentIndex}/>
        {/*<Route path='/login' component={LoginForm}/>*/}
        <Route path='/ss' component={SignIn}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={SignIn}/>
        <Route path='/exam' component={Exam}/>
    </Route>
</Router>;


ReactDOM.render(
    // <Student />,
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
