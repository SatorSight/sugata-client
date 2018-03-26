import React, { Component } from 'react';
import BundleHeader from './BundlePage/BundleHeader';
import IssuesSwiper from './../Components/IssuesSwiper';
import MainTabs from './../Components/MainTabs';
import ThematicSwiper from "../Components/ThematicSwiper";
import IndexFooter from '../Components/IndexFooter';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Lines from 'react-preloaders/Preloaders/Lines';
import Waiter from '../Helpers/Waiter2';

export default class Application extends Component {

    self_id = null;

    constructor(props){
        super(props);

        this.self_id = this.props.match.params.id;

        this.state = {
            data: {},
            loading: true,
        };
    }


    componentDidMount(){
        SUtils.load(ResourceRoutes.BUNDLE_RESOURCES, this);
    }
    componentWillReceiveProps(){
        SUtils.load(ResourceRoutes.BUNDLE_RESOURCES, this);
    }

    loadMoreNewBundles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'bundle', 'more_new_articles', this, this.self_id);
    loadMorePopularBundles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'bundle', 'more_popular_articles', this, this.self_id);

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNewBundles,
            'more_popular_articles': this.loadMorePopularBundles
        };

        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <BundleHeader data={this.state.data}/>
                <IssuesSwiper issues={this.state.data.last_issues} articles={this.state.data.last_cover_articles}/>
                <MainTabs onlyFirst controls={controls} data={this.state.data}/>
                {/*<ThematicSwiper  data={this.state.data}/>*/}
                <MainTabs onlySecond controls={controls} data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}