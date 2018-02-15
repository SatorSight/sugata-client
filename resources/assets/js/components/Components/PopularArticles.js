import React, { Component } from 'react';
import * as SUtils from './../Helpers/SUtils';
import sKey from './../Helpers/sKey';


const styles = {
    main: {
        padding: '0 1em',
    },
    tabs: {
        background: '#fff',
    },
    item: {
        padding: '0.5em 0 1.3em',
        position: 'relative',
    },
    ava: {
        position: 'absolute',
        left: 0,
        top: '0.5em',
        borderRadius: '0.5em',
        width: '6.5em',
        height: '6.5em',
        overflow: 'hidden',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        boxShadow: '0.2em 0.2em 0.8em rgba(0,0,0,0.3)',
    },
    inner: {
        marginLeft: '8.5em',
        height: '6.5em',
    },
    over: {
        position: 'relative',
        overflow: 'hidden',
    },
    caption: {
        display: 'inline',
        background: 'linear-gradient(to right, rgba(104,216,181,1) 0%, rgba(113,133,238,1) 100%)',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.3em 1em 0.1em',
        fontSize: '0.9em',
        textTransform: 'uppercase',
        fontWeight: 300,
    },
    title: {
        fontSize: '1.2em',
        lineHeight: 1.4,
        marginBottom: '0.5em',
        maxHeight: '4em',
        color: '#333',
        overflow: 'hidden',
        position: 'relative',
        width: '70%',
        fontWeight: 400,
    },
    fot: {
        padding: '0.5em 0 2em',
        textAlign: 'center',
        position: 'relative',
        zIndex: 20,
        clear: 'both',
    },
    button: {
        fontSize: '1.2em',
        paddingTop: '0.2em',
        letterSpacing: 1,
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: '#000',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        display: 'block',
        fontWeight: 400,
        maxWidth: 400,
        margin: '0 auto',
        borderRadius: '2em',
        lineHeight: '3em',
        border: '1px solid #E0E0E0',
    },
};

class PopularArticles extends Component {

    constructor(props){
        super(props);
    }

    loadMore = () => this.props.controls['more_popular_articles']();

    render() {
        const articles = this.props.data.popular_articles;

        return (
            <div>
                <div style={styles.main}>
                    {SUtils.any(articles) ? articles.map(article =>
                        <div style={styles.item} key={sKey('pa')}>
                            <div style={Object.assign({}, styles.ava, {backgroundImage:'url(' + article.image_path + ')' })} />
                            <div style={styles.inner}>
                                <div style={styles.over}>
                                    <p style={styles.title}>{article.title}</p>
                                </div>
                                <div>
                                    <p style={styles.caption}>
                                        <span>{article.title}, </span>
                                        <span>{article.date}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null }
                    <div style={styles.fot}>
                        <a onClick={this.loadMore} style={styles.button}>Загрузить еще</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopularArticles;