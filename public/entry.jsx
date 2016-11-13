require("bootstrap-webpack");
import Student from './student.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import SignIn from './components/sign-in.jsx';
import StudentIndex from './components/student-index.jsx';
import Exam from './components/exam.jsx';


const router = <Router history={hashHistory}>
    <Route path="/" component={Student}>
        <IndexRoute component={StudentIndex}/>
        {/*<Route path='/a' component={SignIn}/>*/}
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
