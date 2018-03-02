import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination' ;

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
        borderRadius: '0.5em',
        pointerEvents: 'none',
        height: '20em',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
    },
    magSwiper: {
        width: '7em',
        boxShadow: '0 0 1em rgba(0,0,0,0.4)',
        borderRadius: '0.2em',
        position: 'absolute',
        left: '1em',
        bottom: '3.6em',
    },
    infoSwiper: {
        position: 'relative',
        padding: '1.5em 2em 1em 10em',
        height: '7.6em',
    },
    textSwiper: {
        fontSize: '1.2em',
        lineHeight: 1.4,
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
    captionSwiperactive: {
        opacity: 1,
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
};

class SwiperMain extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <div style={styles.root}>
                <SwipeableViews style={styles.swiper} enableMouseEvents index={this.props.active} onChangeIndex={this.props.changer}>
                    {this.props.articles.map((article, i) =>
                        <div style={styles.slideSwiper} key={article.id}>
                            <div style={Object.assign({}, styles.imgSwiper, {backgroundImage:`url('${article.image_path}')` })} />
                            <div style={styles.infoSwiper}>
                                <img style={styles.magSwiper} src={article.issue_cover} alt={article.title} />
                                <p style={styles.textSwiper}>{article.title}</p>
                                <div>
                                    <p style={styles.captionColorSwiper}>
                                        <span>{article.journal_name}, </span>
                                        <span>{article.date}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </SwipeableViews>
                <Pagination dots={3} index={this.props.active} onChangeIndex={this.handleChangeIndex} />
            </div>
        );
    }
}

export default SwiperMain;