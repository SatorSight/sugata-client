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

    someAction = () => {
        console.log('some action');
        console.log(this.authorized());
        this.paymentTrigger();
    };

    render() {
        return <div style={styles.root}>
                    {this.state.loading
                        ? <Waiter/>
                        : <Reader
                            page_load_limit={4}
                            payment_trigger={this.paymentTrigger}
                            {...this.state.data}
                            history={this.props.history} />}

                </div>;
    }
}