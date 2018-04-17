import React from 'react'
import Waiter from '../Helpers/Waiter2';
import PageComponent from '../Helpers/PageComponent';
import AllIssuesView from '../Pages/AllIssuesPage/AllIssuesView';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";

export default class AllIssuesBundlePage extends PageComponent {
    constructor(props){
        super(props);

        //due to non-standard url override data resources
        this.getRoutesObject = this.getRoutesObjectOverride;
    }

    getRoutesObjectOverride = () => ResourceRoutes.ALL_ISSUES_BUNDLE_RESOURCES;

    render() {
        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <AllIssuesView issues={this.state.data.issues}/>
            </div>
        );
    }
}