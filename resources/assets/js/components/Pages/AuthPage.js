import React, { Component } from 'react';
import AuthHeader from './AuthPage/AuthHeader';
import IndexFooter from '../Components/IndexFooter';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Waiter from '../Helpers/Waiter2';

export default class AuthPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            loading: false,
        }
    }
    //
    // componentDidMount(){
    //     SUtils.load(ResourceRoutes.MAIN_RESOURCES, this);
    // }
    // componentWillReceiveProps(){
    //     SUtils.load(ResourceRoutes.MAIN_RESOURCES, this);
    // }
    //
    // loadMoreNewArticles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'index', 'more_new_articles', this);
    // loadMorePopularArticles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'index', 'more_popular_articles', this);

    render() {
        // const controls = {
        //     'more_new_articles': this.loadMoreNewArticles,
        //     'more_popular_articles': this.loadMorePopularArticles
        // };

        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <AuthHeader data={this.state.data}/>
                <IndexFooter />
            </div>
        );
    }
}