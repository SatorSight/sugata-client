import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import { toRuMonthYearLocale } from '../Helpers/SUtils';
import { withStyles } from 'material-ui/styles';
import SectionTitle from './SectionTitle';

import * as css from '../Helpers/cssConstants';

const styles = {
    issuesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    imageContainer: {
        height: '15.5em',
        minWidth: '8em',
    },
    image: {
        height: '11em',
        boxShadow: '5px 5px 8px 0px rgba(0,0,0,0.21)',
    },
    imageDiv: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.8em',
    },
    titles: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 1em'
    },
    otherLink: {
        fontWeight: 500,
        textAlign: 'right',
        display: 'flex',
        height: '5rem',

    },
    arrow: {
        borderRight: '0.15rem solid black',
        borderBottom: '0.15rem solid black',
        width: '0.6rem',
        height: '0.6rem',
        transform: 'rotate(-45deg)',
        marginLeft: '0.5rem',
        marginTop: '0.33rem',
    },
    border: {
        borderBottom: '0.2rem solid black',
        paddingTop: '1.5rem',
        width: '100rem',
        position: 'absolute',
    },
    labels: {
        textAlign: 'center',
        color: 'black',
        marginTop: '0.5em',
    },
    journalName: {
        fontWeight: 'bold',
        fontSize: '1.2em',
        width: '75%',
        margin: '0 auto',
    },
    journalDate: {
        ...css.capsMediumText,
        // fontFamily: 'Montserrat',
        // fontSize: '0.8em',
        // textTransform: 'uppercase',
    },
};

class NewIssues extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const { classes, count } = this.props;
        const issues = this.props.issues.slice(0, count);
        return (
            <div className={classes.sectionWrapper}>
                <SectionTitle
                    title={this.props.title || 'Новые выпуски'}
                    link_label={this.props.label || 'Список всех последних выпусков'}
                    link={this.props.link || '/'}
                />
                <div className={classes.issuesContainer}>
                    {issues.map((issue, currentIndex) =>
                        <Link key={`new_issues_${issue.id}`} to={`/issue/${issue.id}`} className={classes.item}>
                            <div className={classes.imageContainer}>
                                <div className={classes.imageDiv}>
                                    <img className={classes.image} src={issue.image_path} alt=""/>
                                </div>
                                <div className={classes.labels}>
                                    <div className={classes.journalName}>{issue.journal_name}</div>
                                    <div className={classes.journalDate}>{toRuMonthYearLocale(issue.content_date)}</div>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(Object.assign({}, styles, css))(NewIssues);