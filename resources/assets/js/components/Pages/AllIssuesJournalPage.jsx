import React from 'react'
import Waiter from '../Helpers/Waiter2';
import PageComponent from '../Helpers/PageComponent';
import AllIssuesView from '../Pages/AllIssuesPage/AllIssuesView';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import * as SUtils from '../Helpers/SUtils';

export default class AllIssuesJournalPage extends PageComponent {
    constructor(props){
        super(props);

        //due to non-standard url override data resources
        this.getRoutesObject = this.getRoutesObjectOverride;
    }

    getRoutesObjectOverride = () => ResourceRoutes.ALL_ISSUES_JOURNAL_RESOURCES;
    loadMore = () => SUtils.appendStateWithApiRequestFor('issues', 'all_issues_journal', 'more_issues', this, this.self_id);

    render() {
        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <AllIssuesView load_more={this.loadMore} title={this.state.data.title} issues={this.state.data.issues}/>
            </div>
        );
    }
}