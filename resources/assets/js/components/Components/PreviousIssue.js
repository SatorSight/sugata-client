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
        backgroundColor: '#000',
    },
    imgBg: {
        zIndex: 10,
        position: 'absolute',
        top: '-2%',
        right: '-15%',
        width: '130%',
        opacity: '0.15',
        filter: 'grayscale(100%)',
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
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em -0.2em',
        borderRadius: '0.2em',
        float: 'left',
        maxWidth: '24%',
        margin: '-1em 2em 0',
        height: '10.8em',
    },
    magLeft: {
        width: '100%',
        float: 'left',
    },
    url: {
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
    },
    right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '26%',
        padding: '1.6em 0',
        maxWidth: '50%',
    },
    title: {
        fontSize: '0.9em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 300,
        letterSpacing: 1.8,
        color: '#fff',
        marginBottom: '1.5em',
    },
    logo: {
        maxHeight: '2.2em',
        marginBottom: '0.8em',
        width: 'auto',
        lineHeight: '3em',
        color: '#fff',
        fontWeight: 600,
    },
    date: {
        fontSize: '0.8em',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        letterSpacing: 2,
        color: '#fff'
    },
};

class PreviousIssue extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const issue = this.props.issue;
        return (
            <div>
                {issue ?
                    <div style={styles.item} key={issue.id}>
                        <div style={styles.inner}>
                            <div style={styles.left}>
                                <a style={styles.url} href={issue.url_prefix}>
                                    <img style={styles.magLeft} src={issue.image_path} alt={issue.journal_name} />
                                </a>
                            </div>
                            <div style={styles.right}>
                                <a style={styles.url} href={issue.url_prefix}>
                                    <h3 style={styles.title}>предыдущий выпуск</h3>
                                    <img style={styles.logo} src={issue.logo_path} alt={issue.name} />
                                    <p style={styles.date}>{issue.created_at}</p>
                                </a>
                            </div>
                        </div>
                        <div style={styles.bg}>
                            <img style={styles.imgBg} src={issue.image_path} alt={issue.journal_name} />
                            <div style={styles.mask} />
                        </div>
                    </div> : null }
            </div>
        );
    }
}

export default PreviousIssue;