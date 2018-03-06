import React, { Component } from 'react';
import AuthHeader from './AuthPage/AuthHeader';

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
        //getting resources, API list below:
        /*
         /bundles/
        */

        this.loadBundles();
    }

    loadBundles = () => SUtils.updateStateWithApiRequestFor('bundles', this.state._this);

    render() {
        return (
            <div>
                <AuthHeader data={this.state.data} />
            </div>
        );
    }
}