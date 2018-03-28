import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";

const styles = {
    item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        minHeight: '9.8em',
    },
    inner: {
        width: '100%',
        maxWidth: '34em',
        position: 'relative',
        zIndex: 20,
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
        top: '-50%',
        right: 0,
        width: '100%',
        opacity: '0.3'
    },
    mask: {
        zIndex: 20,
        position: 'absolute',
        left: '-50%',
        top: '-30%',
        width: '200%',
        height: '300%',
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.4,
    },
    left: {
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em',
        borderRadius: '0.2em',
        float: 'left',
        maxWidth: '19%',
        margin: '2em 2.2em 1em',
        maxHeight: '6.5em',
    },
    magLeft: {
        width: '100%',
        float: 'left',
    },
    url: {
        display: 'block',
        overflow: 'hidden',
    },
    right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '26%',
        padding: '1.6em 0',
        maxWidth: '50%',
    },
    title: {
        fontSize: '0.8em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 300,
        letterSpacing: 3.2,
        color: '#fff',
        opacity: 0.8,
        marginBottom: '0.8em',
    },
    text: {
        fontSize: '1em',
        lineHeight: 1.5,
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        letterSpacing: 1.2,
        color: '#fff',
        marginBottom: '0.5em',
    },
    captionColorSwiper: {
        display: 'inline',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.5em 0.2em 0.7em',
        fontSize: '0.9em',
        fontWeight: 200,
        letterSpacing: '0.2em',
        lineHeight: 1.5,
        textTransform: 'uppercase',
        border: '1px solid #FFF',
        opacity: 0.8,
    },
};

class NextIssueArticle extends Component {
    render() {
        let article = this.props.data.popular_articles;
        let index = 6;
        return (
            <div>
                {SUtils.any(article) ?
                    <div style={styles.item} key={article[index].id}>
                        <div style={styles.inner}>
                            <div style={styles.left}>
                                <a style={styles.url} href='#'>
                                    <img style={styles.magLeft} src={article[index].image_path} alt={article[index].name} />
                                </a>
                            </div>
                            <div style={styles.right}>
                                <a style={styles.url} href='#'>
                                    <h3 style={styles.title}>Следующая статья</h3>

                                    <p style={styles.text}>{article[index].title}</p>
                                    <div>
                                        <p style={styles.captionColorSwiper}>
                                            <span>{article[index].page_number}/</span>
                                            <span>24</span>
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div style={styles.bg}>
                            <img style={styles.imgBg} src={article[index].image_path} alt={article[index].title} />
                            <div style={styles.mask} />
                        </div>
                    </div> : null }
            </div>
        );
    }
}

export default NextIssueArticle;