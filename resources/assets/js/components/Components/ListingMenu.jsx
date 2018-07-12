import React, {Component} from 'react';
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import * as SUtils from "../Helpers/SUtils";
import PropTypes from 'prop-types';

const theme = createMuiTheme({});

const styles = {
    menuWrapper: {
        width: 'inherit',
        minWidth: 'inherit'
    },
    button: {
        display: 'block',
        width: 'inherit',
        minWidth: 'inherit',
        padding: '0.5rem',
    },
    drawerInner: {
        width: '18rem',
    },
    bundlesContainer: {
        padding: '0.5rem 1rem 2rem 0.5rem'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem 1rem',
        borderBottom: '1px solid black',
    },
    label: {
        fontFamily: 'Montserrat',
        fontSize: '1.1rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1rem',
        textAlign: 'center',
        margin: '0 auto',
    },
    listingItem: {
        marginBottom: '1em',
    },
    listingImage: {
        marginRight: '1em',
        borderRadius: '0.5em',
        width: '6.5em',
        minWidth: '6.5em',
        height: '6.5em',
        overflow: 'hidden',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        boxShadow: '0.8em 0.8em 1em -0.6em rgba(0,0,0,0.2)',
    },
    listingInner: {
        height: '6.5em',
        display: 'flex',
        alignItems: 'center',
    },
    listingText: {
        fontSize: '1.2em',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#000',
        fontWeight: 500,
    },
    listingLink: {
        display: 'flex',
        cursor: 'pointer',
    },
};

const arrow_down = <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18px"  viewBox="0 0 292.362 292.362">
    <g>
        <path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
		C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
		s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"/>
    </g>
</svg>;

const close = <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px"  viewBox="0 0 357 357"><g><g id="close">
    <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3
			214.2,178.5"/>
</g></g>
</svg>;

class ListingMenu extends Component {
    constructor(props){
        super(props);
    }

    navigate = id => window.location = `/article/${id}`;
    render() {
        const { classes, listing } = this.props;
        return (!SUtils.empty(listing) ? <MuiThemeProvider theme={theme}>
                <div className={classes.menuWrapper}>
                    <Button onClick={this.props.doOpenListing} classes={{}} className={classes.button}>
                        {arrow_down}
                    </Button>
                    <Drawer anchor="right" classes={{}} theme={theme} open={this.props.open} onClose={this.props.doCloseListing}>
                        <div className={classes.drawerInner}>
                            <div className={classes.header}>
                                <div className={classes.close} onClick={this.props.doCloseListing}>
                                    {close}
                                </div>
                                <div className={classes.label}>Оглавление</div>
                            </div>
                            <div className={classes.bundlesContainer}>
                                {listing.map(l =>
                                    <div onClick={() => this.navigate(l.id)} key={`listing_${l.page_number}`} className={classes.listingItem}>
                                        <div className={classes.listingLink}>
                                            <div className={classes.listingImage} style={{backgroundImage:'url(' + l.image + ')' }} />
                                            <div className={classes.listingInner}>
                                                <p className={classes.listingText}>
                                                    {l.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Drawer>
                </div>
            </MuiThemeProvider> : <div style={{width: '2.5rem'}}></div>
        );
    }
}

ListingMenu.propTypes = {
    listing: PropTypes.arrayOf(PropTypes.object),
    doOpenListing: PropTypes.func.isRequired,
    doCloseListing: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(styles)(ListingMenu);