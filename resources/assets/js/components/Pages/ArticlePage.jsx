import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import ArticlePageHeader from './ArticlePage/ArticlePageHeader';
import NextArticle from "../Components/NextArticle";
import ContentArticle from "../Components/ContentArticle";

import AuthorizableComponent from '../Helpers/AuthorizableComponent';

const styles = {
    root: {
        width: '100%',
        overflow: 'hidden',
    },
};

export default class ArticlePage extends AuthorizableComponent {

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
        SUtils.load(ResourceRoutes.ARTICLE_RESOURCES, this);
    }
    componentWillReceiveProps(){
        SUtils.load(ResourceRoutes.ARTICLE_RESOURCES, this);
    }

    render() {
        return <div style={styles.root}>
                    <button onClick={this.paymentTrigger}>try paid content</button>
                    <ArticlePageHeader self_id={this.self_id} data={this.state.data}/>
                    <ContentArticle self_id={this.self_id} data={this.state.data}/>
                    <NextArticle self_id={this.self_id} data={this.state.data}/>
                </div>;
    }
}