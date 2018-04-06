import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import ArticlePageHeader from './ArticlePage/ArticlePageHeader';
import NextArticle from "../Components/NextArticle";
import ContentArticleDesktop from "./ArticlePage/ContentArticleDesktop";
import ContentArticleMobile from "./ArticlePage/ContentArticleMobile";
import { Link } from 'react-router-dom'

const styles = {
    root: {
        width: '100%',
        overflow: 'hidden',
    },
};
export default class ArticlePage extends Component {

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
                    <ArticlePageHeader self_id={this.self_id} data={this.state.data}/>
                    {content}
                    {nextArticle}
                </div>;
    }
}