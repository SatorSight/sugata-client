import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Article from './Article';
import * as SUtils from '../../../Helpers/SUtils';
import ListingMenu from './ListingMenu';
import IndexMenu from '../../../Components/IndexMenu';

const styles = {
    header: {
        width: '100%',
        // height: '100%',
        height: '4.7rem',
        position: 'relative',
        background: '#000',
        zIndex: 50,
    },
    item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
    },
    indexMenu:{
        position: 'absolute',
        left: '1em',
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
    },
    inner_header: {
        width: '100%',
        position: 'relative',
        zIndex: 20,
    },
    left: {
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0.1em -0.1em 0.3em',
        borderRadius: '0.2em',
        float: 'left',
        width: '5.6em',
        maxHeight: '6em',
        margin: '1em 1.2em -1em 4.6em',
    },
    magLeft: {
        width: '100%',
        float: 'left',
    },
    url: {
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
        maxHeight: '5em',
    },
    right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '7.4em',
        padding: '1.8em 0 1.3em',
        maxWidth: '50%',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 200,
        letterSpacing: 4,
        color: '#fff',
        marginBottom: '0.3em',
        lineHeight: 1.2,
    },
    captionColorSwiper: {
        display: 'inline',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.6em 0.2em 0.8em',
        fontSize: '0.9em',
        fontWeight: 200,
        letterSpacing: '0.2em',
        lineHeight: 1.6,
        textTransform: 'uppercase',
        border: '1px solid #FFF',
    },
    bg: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    imgBg: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        opacity: '0.3'
    },
    mask: {
        zIndex: 20,
        position: 'absolute',
        top: '-10%',
        left: 0,
        width: '80%',
        height: '200%',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.6,
        maxWidth:'30em',
    },
    shadow: {
        zIndex: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '15%',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
        opacity: 0.6,
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
    arrowNotLoading: {
        display: 'block',
        position: 'fixed',
        zIndex: 45,
        top: 0,
        bottom: 0,
    },
    arrowLoading: {
        display: 'none',
        position: 'fixed',
        zIndex: 45,
        top: 0,
        bottom: 0,
    },

    background: {
        position: 'fixed',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
        minHeight: '100vh',
        background:'#FFF',
    },

    root: {
        backgroundColor: '#FFF',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 20,
        // minHeight: '100vh',
        minHeight: 'calc(100vh - 12.7rem)',


        lineHeight: '1.7',
        fontFamily: 'serif',
        textAlign: 'left',
        fontSize: '1rem'
    },
    container: {
        textAlign: 'center',
    },
    notLoading: {
        display: 'none',
        zIndex: -10,
    },
    isLoading: {
        position: 'fixed',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background:'url("data:image/gif;base64,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") no-repeat 50% 20% #FFF',
        zIndex: 25,
    },

    pageMask: {
        position: 'fixed',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
        minHeight: '100vh',
        background:'rgba(0,0,0,0.5)',
    },

    //next article

    next_article_item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        minHeight: '8rem',
        zIndex: 50,
        cursor: 'pointer',
    },
    next_article_itemEnd: {
        display: 'none',
    },
    next_article_inner: {
        width: '100%',
        maxWidth: '34em',
        position: 'relative',
        zIndex: 40,
    },
    next_article_left: {
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.3) 1em 1em 2em -0.2em',
        borderRadius: '0.2em',
        float: 'left',
        width: '6.4em',
        margin: '1.8em 2em 1em 1.8em',
        maxHeight: '6.4em',
    },
    next_article_url: {
        display: 'block',
        // overflow: 'hidden',
    },
    next_article_magLeft: {
        width: '100%',
        float: 'left',
    },
    next_article_right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '26%',
        padding: '1.8em 0 0 0',
        maxWidth: '50%',
    },
    next_article_title: {
        fontSize: '1em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 200,
        letterSpacing: 3.2,
        color: '#fff',
        lineHeight: 1.2,
        opacity: 0.8,
        margin: '0 0 0.8em',
    },
    next_article_text: {
        fontSize: '1.2em',
        lineHeight: 1.5,
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        letterSpacing: 1.2,
        color: '#fff',
        maxHeight: '4em',
        overflow: 'hidden',
        margin: '0 0 1em',
        padding: 0,
    },
    next_article_captionColorSwiper: {
        display: 'inline',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.6em 0.2em 0.8em',
        margin: 0,
        fontSize: '0.9em',
        fontWeight: 200,
        letterSpacing: '0.2em',
        lineHeight: 1.8,
        textTransform: 'uppercase',
        border: '1px solid #FFF',
        opacity: 0.8,
    },
    next_article_off: {
        zIndex: 30,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: "#000",
    },
    next_article_imgBg: {
        zIndex: 10,
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: 0,
        width: '100%',
        opacity: '0.3'
    },
    url_title: {
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
        maxHeight: '5em',
        color: '#fff',
        padding: '0.1em'
    },
};

