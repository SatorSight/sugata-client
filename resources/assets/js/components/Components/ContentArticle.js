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



class ContentArticle extends Component {
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
        let styles = '<style></style>';
        let html;
        if (SUtils.isMobile(true)) {
            styles = '<style>body {margin: 20px;} body p {margin: 0 0 20px; padding: 0; line-height: 1.5;} body div.imagec {margin: 15px auto 20px;} img {width: 100%; max-width: 640px; margin: 0 auto;}</style>';
            html = (article_html!==null) ? article_html : article_desktop_html;
            iframe.style.width='100%';
            iframeHeight = document.documentElement.scrollHeight;
            iframe.style.height=iframeHeight+'px';
            document.body.innerHTML = styles + html;
        }
        else {
            iframeWidth = (iframeWidth > 900) ? iframeWidth : 900;
            iframe.style.width=iframeWidth+'px';
            iframeHeight = document.documentElement.scrollHeight;
            iframe.style.height=iframeHeight+'px';
            html = (article_desktop_html!==null) ? article_desktop_html : article_html;
            document.body.innerHTML = styles + html;
        }
    }

    render() {
        return (
            <div style={styles.root}>
                <iframe ref="iframe" style={styles.iframe} scrolling='no' />
            </div>
        )

    }
    //     const article_title = this.props.data.article ? this.props.data.article.title : '';
    //     const article_html = this.props.data.article ? this.props.data.article.html : '';
    //     const article_desktop_html = this.props.data.article ? this.props.data.article.desktop_html : '';
    //     console.log(article_desktop_html);
    //     SUtils.isMobile();
    //     let content = [];
    //
    //     if(SUtils.isMobile(true))
    //         content.push(
    //             <div key='mobile'>
    //                 <h3>{article_title}</h3>
    //                 <div dangerouslySetInnerHTML={{ __html: article_html }} />
    //             </div>
    //         );
    //     else
    //         content.push(
    //             <div key='pc'>
    //                 <h3>{article_title}</h3>
    //                 <div dangerouslySetInnerHTML={{ __html: article_desktop_html }} />
    //             </div>
    //         );
    //
    //     return (
    //         <div style={styles.root}>
    //             {content}
    //         </div>
    //     );
    //
    // }
}

export default ContentArticle;