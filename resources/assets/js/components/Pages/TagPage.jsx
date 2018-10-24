import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
// import NewIssues from '../../containers/NewIssues';
// import BundlesSwiper from '../../containers/BundlesSwiper';
// import BigArticles from '../../containers/BigArticles';
import NewArticles from '../../containers/NewArticles';
import Footer from '../Components/Footer';
import PropTypes from 'prop-types';
import { getResource } from '../Helpers/dataComposer';


const mapStateToProps = state => ({
    loading: state.server.loading,
    self_id: state.router.self_id,
    state: state,
});

class TagPage extends Component {
    constructor(props){
        super(props);

        console.log('tag props');
        console.log(props);
    }

    render() {
        const tag = getResource(this.props.state, 'tag');

        const links_labels = {
            title: 'Статьи по тегу ' + (tag.name || ''),
        };

        return (
            !this.props.loading && <div>
                <Header />
                <NewArticles no_links {...links_labels} resource={'articles'}/>
                <Footer />
            </div>
        );
    }
}

TagPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    self_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(mapStateToProps)(TagPage);