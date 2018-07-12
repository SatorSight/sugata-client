import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import { toRuMonthYearLocale } from '../Helpers/SUtils';
import PropTypes from 'prop-types';

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
    divider: {
        ...block,
        opacity: 0.5,
    },
};

class ReaderInfo extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const { journal_name, issue_date, pages_count, current_page, classes } = this.props;
        return (
            <div className={classes.info}>
                <div className={classes.block}>
                    {journal_name}
                </div>
                <div className={classes.divider}>|</div>
                <div className={classes.block}>
                    {toRuMonthYearLocale(issue_date)}
                </div>
                <div className={classes.divider}>|</div>
                <div className={classes.block}>
                    {`${current_page || '?'} / ${pages_count}`}
                </div>
            </div>
        );
    }
}

ReaderInfo.propTypes = {
    journal_name: PropTypes.string,
    issue_date: PropTypes.string,
    pages_count: PropTypes.number,
    current_page: PropTypes.number,
};

export default withStyles(styles)(ReaderInfo);