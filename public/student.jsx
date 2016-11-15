import React from 'react';
import Nav from './components/Nav.jsx';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Hello;