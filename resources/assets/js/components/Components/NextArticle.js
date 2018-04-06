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
        top: '50%',
        transform: 'translate(0, -50%)',
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
        boxShadow: 'rgba(0, 0, 0, 0.3) 1em 1em 2em -0.2em',
        borderRadius: '0.2em',
        float: 'left',
        width: '6.4em',
        margin: '1.8em 2em 1em 1.8em',
        maxHeight: '6.4em',
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
        padding: '1.8em 0',
        maxWidth: '50%',
    },
    title: {
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
    text: {
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
    captionColorSwiper: {
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
};

class NextArticle extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {},
            loading: true,
        };
    }
    render() {
        const page_number = this.props.data.next_article ? this.props.data.next_article.page_number : '';
        const pages_count = this.props.data.issue ? this.props.data.issue.pages_count : '';
        const title = this.props.data.next_article ? this.props.data.next_article.title : '';
        const image_path = this.props.data.next_article ? this.props.data.next_article.image_path : '';

        return (
            <div>
                <div style={styles.item} key={title}>
                    <div style={styles.inner}>
                        <div style={styles.left}>
                            <div style={styles.url}>
                                <img style={styles.magLeft} src={image_path} alt={title} />
                            </div>
                        </div>
                        <div style={styles.right}>
                            <div style={styles.url}>
                                <h3 style={styles.title}>Следующая статья</h3>
                                <p style={styles.text}>{title}</p>
                                <div>
                                    <p style={styles.captionColorSwiper}>
                                        <span>{page_number}/</span>
                                        <span>{pages_count}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.bg}>
                        <img style={styles.imgBg} src="/images/header.jpg" alt={title} />
                        <div style={styles.mask} />
                    </div>
                </div>
            </div>
        );
    }
}

export default NextArticle;