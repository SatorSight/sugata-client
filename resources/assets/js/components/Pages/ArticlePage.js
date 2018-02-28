import React, { Component } from 'react';
import ArticleHeader from './ArticlePage/ArticleHeader';
import MainTabs from './../Components/MainTabs';
import IssuesSwiper from './../Components/IssuesSwiper';
import * as SUtils from "../Helpers/SUtils";
import ThematicSwiper from "../Components/ThematicSwiper";

export default class Application extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            _this: this
        }
    }

    componentWillMount(){
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
                <ArticleHeader data={this.state.data}/>
                <IssuesSwiper data={this.state.data}/>
                <MainTabs controls={controls} data={this.state.data}/>
                <ThematicSwiper  data={this.state.data}/>
                <MainTabs controls={controls} data={this.state.data}/>
            </div>
        );
    }
}