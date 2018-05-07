// import React, { Component } from 'react';
import PageComponent from '../Helpers/PageComponent';
import AuthHelper from '../Helpers/AuthHelper';
import * as SUtils from "../Helpers/SUtils";

export default class AuthorizableComponent extends PageComponent {
    constructor(props){
        super(props);
        SUtils.loadAuthDataToState(this);
    }

    // auth_helper = new AuthHelper();

    paymentTrigger = bundle => {
        // let bundle_id = bundle || null;

        if(!bundle) {
            if (this.state.data && this.state.data.bundle)
                bundle = this.state.data.bundle.id;
        }

        let has_bundle_access = false;
        this.state.auth_data.user_bundles.map(b => {
            if(bundle){
                if(parseInt(b) === parseInt(bundle)){
                    has_bundle_access = true;
                }
            }
        });


        // const user_bundles = this.state.auth_data.user_bundles.map(b => b);
        // console.log(user_bundles);
        // console.log(Array.isArray(user_bundles));
        // console.log(typeof user_bundles);
        // console.log(SUtils.in_array(parseInt(bundle.id), user_bundles));

        if(bundle && !has_bundle_access){
        // if(!this.auth_helper.authorized){
            const current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.location = '/auth?return_url=' + current_url + (bundle ? '&bundle_id=' + bundle : '');
        }else{
            // console.log('authorized');
        }

    };

    // authorized = () => this.auth_helper.authorized;
}