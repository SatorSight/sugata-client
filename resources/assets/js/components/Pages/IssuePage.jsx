import React, { Component } from "react";
import IssueHeader from './IssuePage/IssueHeader';
import IssuesTheme from "../Components/IssuesTheme";
import MainTabs from './../Components/MainTabs';
import OtherIssues from './../Components/OtherIssues';
import PreviousIssue from "../Components/PreviousIssue";
import * as SUtils from './../Helpers/SUtils';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Lines from 'react-preloaders/Preloaders/Lines';
import Waiter from '../Helpers/Waiter2';

class IssuePage extends Component {

    self_id = null;

    constructor(props){
        super(props);

        this.self_id = this.props.match.params.id;

        this.state = {
            data: {},
            loading: true
        }
    }

    componentDidMount(){
        SUtils.load(ResourceRoutes.ISSUE_RESOURCES, this);
    }
    componentWillReceiveProps(nextProps){
        SUtils.load(ResourceRoutes.ISSUE_RESOURCES, this);
    }

    //todo refactor maybe
    getPrevIssue = () => {
        let prev_issue = null;
        if(SUtils.any(this.state.data.all_issues) && !SUtils.empty(this.state.data.issue)){
            const issue = this.state.data.issue;
            this.state.data.all_issues.map((iss, i) => {
                if(iss.id === issue.id) {
                    if (!SUtils.empty(this.state.data.all_issues[i - 1]))
                        prev_issue = this.state.data.all_issues[i - 1];
                }
            });
        }
        return prev_issue;
    };

    loadMoreNewArticles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'issue', 'more_new_articles', this, this.self_id);
    // loadMorePopularArticles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'more_popular_articles', this.state._this);

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNewArticles,
            // 'more_popular_articles': this.loadMorePopularArticles
        };

        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <IssueHeader self_id={this.self_id} data={this.state.data}/>
                <IssuesTheme data={this.state.data}/>
                <MainTabs
                    onlyFirst
                    controls={controls}
                    data={this.state.data}/>
                <OtherIssues issues={this.state.data.all_issues}/>
                <PreviousIssue issue={this.getPrevIssue()}/>
            </div>
        );
    }
}

export default IssuePage;