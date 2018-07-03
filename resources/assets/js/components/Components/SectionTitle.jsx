import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import * as css from '../Helpers/cssConstants';

const styles = {
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
    border: {
        borderBottom: '0.2rem solid black',
        paddingTop: '1.5rem',
        width: '9.5rem',
        position: 'absolute',
        right: 0,
    },
    arrowContainer: {
        margin: '0.3rem -1rem 0 1rem',
    },
};

class SectionTitle extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const {title, link_label, link, classes} = this.props;

        return (
            <div className={classes.titles}>
                <div className={classes.sectionTitle}>
                    {title}
                </div>
                { link &&
                    <div className={classes.otherLink}>
                        <div>
                            <Link className={classes.link} to={link}>
                                {link_label || <div><br/><br/></div>}
                                <div className={classes.border}></div>
                            </Link>
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

export default withStyles(Object.assign({}, styles, css))(SectionTitle);