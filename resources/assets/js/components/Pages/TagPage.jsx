import React, { Component } from "react";
import TagHeader from './TagPage/TagHeader';
import MainTabs from './../Components/MainTabs';
import RelatedTopics from './../Components/RelatedTopics';
import IndexFooter from '../Components/IndexFooter';
import * as SUtils from './../Helpers/SUtils';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Waiter from '../Helpers/Waiter2';


class TagPage extends Component {

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
            const promises = ResourceRoutes.MAIN_RESOURCES.map(resource => this.load(resource));
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
                    ? <Waiter/>
                    : null}
                <TagHeader data={this.state.data}/>
                <MainTabs controls={controls} data={this.state.data}/>
                <RelatedTopics controls={controls} data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}

export default TagPage;