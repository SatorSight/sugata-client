import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
import AllTags from '../../containers/AllTags';
import TagSearch from '../../containers/TagSearch';
import Footer from '../Components/Footer';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
    loading: state.server.loading,
});

class TagSearchPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            !this.props.loading && <div>
                <Header />
                <TagSearch/>
                <AllTags resource={'tags'} />
                <Footer />
            </div>
        );
    }
}

TagSearchPage.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(TagSearchPage);