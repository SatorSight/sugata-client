import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination' ;

import { toRuMonthYearLocale, capitalize } from '../Helpers/SUtils';


import 'react-id-swiper/src/styles/css/swiper.css';
import { withStyles } from 'material-ui/styles';

import * as css from '../Helpers/cssConstants';


const styles = {
    root: {
        position: 'relative',
        backgroundColor: '#FFF',
        width: '100%',
        overflowX: 'hidden'
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
        padding: '0 2.5em 0 1em',
        overflowX: 'none',
        maxWidth: '50em',
    },
    mainSwiper: {
        position: 'relative',
    },
    IssuesSwiper: {
        padding: 10,
    },
    slideSwiper: {
        paddingRight: '1em',
        minHeight: '32em',
    },
    imgSwiper: {
        width: 'auto',
        borderRadius: '0.5em',
        height: '20em',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 30%',
        backgroundSize: 'cover',
        display: 'block',
    },
    magSwiper: {
        width: '100%',
        float: 'left',
    },
    infoSwiper: {
        position: 'relative',
        padding: '1.5em 1em 1.1em 10em',
        height: '7em',
    },
    // textSwiper: {
    //     fontSize: '1.2em',
    //     marginBottom: '1em',
    // },
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
        // display: 'block',
        // fontWeight: 300,
        // letterSpacing: '0.1em',
        // background: 'linear-gradient(to right, rgba(104,216,181,1) 0%, rgba(113,133,238,1) 100%)',
        // color: '#FFF',
        // borderRadius: '1em',
        // padding: '0.3em 1em 0.1em',
        // fontSize: '0.9em',
        // textTransform: 'uppercase',
        // whiteSpace: 'nowrap',
        // textOverflow: 'ellipsis',
        // overflow: 'hidden',
        // float: 'left',
        // maxWidth: '98%',
    },
    captionLinkSwiper: {
        color: '#FFF',
    },
    imageLink: {
        display: 'block',
        width: '7em',
        boxShadow: '0 0 1em rgba(0,0,0,0.2)',
        borderRadius: '0.2em',
        position: 'absolute',
        left: '1em',
        bottom: '3em',
        overflow: 'hidden',
    },
    articleTitle: {
        ...css.articleBigTitle,
        marginBottom: '0.3em',
    },
    articleText: {
        ...css.bigArticleText,
        fontSize: '0.8em',
        lineHeight: 2,
    },
    articleSubtitle: {
        ...css.capsMediumText,
        marginBottom: '1em',
    },
};

let links_clickable = true;


class BigArticles extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            index: 0,
        };
    }

    linkClickHandler = (e) => {
        if(!links_clickable)
            e.preventDefault();
    };

    proxyChanger = (index, type) => {
        this.disableClicking();
        this.handleChangeIndex(index);
    };

    restoreClicking = () => links_clickable = true;
    disableClicking = () => links_clickable = false;
    handleChangeIndex = index => this.setState({ index });

    render() {
        const { articles, classes } = this.props;
        const index = this.state.index;
        const dots_count = articles.length;

        return (
            <div className={classes.sectionWrapper}>
                <div className={classes.root}>
                    <h1 className={classes.sectionTitle}>Темы номера</h1>
                        <SwipeableViews
                            className={classes.swiper}
                            index={index}
                            enableMouseEvents
                            onChangeIndex={this.proxyChanger}
                            onTransitionEnd={this.restoreClicking}
                        >
                            {articles.map(article =>
                                <div className={classes.slideSwiper} key={`main_topics_articles_${article.id}`}>
                                    <Link
                                        onClick={this.linkClickHandler}
                                        draggable={false}
                                        to={`/article/${article.id}`}
                                        className={classes.imgSwiper}
                                        style={{backgroundImage:`url('${article.image_path}')`}}
                                    />
                                    <div className={classes.infoSwiper}>
                                        <Link
                                            onClick={this.linkClickHandler}
                                            draggable={false}
                                            to={`/issue/${article.issue_id}`}
                                            className={classes.imageLink}
                                        >
                                            <img className={classes.magSwiper} src={article.issue_cover} alt={article.title} />
                                        </Link>
                                        <div className={classes.articleTitle}>
                                            <Link
                                                onClick={this.linkClickHandler}
                                                draggable={false}
                                                to={`/article/${article.id}`}
                                                className={classes.link}
                                            >
                                                {capitalize(article.title.toLowerCase())}
                                            </Link>
                                        </div>
                                        <div className={classes.articleSubtitle}>
                                            {article.journal_name}, {toRuMonthYearLocale(article.date)}
                                        </div>
                                        <div className={classes.articleText}>
                                            {article.text}...
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwipeableViews>
                    <Pagination dots={dots_count} index={index} onChangeIndex={this.handleChangeIndex} />
                </div>
            </div>
        );
    }
}

export default withStyles(Object.assign({}, styles, css))(BigArticles);