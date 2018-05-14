import React, { PureComponent } from "react";
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination' ;
import * as SUtils from './../Helpers/SUtils';
import { Link } from 'react-router-dom'

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
        minHeight: 100,
    },
    imgSwiper: {
        width: 'auto',
        borderRadius: '0.5em',
        height: '20em',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        display: 'block',
    },
    magSwiper: {
        width: '100%',
        float: 'left',
    },
    infoSwiper: {
        position: 'relative',
        padding: '1.5em 2em 1em 10em',
        height: '7em',
    },
    textSwiper: {
        fontSize: '1.2em',
        lineHeight: 1.4,
        maxHeight: '4em',
        marginBottom: '1em',
        overflow: 'hidden',
        position: 'relative',
        display: 'block',
        color: '#000',
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
        boxShadow: '0 0 1em rgba(0,0,0,0.2)',
        borderRadius: '0.2em',
        position: 'absolute',
        left: '1em',
        bottom: '3em',
        overflow: 'hidden',
    }
};

let links_clickable = true;

class MainTopics extends PureComponent {

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
        const { index } = this.state;
        let content = [];
        let articles = this.props.data.main_topics;
        const dot = this.props.data.main_topics ? this.props.data.main_topics.length : '';
        if(SUtils.any(articles))
            articles.map(article => content.push(
                <div style={styles.slideSwiper} key={`main_topics_articles_${article.id}`}>
                    {article.image !== ''
                        ?   <Link
                            onClick={this.linkClickHandler}
                            draggable={false} to={`/article/${article.id}`} style={Object.assign({}, styles.imgSwiper, {backgroundImage:`url('${article.image_path}')` })} />
                        : null
                    }
                    <div style={styles.infoSwiper}>
                        <Link onClick={this.linkClickHandler} draggable={false} to={`/issue/${article.issue_id}`} style={styles.link}>
                            <img style={styles.magSwiper} src={article.issue_cover} alt={article.title} />
                        </Link>
                        <Link onClick={this.linkClickHandler} draggable={false} to={`/article/${article.id}`} style={styles.textSwiper}>
                            {article.title}
                        </Link>
                        <div>
                            <p style={styles.captionColorSwiper}>
                                <Link onClick={this.linkClickHandler} draggable={false} to={`/article/${article.id}`} style={styles.captionLinkSwiper}>
                                    {article.journal_name}
                                    </Link>,&nbsp;
                                <span>{article.date}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ));

        return (
            <div style={styles.root}>
                <h1 style={styles.title}>главные темы</h1>
                {SUtils.any(articles)
                    ? <SwipeableViews
                        style={styles.swiper}
                        index={index}
                        enableMouseEvents
                        onChangeIndex={this.proxyChanger}
                        onTransitionEnd={this.restoreClicking}
                    >
                        {content}
                    </SwipeableViews>
                    : null }
                <Pagination dots={dot} index={index} onChangeIndex={this.handleChangeIndex} />
            </div>
        );
    }
}

export default MainTopics;