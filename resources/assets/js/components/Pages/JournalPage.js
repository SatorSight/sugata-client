import React, { Component } from 'react';
import JournalHeader from './JournalPage/JournalHeader';
import IssuesSwiper from './../Components/IssuesSwiper';
import MainTabs from './../Components/MainTabs';
import OtherIssues from './../Components/OtherIssues';
import PopularJournals from './../Components/PopularJournals';
import IndexFooter from './MainPage/IndexFooter';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Lines from 'react-preloaders/Preloaders/Lines';


export default class Application extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            _this: this,
            loading: true
        }
    }

    load = resource => SUtils.updateStateWithApiRequestFor(resource, this.state._this);

    componentWillMount(){
        this.setState({loading: true}, () => {
            const promises = ResourceRoutes.JOURNAL_RESOURCES.map(resource => this.load(resource));
            Promise.all(promises).then(() => {
                this.setState({loading: false});
            });
        });
    }

    loadMoreNewArticles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'more_new_articles', this.state._this);
    loadMorePopularArticles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'more_popular_articles', this.state._this);

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
                <IssuesSwiper data={this.state.data}/>
                <MainTabs controls={controls} data={this.state.data}/>
                <OtherIssues data={this.state.data}/>
                <MainTabs controls={controls} data={this.state.data}/>
                <PopularJournals data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}