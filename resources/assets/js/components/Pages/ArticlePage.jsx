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

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        return false;
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
        let stylesImg = 'img {max-width: 100%;}';
        content.push(
            <div key='mobile'>
                <ContentArticleMobile self_id={this.self_id} data={this.state.data} history={this.props.history} pageChanged={this.changedPage} />
                <style>{stylesImg}</style>
            </div>
        );

        return <div style={styles.root}>
                    {content}
                    <div style={styles.button}>
                        <button onClick={this.paymentTrigger}>try paid content</button>
                    </div>
                </div>;
    }
}