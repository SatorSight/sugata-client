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

class JournalPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            !this.props.loading && <div>
                <Header />
                {/*<BundlesSwiper />*/}
                <NewIssues label={'Последние выпуски журнала'} link={`/all_issues_journal/${this.props.self_id}`} resource={'last_issues'}/>
                <BigArticles resource={'issues_cover_articles'}/>
                <NewArticles label={'Последние выпуски журнала'} link={`/all_issues_journal/${this.props.self_id}`} resource={'new_articles'}/>
                <Footer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(JournalPage);