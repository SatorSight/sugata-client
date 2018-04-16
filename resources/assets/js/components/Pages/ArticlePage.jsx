import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import ArticlePageHeader from './ArticlePage/ArticlePageHeader';
import NextArticle from "../Components/NextArticle";
import ContentArticleDesktop from "./ArticlePage/ContentArticleDesktop";
import ContentArticleMobile from "./ArticlePage/ContentArticleMobile";
import { Link } from 'react-router-dom'

import AuthorizableComponent from '../Helpers/AuthorizableComponent';

const styles = {
    root: {
        width: '100%',
        overflow: 'hidden',
    },
};

export default class ArticlePage extends AuthorizableComponent {

    constructor(props){
        super(props);

        console.log(this.authorized());
    }

    someAction = () => {
        console.log('some action');
        console.log(this.authorized());
        this.paymentTrigger();
    };

    render() {
        let content = [];
        let nextArticle = [];
        const article_desktop_html = this.state.data.article ? this.state.data.article.desktop_html : '';
        const next_article = this.state.data.next_article ? this.state.data.next_article.id : '';

        if(!next_article) {
            nextArticle.push(
                <NextArticle self_id={this.self_id} data={this.state.data} key={next_article} />
            );
        }
        else {
            nextArticle.push(
                <a href={`/article/${next_article}`} key={next_article}>
                    <NextArticle self_id={this.self_id} data={this.state.data}/>
                </a>
            );
        }

        if(!article_desktop_html || SUtils.isMobile(true)) {
            content.push(
                <div key='mobile'>
                    <ContentArticleMobile self_id={this.self_id} data={this.state.data}/>
                </div>
            );
        }
        else {
            content.push(
                <div key='desktop'>
                    <ContentArticleDesktop self_id={this.self_id} data={this.state.data}/>
                </div>
            );
        }

        return <div style={styles.root}>
                    <button onClick={this.someAction}>try paid content</button>
                    <ArticlePageHeader self_id={this.self_id} data={this.state.data}/>
                    {content}
                    {nextArticle}
                </div>;
    }
}