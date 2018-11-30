import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
import HubHeader from '../Components/HubHeader';
import Footer from '../Components/Footer';
import { makeQuery } from '../Helpers/SUtils';
// import { getResource } from '../Helpers/dataComposer';

const mapStateToProps = state => ({
    loading: state.server.loading,
});

class PayPage extends Component {
    constructor(props){
        super(props);
    }

    pay = () => {

        /*
        *
*         const payload = {
         article_id: this.props.article_id,
         content: this.state.input,
         };

         SUtils.makeQuery(payload, 'POST', 'api/article/add_comment', () => this.setState({alert_visible: true}));

         *
        * */

        const payload = {
            apikey: 'd706daed7af9895a95356e72570496d5',
            login: '79167353880',
            amount: '1',
            description: 'desc',
        };


        fetch(`https://api.life-pay.ru/v1/bill`,
            {
                method: 'POST',
                body: payload,
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                console.log('---');
                console.log(data);
                console.log('---');
            });


        // makeQuery(payload, 'POST', 'https://api.life-pay.ru/v1/bill', () => {});
    };

    render() {
        // const tag = getResource(this.props.state, 'tag');

        return (
            !this.props.loading && <div>
                {/*<Header />*/}
                <div>

                    <button style={{height: '100px', width: '100px'}} onClick={this.pay}>pay</button>

                </div>
                {/*<Footer />*/}
            </div>
        );
    }
}

export default connect(mapStateToProps)(PayPage);