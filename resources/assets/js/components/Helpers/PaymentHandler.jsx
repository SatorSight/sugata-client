import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";

// import { startLoading, stopLoading, loadAuthData, loadResource } from '../../actions/server';
import { receiveSelfId } from '../../actions/router';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    pages_viewed: state.server,
    auth_data: state.server.auth_data,
    // self_id: state.router.self_id,
});

const mapDispatchToProps = dispatch => ({
    // receiveSelfId: (self_id) => dispatch(receiveSelfId(self_id)),
});

class PaymentHandler extends Component {
    constructor(props){
        super(props);
    }

    paymentTrigger = bundle => {
        // if(!bundle) {
        //     if (this.state.data && this.state.data.bundle)
        //         bundle = this.state.data.bundle.id;
        // }

        let has_bundle_access = false;
        this.props.auth_data.user_bundles.map(b => {
            if(bundle){
                if(parseInt(b) === parseInt(bundle)){
                    has_bundle_access = true;
                }
            }
        });

        if(!has_bundle_access){
            const current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.location = '/auth?return_url=' + current_url + (bundle ? '&bundle_id=' + bundle : '');
        }
    };

    render(){
        return null;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentHandler);