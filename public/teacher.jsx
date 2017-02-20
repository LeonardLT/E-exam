import React from 'react';
import TeacherNav from './components/teacher/TeacherNav.jsx';

class Hello extends React.Component {

    render() {
        return (<div>
            <TeacherNav/>
            <div>{this.props.children}</div>
        </div>);
    }
}

export default Hello;