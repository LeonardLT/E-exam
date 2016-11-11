import React from 'react';

class Hello extends React.Component {
    render() {
        return (<div>
            <h1>I am a teacher.</h1>
            <div>{this.props.children}</div>
        </div>)
    }
}

export default Hello;