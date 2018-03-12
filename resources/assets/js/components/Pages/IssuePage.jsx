import React, { Component } from "react";
import IssueHeader from './IssuePage/IssueHeader';
import IssuesTheme from "../Components/IssuesTheme";
import MainTabs from './../Components/MainTabs';
import OtherIssues from './../Components/OtherIssues';
import PreviousIssue from "../Components/PreviousIssue";
import * as SUtils from './../Helpers/SUtils';


class IssuePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            _this: this
        }
    }

    componentWillMount(){
        //getting resources, API list below:
        /*
         /bundles/
         /new_issues/
         /new_articles/
         /popular_articles/
         /chosen_articles/
         /journals/
         /more_new_articles/{from}
         /more_popular_articles/{from}
        */

        this.loadBundles();
        this.loadNewIssues();
        this.loadNewArticles();
        this.loadChosenArticles();
        this.loadPopularArticles();
        this.loadJournals();
    }

    loadBundles = () => SUtils.updateStateWithApiRequestFor('bundles', this.state._this);
    loadNewIssues = () => SUtils.updateStateWithApiRequestFor('new_issues', this.state._this);
    loadNewArticles = () => SUtils.updateStateWithApiRequestFor('new_articles', this.state._this);
    loadChosenArticles = () => SUtils.updateStateWithApiRequestFor('chosen_articles', this.state._this);
    loadPopularArticles = () => SUtils.updateStateWithApiRequestFor('popular_articles', this.state._this);
    loadJournals = () => SUtils.updateStateWithApiRequestFor('journals', this.state._this);

    // loadMoreNewArticles = function(){ SUtils.appendStateWithApiRequestFor('new_articles', 'more_new_articles', this.state._this) };
    // loadMoreNewArticles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'more_new_articles', this.state._this);
    loadMoreNewArticles = () => {
        console.log('fired');
        SUtils.appendStateWithApiRequestFor('new_articles', 'more_new_articles', this.state._this)
    };
    loadMorePopularArticles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'more_popular_articles', this.state._this);

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNewArticles,
            'more_popular_articles': this.loadMorePopularArticles
        };

        return (
            <div>
                <IssueHeader data={this.state.data}/>
                <IssuesTheme data={this.state.data}/>
                <MainTabs
                    controls={controls}
                    data={this.state.data}/>
                <OtherIssues data={this.state.data}/>
                <PreviousIssue data={this.state.data}/>

            </div>
        );
    }
}

export default IssuePage;