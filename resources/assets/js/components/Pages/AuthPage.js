import React, { Component } from 'react';
import AuthHeader from './AuthPage/AuthHeader';
import IndexFooter from '../Components/IndexFooter';

export default class Application extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            _this: this
        }
    }
    render() {
        return (
            <div>
                <AuthHeader data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}