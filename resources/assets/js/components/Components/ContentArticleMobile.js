import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";

const styles = {
    root: {
        backgroundColor: '#FFF',
        position: 'relative',
        textAlign: 'center'
    },
    inner: {
        margin: 20,
    }
};


class ContentArticleMobile extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const article_title = this.props.data.article ? this.props.data.article.title : '';
        const article_html = this.props.data.article ? this.props.data.article.html : '';
        const article_desktop_html = this.props.data.article ? this.props.data.article.desktop_html : '';
        let html;
        html = (article_html!==null) ? article_html : article_desktop_html;
        // let newStyles = '<style>body p {margin: 0 0 20px; padding: 0; line-height: 1.5;} body div.imagec {margin: 15px auto 20px;} img {width: 100%; max-width: 640px; margin: 0 auto;}</style>';

        return (
            <div style={styles.root}>
                <h3>{article_title}</h3>
                <div style={styles.inner} id="content-mobile" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        );

    }
}

export default ContentArticleMobile;