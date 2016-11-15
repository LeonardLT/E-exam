require("bootstrap-webpack");
import Student from './student.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import StudentIndex from './components/StudentIndex.jsx';
import Exam from './components/Exam.jsx';
import LoginForm from './components/LoginForm.jsx';
import Register from './components/Register.jsx';


const router = <Router history={hashHistory}>
    <Route path="/" component={Student}>
        <IndexRoute component={StudentIndex}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/exam' component={Exam}/>
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
