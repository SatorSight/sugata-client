import React, { Component } from 'react'
import AllIssuesView from './AllIssuesPageComponents/AllIssuesView';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
    loading: state.server.loading,
});

class AllIssuesBundlePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            !this.props.loading && <div>
                <Header />
                <AllIssuesView h3={'Все выпуски'}/>
                <Footer />
            </div>
        );
    }
}

AllIssuesBundlePage.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AllIssuesBundlePage);