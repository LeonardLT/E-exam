import React from 'react';
import Left from './Left.jsx';
import {hashHistory} from 'react-router'
import request from 'superagent';

export default class Main extends React.Component {
    render() {
        return (<div>
           <div style={{marginTop:"5px"}}>
               {/*<button className="btn btn-primary" onClick={this.goToPage("questionBank")}>新增</button>*/}
           </div>
            <hr/>
            <div>{this.props.children}</div>
        </div>);
    }
    goToPage(page){
        return () => {
            hashHistory.push(page);
        };
    }
    newQuestionBank(){
        
    }
}