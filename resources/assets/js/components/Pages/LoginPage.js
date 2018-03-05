import React, { Component } from 'react';
import LoginHeader from './LoginPage/LoginHeader';
import IndexFooter from './MainPage/IndexFooter';

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
                <LoginHeader data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}