export default class Reader extends Component {

    constructor(props){
        super(props);

        this.state = {
            current: new Article(),
            prev: new Article(),
            next: new Article(),

            pages_loaded: 0,


            originalX: 0,
            originalY: 0,

            zIndexNext: 0,
            zIndexPrev: 0,

            indent: 0,


            all_articles: [],
            all_articles_ids: [],
        };

        this.minDistance = 100;
    }

    componentDidMount(){
        const article_data = this.props.article;

        let article = new Article(article_data.id, this);
        article.assemble(article_data);

        this.add_to_articles_array(article);

        this.setState({
            current: article,
            all_articles_ids: article_data.other_articles_ids
        }, this.load_side_articles);
    }

    update = () => this.forceUpdate();

    load_article = id => {
        let article = new Article(id, this);
        article.load();

        this.add_to_articles_array(article);

        const pages_loaded = this.state.pages_loaded + 1;
        this.setState({ pages_loaded }, () => {
            if(pages_loaded > this.props.page_load_limit)
                this.props.payment_trigger();
        });

        return article;
    };

    add_to_articles_array = article => {
        let all_articles = SUtils.clone_array(this.state.all_articles);
        all_articles.push(article);
        this.setState({ all_articles });
    };

    get_id_of = position => {
        const current_id = this.state.current.get_id();
        const id_index = this.state.all_articles_ids.indexOf(current_id);

        if(position === 'prev') {
            if (id_index < 1)
                return null;
        }else if(position === 'next'){
            if(id_index === this.state.all_articles_ids.length - 1)
                return null;
        }

        const index = position === 'prev' ? parseInt(id_index) - 1 : parseInt(id_index) + 1;

        return this.state.all_articles_ids[index];
    };

    get_prev_id = () => this.get_id_of('prev');
    get_next_id = () => this.get_id_of('next');

    get_article = id => {
        const article = this.state.all_articles.find(a => a.id === id);
        return id ? (article || this.load_article(id)) : null;
    };

    load_side_articles = () => {
        const prev_article = this.get_article(this.get_prev_id());
        const next_article = this.get_article(this.get_next_id());

        this.setState({
            prev: prev_article,
            next: next_article
        });
    };

    next_clicked = () => this.go_next();
    prev_clicked = () => this.go_prev();

    go_next = () => {
        this.scrollToArticleTop();
        if(this.state.next)
            this.change_current(this.state.next);
        else
            this.go_to_next_issue();
    };

    go_prev = () => {
        this.scrollToArticleTop();
        if(this.state.prev)
            this.change_current(this.state.prev);
        else
            this.go_to_prev_issue();
    };


    go_to_next_issue = () => {
        if(this.props.article.side_issues.next)
            window.location = `/issue/${this.props.article.side_issues.next.id}`;
        else
            window.location = `/journal/${this.props.journal.id}`
    };

    go_to_prev_issue = () => {
        if(this.props.article.side_issues.next)
            window.location = `/issue/${this.props.article.side_issues.next.id}`;
        else
            window.location = `/journal/${this.props.journal.id}`
    };


    change_current = new_current => this.setState({ current: new_current }, () => {
        this.props.history.push('/article/' + new_current.get_id());
        this.load_side_articles();
    });

    navigate = id => window.location = `/article/${id}`;

