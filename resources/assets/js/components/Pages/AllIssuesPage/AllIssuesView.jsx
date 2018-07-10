import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import * as SUtils from "../../Helpers/SUtils";

import { withStyles } from 'material-ui/styles';
import { getResource } from '../../Helpers/dataComposer';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    bundles: getResource(state, 'bundles'),
    issues: getResource(state, 'issues'),
    title: getResource(state, 'title'),
});

const styles = {
    inner: {
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    h3: {
        fontSize: '1em',
        letterSpacing: 1,
        margin: '2.1em 0 1em 1.6em',
        textTransform: 'uppercase',
        color: '#000',
        fontWeight: 400,
        textAlign: 'left',
    },
    content: {
        display: 'block',
        overflow: 'hidden',
        textAlign: 'center',
    },
    item: {
        display: 'inline-block',
        width: '9em',
        margin: '1em 0.5em 1.2em',
        textAlign: 'center',
    },
    image:{
        overflow: 'hidden',
        position: 'relative',
        display: 'inline-block',
        boxShadow: '0.2em 0.2em 0.3em -0.1em rgba(0,0,0,0.3)',
        marginBottom: '0.8em',
        maxWidth: '100%',
    },
    img: {
        float: 'left',
        height: '8em',
        width: 'auto',
    },
    blur: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 100%)',
        opacity: 0.5,
    },
    name: {
        fontSize: '1.1em',
        lineHeight: 1.4,
        color: '#000',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
    },
    date: {
        fontSize: '1em',
        color: '#999',
        lineHeight: 1.2,
        fontWeight: 300,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
    },
};


class AllIssuesView extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.content}>
                    <h3 className={classes.h3}>{this.props.h3}</h3>
                    {this.props.issues.map(issue =>
                        <div key={`all_issues_${issue.id}`} className={classes.item}>
                            <Link to={`/issue/${issue.id}`} className={classes.link}>
                                <div className={classes.image}>
                                    <div className={classes.blur}></div>
                                    <img className={classes.img} src={issue.image_path} alt={issue.journal_name} />
                                </div>
                                <div className={classes.inner}>
                                    <p className={classes.name}>{issue.journal_name}</p>
                                    <p className={classes.date}>{SUtils.toRuMonthYearLocale(issue.content_date)}</p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(connect(mapStateToProps)(AllIssuesView));