import React from 'react'
import IssueHeader from './IssuePage/IssueHeader';
import IssuesTheme from "../Components/IssuesTheme";
import MainTabs from './../Components/MainTabs';
import OtherIssues from './../Components/OtherIssues';
import PreviousIssue from "../Components/PreviousIssue";
import * as SUtils from './../Helpers/SUtils';
import Waiter from '../Helpers/Waiter2';
import PageComponent from '../Helpers/PageComponent';

class IssuePage extends PageComponent {
    constructor(props){
        super(props);
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

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNew,
            // 'more_popular_articles': this.loadMorePopularArticles
        };

        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <IssueHeader auth_data={this.state.auth_data} self_id={this.self_id} data={this.state.data}/>
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