import React, { Component } from "react";
import IndexHeader from './MainPage/IndexHeader';
import NewIssues from './../Components/NewIssues';
import MainTopics from './../Components/MainTopics';
import MainTabs from './../Components/MainTabs';
import PopularJournals from './../Components/PopularJournals';
import IndexFooter from '../Components/IndexFooter';
import * as SUtils from './../Helpers/SUtils';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Lines from 'react-preloaders/Preloaders/Lines';

class MainPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            loading: true,
        }
    }


    componentDidMount(){
        SUtils.load(ResourceRoutes.MAIN_RESOURCES, this);
    }
    componentWillReceiveProps(){
        SUtils.load(ResourceRoutes.MAIN_RESOURCES, this);
    }

    loadMoreNewArticles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'index', 'more_new_articles', this);
    loadMorePopularArticles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'index', 'more_popular_articles', this);

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
                <IndexHeader data={this.state.data}/>
                <NewIssues data={this.state.data}/>
                <MainTopics data={this.state.data}/>
                <MainTabs
                    controls={controls}
                    data={this.state.data}/>
                <PopularJournals  journals={this.state.data.popular_editions}/>
                <IndexFooter />
            </div>
        );
    }
}

export default MainPage;