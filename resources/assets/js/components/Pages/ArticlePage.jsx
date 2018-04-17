import React, { Component } from 'react';
import ContentArticleMobile from "./ArticlePage/ContentArticleMobile";
import { Link } from 'react-router-dom'

import AuthorizableComponent from '../Helpers/AuthorizableComponent';

const styles = {
    root: {
        width: '100%',
        overflow: 'hidden',
    },
    button: {
        display: 'block',
        position: 'relative',
        background: '#FFF',
        zIndex: 40,
        textAlign: 'center',
    }
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

    someAction = () => {
        console.log('some action');
        console.log(this.authorized());
        this.paymentTrigger();
    };

    changedPage = page => {
        const data = this.state.data;
        data.article.page_number = page;
        this.setState({data});
    };

    render() {

        let content = [];
        const article_desktop_html = this.state.data.article ? this.state.data.article.desktop_html : '';
        content.push(
            <div key='mobile'>
                <ContentArticleMobile self_id={this.self_id} data={this.state.data} history={this.props.history} pageChanged={this.changedPage} />
            </div>
        );
        // if(!article_desktop_html || SUtils.isMobile(true)) {
        //     content.push(
        //         <div key='mobile'>
        //             <ContentArticleMobile self_id={this.self_id} data={this.state.data} history={this.props.history} pageChanged={this.changedPage} />
        //         </div>
        //     );
        // }
        // else {
        //     content.push(
        //         <div key='desktop'>
        //             <ContentArticleDesktop self_id={this.self_id} history={this.props.history}  data={this.state.data} />
        //         </div>
        //     );
        // }

        return <div style={styles.root}>
                    {content}
                    <div style={styles.button}>
                        <button onClick={this.paymentTrigger}>try paid content</button>
                    </div>
                </div>;
    }
}