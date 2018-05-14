import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import * as SUtils from "../Helpers/SUtils";
import { Link } from 'react-router-dom'

const styles = {
    item: {
        margin: '0 0 1em 1.7em',
        display: 'block',
    },
    otherIssues: {
        position: 'relative',
        backgroundColor: '#F5F5F5',
        overflow: 'hidden',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        padding: '2em 3em 1em 1.4em',
        letterSpacing: 3.2,
    },
    imgOtherIssues: {
        borderRadius: '0.2em',
        boxShadow: '0.2em 0.2em 0.4em -0.2em rgba(0,0,0,0.2)',
        overflow: 'hidden',
        height: '15em',
        width: 'auto',
    },
    fot: {
        padding: '0.5em 2.5em 2em',
        textAlign: 'center',
        backgroundColor: '#F5F5F5',
        position: 'relative',
        zIndex: 20,
        clear: 'both',
    },
    button: {
        fontSize: '1.2em',
        paddingTop: '0.2em',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#000',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        display: 'block',
        fontWeight: 400,
        maxWidth: 400,
        margin: '0 auto',
        borderRadius: '2em',
        lineHeight: '3em',
        border: '1px solid #E0E0E0',
        backgroundColor: '#F5F5F5',
    },
};
export default class OtherIssues extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const issues = this.props.issues;
        const first_issue = SUtils.first(issues);
        const journal_id = SUtils.propOrNull(first_issue, 'journal_id');

        return (
            <div style={styles.otherIssues}>
                <p style={styles.title}>Другие выпуски</p>
                {SUtils.any(issues) ?
                    <OwlCarousel
                        autoWidth
                        lazyLoad
                        dots={false}>
                        {issues.map((issue, currentIndex) =>
                            <Link key={`other_issues_${issue.id}`} to={`/issue/${issue.id}`} style={styles.item}>
                                <div style={
                                    Object.assign({}, styles.imgOtherIssues, {
                                        background: `url(${issue.image_path})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'top center',
                                        minWidth: '11em'
                                    })
                                }></div>
                            </Link>
                        )}
                    </OwlCarousel> : null }
                <div style={styles.fot}>
                    <Link to={`/all_issues/journal/${journal_id}`} style={styles.button}>
                        Смотреть все
                    </Link>
                </div>
            </div>
        );
    }
}