    current_page_is_last = () => {
        const article_id = this.state.current.get_id();
        return SUtils.last(this.state.all_articles_ids) === article_id;
    };

    current_page_is_first = () => {
        const article_id = this.state.current.get_id();
        return SUtils.first(this.state.all_articles_ids) === article_id;
    };



    _onTouchStart = (e) => {
        const touch = e.touches[0];
        this.setState({ originalX: touch.clientX });
        this.setState({ originalY: touch.clientY });
    };

    _onTouchMove = (e) => {
        let deltaX = Math.abs(this.state.originalX - e.changedTouches[0].clientX);
        let deltaY = Math.abs(this.state.originalY - e.changedTouches[0].clientY);

        const direction = (this.state.originalX - e.changedTouches[0].clientX) > 0 ? 'next' : 'prev';

        if(direction === 'next')
            this.setState({ zIndexNext: 10, zIndexPrev: 0 });
        else
            this.setState({ zIndexPrev: 10, zIndexNext: 0 });

        if (deltaX > this.minDistance && deltaY < this.minDistance) {
            const touch = e.changedTouches[0];
            let move = touch.clientX - this.state.originalX;

            this.setState({ indent: move });
            this.setState({ originalY: e.changedTouches[0].clientY});
        }
        else
            this.setState({ indent: 0 });
    };

    _onTouchEnd = (e) => {
        let deltaX = Math.abs(this.state.originalX - e.changedTouches[0].clientX);
        let deltaY = Math.abs(this.state.originalY - e.changedTouches[0].clientY);

        const direction = e.changedTouches[0].clientX - this.state.originalX < 0 ? 'next' : 'prev';

        if(this.current_page_is_last() && direction === 'next')
            this.go_next();
        else if(this.current_page_is_first() && direction === 'prev')
            this.go_prev();

        if (   deltaX > this.minDistance
            && deltaY < this.minDistance
            && !(this.current_page_is_last() && direction === 'next')
            && !(this.current_page_is_first() && direction === 'prev')
        ) {
            this.switch_article(direction)
        }else
            this.setState({ indent: 0 });
    };

    scrollToArticleTop = () => {
        const header_height = document.querySelector('.article-header').clientHeight;
        scrollTo(0, header_height);
    };

    switch_article = direction => {
        if(direction === 'next')
            this.go_next();
        else if(direction === 'prev')
            this.go_prev();

        this.setState({ indent: 0 });
    };

