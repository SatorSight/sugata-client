import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import * as SUtils from "../Helpers/SUtils";

const styles = {
    swiper: {
        backgroundColor: '#FFF',
        color: '#FFF',
        height: '17em',
        padding: '0.75em 0',
    },
    item: {
        margin: '0 -0.8em 0 1.65em',
        position: 'relative',
        borderRadius: '0.5em',
        overflow: 'hidden',
        width: '89vw',
        maxWidth: '40em',
        height: '17em',
    },
    imgSwiper: {
        width: '100%',
        pointerEvents: 'none',
        height: '17em',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
    },
    magSwiper: {
        width: '21%',
        boxShadow: '0 0 1em rgba(0,0,0,0.2)',
        pointerEvents: 'none',
        position: 'absolute',
        left: '3%',
        bottom: 50,
    },
    infoSwiper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 20,
    },
    titleSwiper: {
        fontSize: '0.85em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 300,
        textTransform: 'uppercase',
        letterSpacing: 2.5,
        padding: '1.3em 1.4em',
        opacity: 0.6,
    },
    title: {
        fontSize: '1.2em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 600,
        width: '60%',
        paddingTop: '0.1em',
    },
    textSwiper: {
        fontSize: '1em',
        lineHeight: 1.5,
        letterSpacing: '0.1em',
        fontWeight: 300,
        margin: '0.5em 0 0.7em',
        width: '80%',
    },
    shadowSwiper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '70%',
        zIndex: '10',
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
        display: 'inline',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.6em 0.2em',
        fontSize: '0.8em',
        lineHeight: 1.5,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        border: '1px solid #FFF',
        opacity: 0.6,
    },
    foot: {
        position: 'absolute',
        left: '1.2em',
        right: '1.2em',
        bottom: '3.5em',
        maxHeight: '4.5em',
        overflow: 'hidden',
    },
    page: {
        position: 'absolute',
        left: '1.1em',
        right: '1.2em',
        bottom: '1.2em',
    },
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        background: 'url("images/mask.png") no-repeat 50% 50%',
        backgroundSize: 'cover',
        zIndex: 10,
    },
};


export default class IssuesTheme extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let articles = this.props.data.main_topics;

        return (
            <div>
                {SUtils.any(articles) ?
                <OwlCarousel autoWidth dots={false} style={styles.swiper} >
                    {articles.map((article, currentIndex) =>
                        <div key={String(currentIndex)} style={styles.item} >
                                <div style={styles.mask} />
                                <div style={Object.assign({}, styles.imgSwiper, {backgroundImage:`url('${article.image_path}')` })} />
                                <div style={styles.infoSwiper}>
                                    <h3 style={styles.titleSwiper}>тема номера</h3>
                                    <div style={styles.foot}>
                                        <h3 style={styles.title}>{article.title}</h3>
                                        <p style={styles.textSwiper}>{article.text}</p>
                                    </div>
                                    <div style={styles.page}>
                                        <p style={styles.captionColorSwiper}>
                                            <span>{article.page_number} / </span>
                                            <span>{article.pages_count}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                    )}
                </OwlCarousel> : null }
            </div>
        );
    }
}