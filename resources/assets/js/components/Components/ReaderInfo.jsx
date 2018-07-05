import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import { toRuMonthYearLocale } from '../Helpers/SUtils';

const block = {
    margin: '0 0.5em',
};

const styles = {
    info: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '0.5em 1em',
        background: 'white',
        position: 'relative',
        zIndex: 60,
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
    },
    journalName: {
        ...block,
    },
    issueDate: {
        ...block,
    },
    page: {
        ...block,
    },
    divider: {
        ...block,
        opacity: 0.5,
    },
};

class ReaderInfo extends PureComponent {
    constructor(props){

        /*
        * journal_name
        * issue_date
        * pages_count
        * current_page
        * */

        super(props);
    }

    render() {
        const { journal_name, issue_date, pages_count, current_page, classes } = this.props;

        return (
            <div className={classes.info}>
                <div className={classes.journalName}>
                    {journal_name}
                </div>
                <div className={classes.divider}>|</div>
                <div className={classes.issueDate}>
                    {toRuMonthYearLocale(issue_date)}
                </div>
                <div className={classes.divider}>|</div>
                <div className={classes.page}>
                    {`${current_page || '?'} / ${pages_count}`}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ReaderInfo);