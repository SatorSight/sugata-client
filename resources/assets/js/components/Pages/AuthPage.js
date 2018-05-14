import React from 'react';
import AuthHeader from './AuthPage/AuthHeader';
import IndexFooter from '../Components/IndexFooter';
import Waiter from '../Helpers/Waiter2';
import AuthorizableComponent from '../Helpers/AuthorizableComponent';


export default class AuthPage extends AuthorizableComponent {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <AuthHeader payment_trigger={this.paymentTrigger} auth_data={this.state.auth_data} data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}