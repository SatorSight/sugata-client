import React from 'react'
import JournalHeader from './JournalPage/JournalHeader';
import IssuesSwiper from './../Components/IssuesSwiper';
import MainTabs from './../Components/MainTabs';
import OtherIssues from './../Components/OtherIssues';
import PopularJournals from './../Components/PopularJournals';
import IndexFooter from '../Components/IndexFooter';
import Waiter from '../Helpers/Waiter2';
import AuthorizableComponent from '../Helpers/AuthorizableComponent';

export default class JournalPage extends AuthorizableComponent {
    constructor(props){
        super(props);
    }

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNew,
            'more_popular_articles': this.loadMorePopular
        };

        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <JournalHeader payment_trigger={this.paymentTrigger} auth_data={this.state.auth_data} data={this.state.data}/>
                <IssuesSwiper
                    parent_type={'journal'}
                    issues={this.state.data.last_issues}
                    articles={this.state.data.issues_cover_articles}/>
                <MainTabs onlyFirst controls={controls} data={this.state.data}/>
                <OtherIssues issues={this.state.data.rest_issues} data={this.state.data}/>
                <MainTabs onlySecond controls={controls} data={this.state.data}/>
                <PopularJournals journals={this.state.data.same_bundle_journals}/>
                <IndexFooter />
            </div>
        );
    }
}