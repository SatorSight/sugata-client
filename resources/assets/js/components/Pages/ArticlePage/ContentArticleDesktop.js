import React, { Component } from 'react';
import * as SUtils from "../../Helpers/SUtils";
import NextArticle from "../ArticlePage/NextArticle";

const styles = {
    root: {
        backgroundColor: '#FFF',
        position: 'relative',
        textAlign: 'center'
    },
    iFrame: {
        border: 0,
        padding: 0,
        margin: 0,
    },
    onLoading: {
        display: 'none',
        zIndex: -10,
    },
    offLoading: {
        position: 'fixed',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background:'url("data:image/gif;base64,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") no-repeat 50% 20% #FFF',
        zIndex: 25,
    },
    arrowOnLoading: {
        display: 'block',
        position: 'fixed',
        zIndex: 45,
        top: 0,
        bottom: 0,
    },
    arrowOffLoading: {
        display: 'none',
        position: 'fixed',
        zIndex: 45,
        top: 0,
        bottom: 0,
    },
    arrowNext: {
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '2em',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABQCAMAAABhw6aVAAAA/1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAD+/v4AAAAAAAAAAAABAQEAAAAAAAACAgIAAABISEjm5ubLy8tvb28AAAAAAAAAAAAAAAAAAABvb2+YmJjx8fHf398AAADe3t4AAAACAgIAAAAAAADw8PAAAAAAAAD8/PxcXFzq6ur5+fl0dHS9vb0xMTHu7u4AAADPz89NTU3j4+OFhYXf39+RkZFlZWXg4ODPz88AAAD9/f2SkpLS0tLo6OhnZ2dMTExzc3Pz8/P7+/t6enrFxcXd3d3s7OwkJCSfn596enqzs7NOTk7///9xkL06AAAAVHRSTlMAEQYFBAcMAQIDCg4I/BMZ/RgdFiEfQCYvXNayPDg7KTFEblDKoSOiNSwrIM0nJfUw0+Q5aSHES7BVn16WVHS6qjf4QJGsSihr2O9kiHjSR3oyVzuAcDhhAAACvklEQVRYw83XaXOiMBgHcLlBUyjgwXar6FYjaFfdVdvaY3tup9374Pt/lk04NHaBBDrTaV77myeJSXj+lUrpoSjqZiiKwkg0TRQFQRBFTcOMxSAi8BIAQJJ4QcSMilREJFCtyngAEDKFbnhQlWscp+s6V5OrEl0hJABE7Nvh3uWfpY0Y4GkKFZKqNc78/jEIgpvz34bOURUqxAOZsxfYBMHO6dywqUpRcSF7+XkaomD3dG5RFUYyZ876u0GsBvtUpeBt0I3ZUYJYVISsyfmXgFRmrkrQ/aYUXSlqOD3onH0g1HC/kaeijTDgyPvKrhDi0ZZb77udB2YVnSI0P99rPuyxrgsfIxmVmjjt5jtWFZXi7AaaYO+JypxhdDXQXozdp2qYr9Dx0wspfN2FUNVTlFVCDUqqxoupcusavmitkjtvP0OpJZSQcgzz1oXew5osicXUYG7o4QSVSgF1N0MTRKWUSrbCD8DxJ0I9HuBSaFWVDIUfgJbT6ZFquljaNcCnoUjhq1wfbZeaLuo2V0WLyvo2SvjVcLcfqMcLaOJF0dDWA3r3NxsR0yOf6p2r+9E4a3rERlwcEnVOVl3XytgIYsu3zNtV24EZW078uQdb5k2n6zbS/9xs0/R8mH6Mcsy1D9MPbI5pO630q8Fg/ruEpOlnGa2ISX/EnmsOX7HpvzJDfKiLmaglYDeb5oN534g2p0CddUN1e8Ru1q0b2Y7STNIkko0v1STtKNFi003S+LbWzfxJdOfyG9+4W45jAzbXNJM089D/FgaUq1XTo5okNqBe7+xy+uPXz47nT+ixIQooFkTfleNex+u6kCWghFHIRMp3HN9t1ekmCV26aY0hnMC6xRK6NvHONNAw2eLdJkjqcZCkm/DihpE1TKyYMETWWPESDseANRyTMRzncJXFYBUGfg3ndtbAH7tk0H/8DxSbL2r9DGaMAAAAAElFTkSuQmCC") no-repeat 50% 50% rgba(0,0,0,0.1)',
        backgroundSize: '1.6em auto',
        cursor: 'pointer',
    },
    arrowPrev: {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '2em',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABQCAMAAABhw6aVAAAA/1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAD+/v4AAAAAAAAAAAABAQEAAAAAAAACAgIAAABISEjm5ubLy8tvb28AAAAAAAAAAAAAAAAAAABvb2+YmJjx8fHf398AAADe3t4AAAACAgIAAAAAAADw8PAAAAAAAAD8/PxcXFzq6ur5+fl0dHS9vb0xMTHu7u4AAADPz89NTU3j4+OFhYXf39+RkZFlZWXg4ODPz88AAAD9/f2SkpLS0tLo6OhnZ2dMTExzc3Pz8/P7+/t6enrFxcXd3d3s7OwkJCSfn596enqzs7NOTk7///9xkL06AAAAVHRSTlMAEQYFBAcMAQIDCg4I/BMZ/RgdFiEfQCYvXNayPDg7KTFEblDKoSOiNSwrIM0nJfUw0+Q5aSHES7BVn16WVHS6qjf4QJGsSihr2O9kiHjSR3oyVzuAcDhhAAACvklEQVRYw83XaXOiMBgHcLlBUyjgwXar6FYjaFfdVdvaY3tup9374Pt/lk04NHaBBDrTaV77myeJSXj+lUrpoSjqZiiKwkg0TRQFQRBFTcOMxSAi8BIAQJJ4QcSMilREJFCtyngAEDKFbnhQlWscp+s6V5OrEl0hJABE7Nvh3uWfpY0Y4GkKFZKqNc78/jEIgpvz34bOURUqxAOZsxfYBMHO6dywqUpRcSF7+XkaomD3dG5RFUYyZ876u0GsBvtUpeBt0I3ZUYJYVISsyfmXgFRmrkrQ/aYUXSlqOD3onH0g1HC/kaeijTDgyPvKrhDi0ZZb77udB2YVnSI0P99rPuyxrgsfIxmVmjjt5jtWFZXi7AaaYO+JypxhdDXQXozdp2qYr9Dx0wspfN2FUNVTlFVCDUqqxoupcusavmitkjtvP0OpJZSQcgzz1oXew5osicXUYG7o4QSVSgF1N0MTRKWUSrbCD8DxJ0I9HuBSaFWVDIUfgJbT6ZFquljaNcCnoUjhq1wfbZeaLuo2V0WLyvo2SvjVcLcfqMcLaOJF0dDWA3r3NxsR0yOf6p2r+9E4a3rERlwcEnVOVl3XytgIYsu3zNtV24EZW078uQdb5k2n6zbS/9xs0/R8mH6Mcsy1D9MPbI5pO630q8Fg/ruEpOlnGa2ISX/EnmsOX7HpvzJDfKiLmaglYDeb5oN534g2p0CddUN1e8Ru1q0b2Y7STNIkko0v1STtKNFi003S+LbWzfxJdOfyG9+4W45jAzbXNJM089D/FgaUq1XTo5okNqBe7+xy+uPXz47nT+ixIQooFkTfleNex+u6kCWghFHIRMp3HN9t1ekmCV26aY0hnMC6xRK6NvHONNAw2eLdJkjqcZCkm/DihpE1TKyYMETWWPESDseANRyTMRzncJXFYBUGfg3ndtbAH7tk0H/8DxSbL2r9DGaMAAAAAElFTkSuQmCC") no-repeat 50% 50% rgba(0,0,0,0.1)',
        backgroundSize: '1.6em auto',
        cursor: 'pointer',
        transform: ' scale(-1, 1)',
    },
};



class ContentArticleDesktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            originalX: 0,
            originalY: 0,
            zIndexPrev: 0,
            zIndexCurrent: 0,
            zIndexNext: 0,
            htmlPrev: 0,
            htmlCurrent: 0,
            htmlNext: 0,
            isLoading: true,
            allPage: [],
            numberArticle: 0,
            pageNumber: 0,
            idArticle: 0,
            redirectToReferrer: false,
        };
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


        const article_html = this.props.data.article ? this.props.data.article.html : '';
        const article_desktop_html = this.props.data.article ? this.props.data.article.desktop_html : '';
        let styles = '<style>img {max-width: 100%;}iframe{min-height: 100vh;}</style>';
        let html;

        html = (article_desktop_html!==null) ? article_desktop_html : article_html;
        document.body.innerHTML = styles + html;

        let iframeHeight = document.documentElement.scrollHeight;
        let iframeWidth = document.documentElement.scrollWidth;
        // console.log(iframeHeight+' iframeHeight');
        // console.log(iframeWidth+' iframeWidth');

        iframeWidth = (iframeWidth > 900) ? iframeWidth : 900;
        iframeHeight = (iframeHeight > 500) ? iframeHeight : 900;
        iframe.style.width=iframeWidth+'px';
        iframe.style.height=iframeHeight+'px';
    }
    changedPageNext = () => {
        console.log('changedPageNext');
    };
    changedPagePrev = () => {
        console.log('changedPagePrev');
    };

    render() {
        const next_article = this.props.data.next_article ? this.props.data.next_article.id : '';
        const nextArticle = !next_article ?  <div style={{display: 'block', background: 'url(/images/header.jpg) no-repeat 50% 50%', backgroundSize: 'cover', color: '#FFF', textAlign: 'center', position: 'relative', zIndex: 50, padding: '1em 0 4em'}}>&nbsp;</div> : <div onClick={this.changedPageNext} style={{display: 'block'}} key={`article.${next_article.id}`}><NextArticle self_id={this.self_id} data={this.props.data}/></div> ;
        const arrow = SUtils.isMobile(true) ? '' : <div style={this.state.isLoading ? styles.arrowOnLoading : styles.arrowOffLoading}><div style={styles.arrowNext} onClick={this.changedPageNext}> </div> <div style={styles.arrowPrev} onClick={this.changedPagePrev}> </div></div>;

        return (
            <div style={styles.root}>
                <div style={this.state.isLoading ? styles.onLoading : styles.offLoading} />
                <iframe ref="iframe" style={styles.iFrame} scrolling='no' />
                {nextArticle}
                {arrow}
            </div>
        )
    }
}

export default ContentArticleDesktop;