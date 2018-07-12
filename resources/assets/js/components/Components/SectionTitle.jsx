import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import * as css from '../Helpers/cssConstants';
import PropTypes from 'prop-types';

const styles = {
    titles: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 0 2em 0',
        width: '100%',
        paddingRight: '1em',
    },
    otherLink: {
        fontWeight: 500,
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    otherLinkInner: {
        marginRight: '1em',
    },
    border: {
        borderBottom: '0.2rem solid black',
        paddingTop: '1rem',
        width: '50%',
        position: 'absolute',
        right: 0,
    },
    arrowContainer: {
        marginTop: '5px',
    },
};

class SectionTitle extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const {title, link_label, link, no_links, classes} = this.props;
        return (
            <div className={classes.titles}>
                <div className={classes.sectionTitle}>
                    {title}
                </div>
                { !no_links && link &&
                    <div className={classes.otherLink}>
                        <div className={classes.otherLinkInner}>
                            <Link className={classes.link} to={link}>
                                {link_label || <div><br/><br/></div>}
                            </Link>
                            <div className={classes.border}></div>
                        </div>
                        <div className={classes.arrowContainer}>
                            <svg x="0px" y="0px" viewBox="0 0 1000 1000" width="12" xmlns="http://www.w3.org/2000/svg">
                            <g><g><g id="keyboard-arrow-right"><polygon points="197.8,867.5 573.5,500 197.8,124.3 312.2,10 802.2,500 312.2,990 "/></g></g></g>
                            </svg>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
    link_label: PropTypes.string,
    link: PropTypes.string,
    no_links: PropTypes.bool,
    classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(Object.assign({}, styles, css))(SectionTitle);