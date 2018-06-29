import React, { Component } from 'react'
import { connect } from 'react-redux';
import Reader from './ArticlePage/Reader/Reader';
import Header from '../Components/Header';

const styles = {
    root: {
        // width: '100%',
        // overflow: 'hidden',
    },
    // button: {
    //     display: 'block',
    //     position: 'relative',
    //     background: '#FFF',
    //     zIndex: 55,
    //     textAlign: 'center',
    // }
};

// const mapStateToProps = state => ({
//     loading: state.server.loading,
//     bundle: state.server.bundle,
//     auth_data: state.server.auth_data,
// });

const mapStateToProps = state => {
    // console.log('article page state');
    // console.log(state);
    return {
        loading: state.server.loading,
        // history: thi
        // bundle: state.server.bundle,
        // auth_data: state.server.auth_data,
    }
};


class ArticlePage extends Component {

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        return false;
    }

    render() {
        // console.log('article page loading?');
        // console.log(this.props.loading);
        return !this.props.loading &&
            <div
                // style={styles.root}
            >
                <Header />
                <Reader
                    {...this.props}
                    // article={this.props.article}
                    // bundle={this.props.bundle}
                    // auth_data={this.props.auth_data}
                    page_load_limit={4}
                    // payment_trigger={this.paymentTrigger}
                    //{...this.state.data}
                    // history={this.props.history}
                />
            </div>;
    }
}

export default connect(
    mapStateToProps,
)(ArticlePage);