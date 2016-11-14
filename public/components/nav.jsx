import React from 'react';
import {Link} from 'react-router';


export default class Nav extends React.Component {
    render() {
        return (<div>

            <nav className="navbar-inverse" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"><big>EXAM</big></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#">首页</a></li>
                                <li><a href="#">试题练习</a></li>
                                <li><Link to="/exam">在线考试</Link></li>
                                <li><a href="#">个人中心</a></li>
                            </ul>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">登陆</a></li>
                            <li><a href="#">注册</a></li>
                        </ul>
                    </div>
                </div>
            </nav>


        </div>);
    }
};