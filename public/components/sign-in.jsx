import React from 'react';
import request from 'superagent';


export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
        }
    }


    componentDidMount() {
        request.get('/api/problem')
            .end((err, data) => {
                // console.log(data.body);
                this.setState({
                    product: data.body
                });
            });
    }

    render() {

        return (<form onSubmit={this._onSubmit.bind(this)}>
            {/*<div className="content">*/}
                {/*{this.state.product.map(i =><div>{i.time}{i.examName}{i.problems.map(j =>*/}
                    {/*<div>{j.problem}</div>)}</div>)}*/}
                {/*<input type="submit" value="登录" className="btn btn-primary"/>*/}
            {/*</div>*/}
            <input type="Number" min="0" className="form-control" id="bicycleId"/>
        </form>)
    }


    _onSubmit(event) {
        event.preventDefault();
        request.get('/api/problem')
            .end((err, data) => {
                // console.log(data.body);
                this.setState({
                    product: data.body
                });
            });
    }
}

