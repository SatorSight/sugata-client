import React from 'react'
import BundleHeader from './BundlePage/BundleHeader';
import IssuesSwiper from './../Components/IssuesSwiper';
import MainTabs from './../Components/MainTabs';
import IndexFooter from '../Components/IndexFooter';
import Waiter from '../Helpers/Waiter2';
import PageComponent from '../Helpers/PageComponent';

export default class Application extends PageComponent {
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
                <BundleHeader data={this.state.data}/>
                <IssuesSwiper
                    parent_type={'bundle'}
                    bundle_id={this.self_id}
                    issues={this.state.data.last_issues}
                    articles={this.state.data.last_cover_articles}/>
                <MainTabs onlyFirst controls={controls} data={this.state.data}/>
                {/*<ThematicSwiper  data={this.state.data}/>*/}
                <MainTabs onlySecond controls={controls} data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}