import React, { Component } from 'react';
import Reader from './ArticlePage/Reader/Reader';
import Waiter from '../Helpers/Waiter2';

import AuthorizableComponent from '../Helpers/AuthorizableComponent';

const styles = {
    root: {
        width: '100%',
        overflow: 'hidden',
    },
    button: {
        display: 'block',
        position: 'relative',
        background: '#FFF',
        zIndex: 55,
        textAlign: 'center',
    }
};

export default class ArticlePage extends AuthorizableComponent {

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        return false;
    }

    render() {
        return <div style={styles.root}>
                    {this.state.loading
                        ? <Waiter/>
                        : <Reader
                            auth_data={this.state.auth_data}
                            page_load_limit={4}
                            payment_trigger={this.paymentTrigger}
                            {...this.state.data}
                            history={this.props.history} />}

                </div>;
    }
}