    render() {
        const stylesImg = 'img {max-width: 100%;}';
        const { journal, issue, article } = this.props;

        let current_page_number = null;
        let current_next_article_image_path = null;
        let current_next_article_page_number = null;
        let current_next_article_title = null;

        if(!this.state.current.get_loading()){
            const current = this.state.current;
            current_page_number = current.get_page_number();
            if(current.get_next_article()) {
                current_next_article_image_path = current.get_next_article().image_path;
                current_next_article_page_number = current.get_next_article().page_number;
                current_next_article_title = current.get_next_article().title;
            }
        }

        return (
            <div>
                <div className={'article-header'} style={styles.header}>
                    <div style={styles.item}>
                        <div style={styles.inner_header}>
                            <div style={styles.indexMenu}>
                                <IndexMenu payment_trigger={this.props.payment_trigger} auth_data={this.props.auth_data} data={{bundles: this.props.bundles}} />
                            </div>
                            <div>
                                <ListingMenu navigate={this.navigate} listing={this.props.listing}/>
                            </div>
                            <div style={styles.left}>
                                <Link  to={`/issue/${SUtils.propOrNull(article, 'issue_id')}`} style={styles.url}>
                                    <img style={styles.magLeft} src={SUtils.propOrNull(issue, 'image_path')} alt={SUtils.propOrNull(journal, 'name')} />
                                </Link>
                            </div>
                            <div style={styles.right}>
                                <div style={styles.url}>
                                    <h3 style={styles.title}>
                                        <Link  to={`/issue/${SUtils.propOrNull(article, 'issue_id')}`} style={styles.url_title}>
                                            &laquo;{SUtils.propOrNull(journal, 'name')}&raquo;
                                        </Link>
                                    </h3>
                                    <div>
                                        <p style={styles.captionColorSwiper}>
                                            <span>{current_page_number}/</span>
                                            <span>{SUtils.propOrNull(issue, 'pages_count')}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={styles.bg}>
                            <img style={styles.imgBg} src="/images/header.jpg" alt={SUtils.propOrNull(journal, 'name')} />
                            <div style={styles.mask} />
                            <div style={styles.shadow} />
                        </div>
                    </div>
                </div>
                <div><style>{stylesImg}</style></div>

                <div
                    onTouchStart={this._onTouchStart}
                    onTouchMove={this._onTouchMove}
                    onTouchEnd={this._onTouchEnd}
                    className={'html-root'}
                    style={Object.assign({},
                        styles.container,
                        styles.root,
                        {zIndex: 30 },
                        {left: this.state.indent + 'px'}
                        )}
                >
                    <div style={this.state.current.get_loading() ? styles.isLoading : styles.notLoading} />
                    {this.state.current ? this.state.current.render() : null}
                </div>
                <div
                    className={'html-root'}
                    style={Object.assign({},
                    styles.background,
                    styles.container,
                    {zIndex: this.state.zIndexPrev}
                )}>
                    {this.state.prev ? this.state.prev.render() : null}
                    <div style={styles.pageMask} />
                </div>
                 <div
                     className={'html-root'}
                     style={Object.assign({},
                     styles.background,
                     styles.container,

                     {zIndex: this.state.zIndexNext}
                )}>
                     {this.state.next ? this.state.next.render() : null}
                    <div style={styles.pageMask} />
                </div>

                <div onClick={this.next_clicked} style={{display: 'block'}}>
                    <div style={styles.next_article_item}>
                        <div style={styles.next_article_inner}>
                            <div style={styles.next_article_left}>
                                <div style={styles.next_article_url}>
                                    {this.state.next
                                        // next article image
                                        ? <img style={styles.next_article_magLeft} src={current_next_article_image_path} alt={current_next_article_title} />
                                        : this.props.article.side_issues.next
                                            // next issue cover
                                            ? <div>
                                                <img style={styles.next_article_magLeft}
                                                   src={this.props.article.side_issues.next.image_path}
                                                   alt={this.props.article.side_issues.next.name} />
                                            </div>
                                            // journal cover
                                            : <img style={styles.next_article_magLeft} src={SUtils.propOrNull(journal, 'image_path')} alt={SUtils.propOrNull(journal, 'name')} />
                                    }
                                </div>
                            </div>
                            <div style={styles.next_article_right}>
                                <div style={styles.next_article_url}>
                                    <h3 style={styles.next_article_title}>
                                        {this.state.next
                                            ? 'Следующая статья'
                                            : this.props.article.side_issues.next
                                                ? <div>
                                                    <div>Предыдущий выпуск</div>
                                                    <img style={{height: '3em', margin: '0.5em 0 0.5em 0'}} src={this.props.article.side_issues.next.logo_path} alt=""/>
                                                    <div>{SUtils.toRuMonthYearLocale(this.props.article.side_issues.next.content_date)}</div>
                                                </div>
                                                : `Журнал ${SUtils.propOrNull(journal, 'name')}`
                                        }
                                    </h3>
                                    <p style={styles.next_article_text}>{current_next_article_title}</p>
                                    {this.state.next ? <div>
                                        <p style={styles.next_article_captionColorSwiper}>
                                            <span>{current_next_article_page_number}/</span>
                                            <span>{SUtils.propOrNull(issue, 'pages_count')}</span>
                                        </p>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                        <div style={styles.next_article_off}>
                            <img style={styles.next_article_imgBg} src="/images/header.jpg" alt={current_next_article_title} />
                            <div style={styles.next_article_mask} />
                        </div>
                    </div>
                </div>

                {SUtils.isMobile()
                    ? null
                    : <div style={this.state.current.get_loading() ? styles.arrowLoading : styles.arrowNotLoading}>
                        <div style={styles.arrowNext} onClick={this.next_clicked}> </div>
                        <div style={styles.arrowPrev} onClick={this.prev_clicked}> </div>
                    </div>}
            </div>
        );
    }
}