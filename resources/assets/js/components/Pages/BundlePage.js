import React, { Component } from 'react';
import BundleHeader from './BundlePage/BundleHeader';
import IssuesSwiper from './../Components/IssuesSwiper';
import MainTabs from './../Components/MainTabs';
import ThematicSwiper from "../Components/ThematicSwiper";
import IndexFooter from './MainPage/IndexFooter';
import * as SUtils from "../Helpers/SUtils";

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
        this.loadNewBundles();
        this.loadChosenBundles();
        this.loadPopularBundles();
        this.loadJournals();
    }

    loadBundles = () => SUtils.updateStateWithApiRequestFor('bundles', this.state._this);
    loadNewIssues = () => SUtils.updateStateWithApiRequestFor('new_issues', this.state._this);
    loadNewBundles = () => SUtils.updateStateWithApiRequestFor('new_articles', this.state._this);
    loadChosenBundles = () => SUtils.updateStateWithApiRequestFor('chosen_articles', this.state._this);
    loadPopularBundles = () => SUtils.updateStateWithApiRequestFor('popular_articles', this.state._this);
    loadJournals = () => SUtils.updateStateWithApiRequestFor('journals', this.state._this);

    loadMoreNewBundles = () => {
        console.log('fired');
        SUtils.appendStateWithApiRequestFor('new_articles', 'more_new_articles', this.state._this)
    };
    loadMorePopularBundles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'more_popular_articles', this.state._this);

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNewBundles,
            'more_popular_articles': this.loadMorePopularBundles
        };

        return (
            <div>
                <BundleHeader data={this.state.data}/>
                <IssuesSwiper data={this.state.data}/>
                <MainTabs controls={controls} data={this.state.data}/>
                <ThematicSwiper  data={this.state.data}/>
                <MainTabs controls={controls} data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}