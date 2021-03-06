import React from 'react'
import Waiter from '../Helpers/Waiter2';
import AuthorizableComponent from '../Helpers/AuthorizableComponent';
import AllIssuesView from '../Pages/AllIssuesPage/AllIssuesView';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import * as SUtils from '../Helpers/SUtils';

export default class AllIssuesBundlePage extends AuthorizableComponent {
    constructor(props){
        super(props);

        //due to non-standard url override data resources
        this.getRoutesObject = this.getRoutesObjectOverride;
    }

    getRoutesObjectOverride = () => ResourceRoutes.ALL_ISSUES_BUNDLE_RESOURCES;
    loadMore = () => SUtils.appendStateWithApiRequestFor('issues', 'all_issues_bundle', 'more_issues', this, this.self_id);

    render() {
        return (
            <div>
                <Waiter loading={this.state.loading}/>
                <AllIssuesView payment_trigger={this.paymentTrigger} auth_data={this.state.auth_data} data={this.state.data} self_id={this.self_id} load_more={this.loadMore} title={this.state.data.title} issues={this.state.data.issues} />
            </div>
        );
    }
}