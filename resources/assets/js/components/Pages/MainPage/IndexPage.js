import React, { Component } from "react";
import IndexHeader from './IndexHeader';
import NewIssues from './NewIssues';
import MainTopics from './MainTopics';
import MainTabs from './MainTabs';
import PopularJournals from './PopularJournals';
import IndexFooter from './IndexFooter';

class IndexPage extends Component {
    render() {
        return (
            <div>
                <IndexHeader />
                <NewIssues />
                <MainTopics />
                <MainTabs />
                <PopularJournals />
                <IndexFooter />
            </div>
        );
    }
}

export default IndexPage;