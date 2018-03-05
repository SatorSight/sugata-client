import React, { Component } from 'react';
import AuthHeader from './AuthPage/AuthHeader';
import IndexFooter from './MainPage/IndexFooter';
import * as SUtils from "../Helpers/SUtils";

export default class AuthPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            _this: this
        }
    }
    componentWillMount(){
        this.loadNewIssues();
    }
    loadNewIssues = () => SUtils.updateStateWithApiRequestFor('new_issues', this.state._this);

    render() {
        return (
            <div>
                <AuthHeader data={this.state.data} />
                <IndexFooter />
            </div>
        );
    }
}