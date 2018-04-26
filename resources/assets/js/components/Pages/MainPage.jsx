import React from 'react'
import IndexHeader from './MainPage/IndexHeader';
import NewIssues from './../Components/NewIssues';
import MainTopics from './../Components/MainTopics';
import MainTabs from './../Components/MainTabs';
import PopularJournals from './../Components/PopularJournals';
import IndexFooter from '../Components/IndexFooter';
import Waiter from '../Helpers/Waiter2';
import PageComponent from '../Helpers/PageComponent';

class MainPage extends PageComponent {
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
                <IndexHeader auth_data={this.state.auth_data} data={this.state.data}/>
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