import React from 'react';

export default class StudentIndex extends React.Component {
    render() {
        return (
            <div>
                <div className="col-md-1">

                </div>
                <div>
                    <ul className="nav nav-pills" role="tablist">
                        <li role="presentation" className="active"><a href="#">Home</a></li>
                        <li role="presentation"><a href="#">在线考试</a></li>
                        <li role="presentation"><a href="#">Messages</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}