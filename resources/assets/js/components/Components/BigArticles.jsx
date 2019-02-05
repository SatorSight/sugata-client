import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination' ;
import SectionTitle from './SectionTitle';
import ProgressiveImage from '../Helpers/ProgressiveImage';
import { toRuMonthYearLocale, capitalize, empty, isMobile } from '../Helpers/SUtils';
import 'react-id-swiper/src/styles/css/swiper.css';
import { withStyles } from 'material-ui/styles';
import * as css from '../Helpers/cssConstants';
import PropTypes from 'prop-types';

const styles = {
    root: {
        position: 'relative',
        backgroundColor: '#FFF',
        width: '100%',
        overflowX: 'hidden'
    },
    issuesDesktop: {
        margin:'0 2%',
        float: 'left',
        overflow: 'hidden',
        width: '46%',
        position: 'relative'
    },
    swiper: {
        padding: '0 2.5em 0 1em',
        overflowX: 'none',
        maxWidth: '50em',
    },
    mainSwiper: {
        position: 'relative',
    },
    slideSwiper: {
        paddingRight: '1em',
        minHeight: '32em',
    },
    imgSwiper: {
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
        lineHeight: '1.3',
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
        const { articles, issue, classes } = this.props;
        const index = this.state.index;
        const dots_count = articles.length;

        return (
            <div className={isMobile() ? classes.sectionWrapper : classes.issuesDesktop}>
                <div className={classes.root}>
                    <SectionTitle
                        title={this.props.title || 'Темы номера'}
                        link_label={this.props.label || 'Список всех последних выпусков'}
                        link={this.props.link || '/'}
                        no_links={this.props.no_links}
                    />
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
                                    style={{
                                        width: 'auto',
                                        display: 'block',
                                    }}
                                >
                                    <ProgressiveImage
                                        src={article.image_path}
                                        preview={article.image_path_resized}
                                        style={styles.imgSwiper}
                                        alt={article.title}
                                        type={'div'}
                                    />
                                </Link>
                                <div className={classes.infoSwiper}>
                                    <Link
                                        onClick={this.linkClickHandler}
                                        draggable={false}
                                        to={`/issue/${article.issue_id}`}
                                        className={classes.imageLink}
                                    >
                                        <ProgressiveImage
                                            src={article.issue_cover}
                                            preview={article.issue_cover_resized}
                                            style={styles.magSwiper}
                                            alt={article.title}
                                        />
                                    </Link>
                                    <div className={classes.articleTitle}>
                                        <Link
                                            onClick={this.linkClickHandler}
                                            draggable={false}
                                            to={`/article/${article.id}`}
                                            className={classes.link}
                                        >
                                            {article.title}
                                            {/*{capitalize(article.title)}*/}
                                        </Link>
                                    </div>
                                    <div className={classes.articleSubtitle}>
                                        {article.journal_name}, {article.date}
                                        {/*{article.journal_name}, {!empty(issue) ? toRuMonthYearLocale(issue.content_date) :  article.date}*/}
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

BigArticles.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    //todo fix this, remove blank array instead of null presence
    issue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    link: PropTypes.string,
    label: PropTypes.string,
    no_links: PropTypes.bool,
};

export default withStyles(Object.assign({}, styles, css))(BigArticles);