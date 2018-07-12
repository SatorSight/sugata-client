import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
import NewIssues from '../../containers/NewIssues';
import BundlesSwiper from '../../containers/BundlesSwiper';
import BigArticles from '../../containers/BigArticles';
import NewArticles from '../../containers/NewArticles';
import Footer from '../Components/Footer';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
    loading: state.server.loading,
    self_id: state.router.self_id,
});

class JournalPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const links_labels = {
            label: 'Последние выпуски журнала',
            link: `/all_issues_journal/${this.props.self_id}`,
        };
        return (
            !this.props.loading && <div>
                <Header />
                {/*<BundlesSwiper />*/}
                <NewIssues {...links_labels} resource={'last_issues'}/>
                <BigArticles {...links_labels} resource={'issues_cover_articles'}/>
                <NewArticles {...links_labels} resource={'new_articles'}/>
                <Footer />
            </div>
        );
    }
}

JournalPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    self_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(mapStateToProps)(JournalPage);