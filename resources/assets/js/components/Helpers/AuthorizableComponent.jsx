// import React, { Component } from 'react';
import PageComponent from '../Helpers/PageComponent'
import AuthHelper from '../Helpers/AuthHelper'

export default class AuthorizableComponent extends PageComponent {
    constructor(props){
        super(props)
    }

    auth_helper = new AuthHelper();

    paymentTrigger = () => {
        let bundle_id = null;

        if(this.state.data && this.state.data.bundle)
            bundle_id = this.state.data.bundle.id;

        if(!this.auth_helper.authorized){
            const current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.location = '/auth?return_url=' + current_url + (bundle_id ? '&bundle_id=' + bundle_id : '');
        }else
            console.log('authorized');
    };
}