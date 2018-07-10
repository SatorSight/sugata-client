import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
import NewIssues from '../../containers/NewIssues';
import BundlesSwiper from '../../containers/BundlesSwiper';
import BigArticles from '../../containers/BigArticles';
import NewArticles from '../../containers/NewArticles';
import PopularJournals from '../../containers/PopularJournals';
import Footer from '../Components/Footer';

const mapStateToProps = state => ({
    loading: state.server.loading,
    self_id: state.router.self_id,
});

class BundlePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            !this.props.loading && <div>
                <Header />
                {/*<BundlesSwiper />*/}
                <NewIssues count={6} resource={'last_issues'} label={'Последние выпуски набора'} link={`/all_issues_bundle/${this.props.self_id}`}/>
                <BigArticles resource={'last_cover_articles'} link={`/all_issues_bundle/${this.props.self_id}`}/>
                <NewArticles resource={'new_articles'} label={'Последние выпуски набора'} link={`/all_issues_bundle/${this.props.self_id}`}/>
                <PopularJournals resource={'popular_editions'} link={`/all_issues_bundle/${this.props.self_id}`}/>
                <NewArticles title={'Популярные статьи'} resource={'popular_articles'} label={'Последние выпуски набора'} link={`/all_issues_bundle/${this.props.self_id}`}/>
                <Footer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(BundlePage);