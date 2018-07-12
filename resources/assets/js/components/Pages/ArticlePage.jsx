import React, { Component } from 'react'
import { connect } from 'react-redux';
import Reader from './ArticlePageComponents/Reader/Reader';
import Header from '../Components/Header';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
    loading: state.server.loading,
});

class ArticlePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return !this.props.loading &&
            <div>
                <Header />
                <Reader {...this.props} page_load_limit={4} />
            </div>;
    }
}

ArticlePage.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ArticlePage);