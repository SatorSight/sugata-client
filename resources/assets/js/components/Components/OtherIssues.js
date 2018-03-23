import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import * as SUtils from "../Helpers/SUtils";
import { Link } from 'react-router-dom'

const styles = {
    item: {
        marginLeft: '1.7em',
        paddingBottom: '1em',
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
        height: '12em',
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
        backgroundColor: '#F5F5F5',
    },
};
export default class OtherIssues extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const issues = this.props.issues;

        return (
            <div style={styles.otherIssues}>
                <p style={styles.title}>Другие выпуски</p>
                {SUtils.any(issues) ?
                    <OwlCarousel autoWidth dots={false}>
                        {issues.map((issue, currentIndex) =>
                            <div key={String(currentIndex)} style={styles.item} >
                                <Link key={issue.id} to={`/issue/${issue.id}`}>
                                    <img style={styles.imgOtherIssues} src={issue.image_path} alt={issue.number} />
                                </Link>
                            </div>
                        )}
                    </OwlCarousel> : null }
                <div style={styles.fot}>
                    <a href="#look" style={styles.button}>Смотреть все</a>
                </div>
            </div>
        );
    }
}

