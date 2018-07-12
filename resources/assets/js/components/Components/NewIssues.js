import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import { toRuMonthYearLocale } from '../Helpers/SUtils';
import { withStyles } from 'material-ui/styles';
import SectionTitle from './SectionTitle';
import ProgressiveImage from './../Helpers/ProgressiveImage';
import PropTypes from 'prop-types';

import * as css from '../Helpers/cssConstants';

const styles = {
    issuesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    imageContainer: {
        height: '15.5em',
        minWidth: '30%',
        width: '33%',
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
                    no_links={this.props.no_links}
                />
                <div className={classes.issuesContainer}>
                    {issues.map((issue, currentIndex) =>
                        <div key={`new_issues_${issue.id}`} className={classes.imageContainer}>
                            <Link to={`/issue/${issue.id}`} className={classes.item}>
                                <div className={classes.imageDiv}>
                                    <ProgressiveImage
                                        src={issue.image_path}
                                        preview={issue.image_path_resized}
                                        className={classes.image}
                                        alt={issue.name}
                                    />
                                </div>
                                <div className={classes.labels}>
                                    <div className={classes.journalName}>{issue.journal_name}</div>
                                    <div className={classes.journalDate}>{toRuMonthYearLocale(issue.content_date)}</div>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

NewIssues.propTypes = {
    issues: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    link: PropTypes.string,
    label: PropTypes.string,
    no_links: PropTypes.bool,
    classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(Object.assign({}, styles, css))(NewIssues);