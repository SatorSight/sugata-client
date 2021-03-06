import React, { PureComponent } from "react";
import OwlCarousel from 'react-owl-carousel';
import * as SUtils from './../Helpers/SUtils';
import { Link } from 'react-router-dom'

const styles = {
    item: {
        margin: '0 1em 1em',
        display: 'block',
    },
    otherIssues: {
        position: 'relative',
        overflow: 'hidden',
        height: '20em'
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        padding: '2.41em 0 1.3em',
        letterSpacing: 3.2,
        textAlign: 'center',
    },
    imgOtherIssues: {
        borderRadius: '0.2em',
        boxShadow: '0.2em 0.2em 0.4em -0.2em rgba(0,0,0,0.2)',
        overflow: 'hidden',
        height: '14em',
        width: 'auto',
    },
};



export default class NewIssues extends PureComponent {

    constructor(props){
        super(props);
    }

    render() {
        let new_issues = this.props.data.new_issues;

        return (
            <div style={styles.otherIssues}>
                <p style={styles.title}>новые выпуски</p>
                {SUtils.any(new_issues) ?
                    <OwlCarousel
                        lazyLoad
                        autoWidth
                        dots={false}>
                        {new_issues.map((issue, currentIndex) =>
                            <Link key={`new_issues_${issue.id}`} to={`/issue/${issue.id}`} style={styles.item}>
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
            </div>
        );
    }
}