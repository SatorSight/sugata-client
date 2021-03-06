import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination' ;
import { Link } from 'react-router-dom';
import * as SUtils from "../Helpers/SUtils";


const styles = {
    root: {
        position: 'relative',
        backgroundColor: '#FFF',
        width: '100%',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontWeight: 400,
        padding: '2.41em 0 1.3em',
        letterSpacing: '0.15em',
        textAlign: 'center',
    },
    swiper: {
        padding: '1em 2.5em 0 1em',
        overflowX: 'none',
        maxWidth: '50em',
    },
    mainSwiper: {
        position: 'relative',
    },
    slideSwiper: {
        paddingRight: '1em',
        minHeight: 100,
    },
    imgSwiper: {
        width: 'auto',
        display: 'block',
        borderRadius: '0.5em',
        height: '20em',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 30%',
        backgroundSize: 'cover',
    },
    infoSwiper: {
        position: 'relative',
        padding: '1.5em 2em 1em 10em',
        height: '7.6em',
    },
    textSwiper: {
        fontSize: '1.2em',
        lineHeight: 1.4,
        color: '#000',
        display: 'block',
        maxHeight: '4em',
        marginBottom: '1em',
        overflow: 'hidden',
        position: 'relative',
    },
    ulSwiper: {
        overflowX: 'hidden'
    },
    captionSwiper: {
        overflow: 'hidden',
        width: '100%',
        margin: '1em 0',
        opacity: 0,
    },
    captionColorSwiper: {
        display: 'block',
        fontWeight: 300,
        letterSpacing: '0.1em',
        background: 'linear-gradient(to right, rgba(104,216,181,1) 0%, rgba(113,133,238,1) 100%)',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.3em 1em 0.1em',
        fontSize: '0.9em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        float: 'left',
        maxWidth: '98%',
    },
    captionLinkSwiper: {
        color: '#FFF',
    },
    link: {
        display: 'block',
        width: '7em',
        boxShadow: '0 0 1em rgba(0,0,0,0.4)',
        borderRadius: '0.2em',
        position: 'absolute',
        left: '1em',
        bottom: '3.6em',
        overflow: 'hidden',
    },
    magSwiper: {
        width: '100%',
        float: 'left',
    },
};

let links_clickable = true;

class SwiperMain extends React.Component {

    constructor(props){
        super(props);
    }

    linkClickHandler = (e) => {
        if(!links_clickable)
            e.preventDefault();
    };

    proxyChanger = (index, type) => {
        this.disableClicking();
        this.props.changer(index, type);
    };

    restoreClicking = () => links_clickable = true;
    disableClicking = () => links_clickable = false;

    getArticleIssue = article => this.props.issues.find(issue => issue.id === article.issue_id);

    renderSlide = () => {
        let slides = [];
        {this.props.articles.map((article, i) => {
            if(article) {
                const issue = this.getArticleIssue(article);
                slides.push(
                    <div style={styles.slideSwiper} key={article.id}>
                        <Link
                            onClick={this.linkClickHandler}
                            draggable={false}
                            to={`/article/${article.id}`}
                            style={Object.assign({}, styles.imgSwiper, {backgroundImage: `url('${article.image_path}')`})} />
                        <div style={styles.infoSwiper}>
                            {!SUtils.empty(issue)
                                ? <Link
                                    onClick={this.linkClickHandler}
                                    draggable={false}
                                    to={`/issue/${issue.id}`} style={styles.link}>
                                      <img style={styles.magSwiper} src={issue.image_path} alt={article.title}/>
                                  </Link>
                                : null}
                            <Link onClick={this.linkClickHandler}
                                  draggable={false}
                                  to={`/article/${article.id}`} style={styles.textSwiper}>
                                {article.title}
                            </Link>
                            <div>
                                <p style={styles.captionColorSwiper}>
                                    <Link onClick={this.linkClickHandler}
                                          draggable={false}
                                          to={`/article/${article.id}`} style={styles.captionLinkSwiper}>
                                        {article.journal_name}
                                    </Link>,&nbsp;
                                    <span>{article.date}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        })}

        return slides;
    };

    render() {
        const dot = this.props.articles ? this.props.articles.length : '';
        return (
            <div style={styles.root}>
                <SwipeableViews
                    style={styles.swiper}
                    enableMouseEvents
                    index={this.props.active}
                    onChangeIndex={this.proxyChanger}
                    onTransitionEnd={this.restoreClicking}
                >
                    {this.renderSlide()}
                </SwipeableViews>
                <Pagination dots={dot} index={this.props.active} onChangeIndex={this.props.changer} />
            </div>
        );
    }
}

export default SwiperMain;