import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";

const styles = {
    root: {
        backgroundColor: '#FFF',
        position: 'relative',
        textAlign: 'center'
    },
    iframe: {
        border: 0,
        padding: 0,
        margin: 0,
    },
};



class ContentArticleDesktop extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {
        this._updateIframe();
    }
    shouldComponentUpdate(){
        return false;
    }
    _updateIframe() {
        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;

        let iframeHeight = document.documentElement.scrollHeight;
        let iframeWidth = document.documentElement.scrollWidth;

        const article_html = this.props.data.article ? this.props.data.article.html : '';
        const article_desktop_html = this.props.data.article ? this.props.data.article.desktop_html : '';
        let styles = '<style>img {max-width: 100%;}iframe{min-height: 100vh;}</style>';
        let html;

        html = (article_desktop_html!==null) ? article_desktop_html : article_html;
        document.body.innerHTML = styles + html;
        iframeWidth = (iframeWidth > 900) ? iframeWidth : 900;
        iframeHeight = (iframeHeight > 500) ? iframeHeight : 900;
        iframe.style.width=iframeWidth+'px';
        iframe.style.height=iframeHeight+'px';
    }

    render() {
        return (
            <div style={styles.root}>
                <iframe ref="iframe" style={styles.iframe} scrolling='no' />
            </div>
        )
    }
}

export default ContentArticleDesktop;