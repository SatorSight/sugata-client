import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
import NewIssues from '../../containers/NewIssues';
import BundlesSwiper from '../../containers/BundlesSwiper';
import BigArticles from '../../containers/BigArticles';
import NewArticles from '../../containers/NewArticles';
import PopularJournals from '../../containers/PopularJournals';
import Footer from '../Components/Footer';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
    loading: state.server.loading
});

class IndexPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            !this.props.loading && <div>
                <Header />
                <BundlesSwiper />
                <NewIssues count={6} link={'/all_issues'} resource={'new_issues'}/>
                <BigArticles link={'/all_issues'} resource={'main_topics'}/>
                <NewArticles link={'/all_issues'} resource={'new_articles'}/>
                <PopularJournals link={'/all_issues'} resource={'popular_editions'}/>
                <NewArticles title={'Популярные статьи'} link={'/all_issues'} resource={'popular_articles'}/>
                <Footer />
            </div>
        );
    }
}

IndexPage.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(IndexPage);