import React, { Component } from "react";
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
        height: '12em',
        width: 'auto',
    },
};



export default class NewIssues extends Component {

    constructor(props){
        super(props);
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps === this.props;
    // }



    render() {
        let new_issues = this.props.data.new_issues;

        return (
            <div style={styles.otherIssues}>
                <p style={styles.title}>новые выпуски</p>
                {SUtils.any(new_issues) ?
                    <OwlCarousel autoWidth dots={false}>
                        {new_issues.map((issue, currentIndex) =>
                            <Link key={issue.id} to={`/issue/${issue.id}`} style={styles.item}>
                                <img style={styles.imgOtherIssues} src={issue.image_path} alt={issue.number} />
                            </Link>
                        )}
                    </OwlCarousel> : null }
            </div>
        );
    }
}