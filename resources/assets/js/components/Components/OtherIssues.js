import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import * as SUtils from "../Helpers/SUtils";

const styles = {
    item: {
        marginLeft: '2.5em',
        paddingBottom: '1em',
    },
    otherIssues: {
        position: 'relative',
        backgroundColor: '#F5F5F5',
        overflow: 'hidden',
    },
    title: {
        fontSize: '1.5em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        padding: '3.8em 3em 1.3em 1.6em',
        letterSpacing: 3.5,
    },
    imgOtherIssues: {
        borderRadius: '0.2em',
        boxShadow: '0.1em 0.1em 0.3em rgba(0,0,0,0.3)',
        overflow: 'hidden',
        height: '10em',
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
        let new_issues = this.props.data.new_issues;
        return (
            <div style={styles.otherIssues}>
                <p style={styles.title}>Другие выпуски</p>
                {SUtils.any(new_issues) ?
                    <OwlCarousel autoWidth dots={false} >
                        {new_issues.map((issue, currentIndex) =>
                            <div key={String(currentIndex)} style={styles.item} >
                                <a href={'#'}>
                                    <img style={styles.imgOtherIssues} src={issue.image_path} alt={issue.number} />
                                </a>
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

