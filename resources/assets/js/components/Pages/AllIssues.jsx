import React, { Component } from 'react'
import AllIssuesView from '../Pages/AllIssuesPage/AllIssuesView';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { connect } from 'react-redux';

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
                <AllIssuesView
                    h3={'Все выпуски'}
                />
                <Footer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AllIssuesBundlePage);