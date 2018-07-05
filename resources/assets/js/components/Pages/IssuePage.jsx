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
    loading: state.server.loading
});

class IssuePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            !this.props.loading && <div>
                <Header />
                <BundlesSwiper />
                <NewIssues title={'Другие выпуски'} resource={'other_issues'}/>
                <BigArticles resource={'main_topics'}/>
                <NewArticles resource={'new_articles'}/>
                <Footer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(IssuePage);