import React from 'react'
import IndexHeader from './MainPage/IndexHeader';
import NewIssues from './../Components/NewIssues';
import MainTopics from './../Components/MainTopics';
import MainTabs from './../Components/MainTabs';
import PopularJournals from './../Components/PopularJournals';
import IndexFooter from '../Components/IndexFooter';
import Waiter from '../Helpers/Waiter2';
import AuthorizableComponent from '../Helpers/AuthorizableComponent';

class MainPage extends AuthorizableComponent {
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
                <Waiter loading={this.state.loading}/>
                <IndexHeader payment_trigger={this.paymentTrigger} auth_data={this.state.auth_data} data={this.state.data}/>
                <NewIssues data={this.state.data}/>
                <MainTopics data={this.state.data}/>
                <MainTabs
                    controls={controls}
                    data={this.state.data}/>
                <PopularJournals journals={this.state.data.popular_editions}/>
                <IndexFooter />
            </div>
        );
    }
}

export default MainPage;