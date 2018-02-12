import React, { Component } from "react";
import IndexHeader from './MainPage/IndexHeader';
import NewIssues from './../Components/NewIssues';
import MainTopics from './../Components/MainTopics';
import MainTabs from './../Components/MainTabs';
import PopularJournals from './../Components/PopularJournals';
import IndexFooter from './MainPage/IndexFooter';
import * as SUtils from './../Helpers/SUtils';


class MainPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {}
        }
    }

    componentWillMount(){
        let _this = this;

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

        SUtils.updateStateWithApiRequestFor('bundles', _this);
        SUtils.updateStateWithApiRequestFor('new_issues', _this);
        SUtils.updateStateWithApiRequestFor('new_articles', _this);
        SUtils.updateStateWithApiRequestFor('chosen_articles', _this);
        SUtils.updateStateWithApiRequestFor('popular_articles', _this);
        SUtils.updateStateWithApiRequestFor('journals', _this);
    }

    render() {
        return (
            <div>
                <IndexHeader data={this.state.data}/>
                <NewIssues data={this.state.data}/>
                <MainTopics data={this.state.data}/>
                <MainTabs data={this.state.data}/>
                <PopularJournals  data={this.state.data}/>
                {/*<IndexFooter />*/}
            </div>
        );
    }
}

export default MainPage;