import React, { Component } from 'react';
import JournalHeader from './JournalPage/JournalHeader';
import IssuesSwiper from './../Components/IssuesSwiper';
import MainTabs from './../Components/MainTabs';
import OtherIssues from './../Components/OtherIssues';
import PopularJournals from './../Components/PopularJournals';
import IndexFooter from '../Components/IndexFooter';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Lines from 'react-preloaders/Preloaders/Lines';


export default class Application extends Component {

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
        SUtils.load(ResourceRoutes.JOURNAL_RESOURCES, this);
    }
    componentWillReceiveProps(){
        SUtils.load(ResourceRoutes.JOURNAL_RESOURCES, this);
    }

    loadMoreNewArticles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'journal', 'more_new_articles', this, this.self_id);
    loadMorePopularArticles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'journal', 'more_popular_articles', this, this.self_id);

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNewArticles,
            'more_popular_articles': this.loadMorePopularArticles
        };

        return (
            <div>
                {this.state.loading
                    ? <Lines
                        color={'#f7f7f7'}
                        bgColor={'#222'}
                        time={1400}/>
                    : null}
                <JournalHeader data={this.state.data}/>
                <IssuesSwiper issues={this.state.data.last_issues} articles={this.state.data.issues_cover_articles}/>
                <MainTabs onlyFirst controls={controls} data={this.state.data}/>
                <OtherIssues issues={this.state.data.rest_issues} data={this.state.data}/>
                <MainTabs onlySecond controls={controls} data={this.state.data}/>
                <PopularJournals journals={this.state.data.same_bundle_journals}/>
                <IndexFooter />
            </div>
        );
    }
}