require("bootstrap-webpack");
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Teacher from './teacher.jsx';
import TeacherIndex from './components/teacher/TeacherIndex.jsx';
import LoginForm from './components/LoginForm.jsx';
import PersonalPage from './components/PersonalPage.jsx';


const router = <Router>
    <Route path="/teacher" component={Teacher}>
        <IndexRoute components={TeacherIndex}/>
        <Route path='/personalPage' component={PersonalPage}/>
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
