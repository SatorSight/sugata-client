import React, { Component } from 'react';
import AuthHeader from './AuthPage/AuthHeader';
import IndexFooter from '../Components/IndexFooter';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";

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
            const promises = ResourceRoutes.BUNDLE_RESOURCES.map(resource => this.load(resource));
            Promise.all(promises).then(() => {
                this.setState({loading: false});
            });
        });
    }

    loadMoreNewBundles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'more_new_articles', this.state._this);
    loadMorePopularBundles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'more_popular_articles', this.state._this);

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNewBundles,
            'more_popular_articles': this.loadMorePopularBundles
        };
        return (
            <div>
                <AuthHeader data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}