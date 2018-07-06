import React, {Component} from 'react';
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import * as SUtils from "../Helpers/SUtils";

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
        padding: '1rem 1rem 2rem 2rem'
    },
    bundleWrapper: {
        display: 'flex',
        marginBottom: '1rem',
    },
    bundle: {
        padding: '0.6rem 0rem 0.5rem',
        fontWeight: '500',
        textTransform: 'uppercase',
        fontSize: '1.2em',
        fontFamily: 'Montserrat',
        textAlign: 'left',
        width: '100%',
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
        // marginBottom: '0.5em',

        margin: '0 auto',
    },
    
    
    listing_root: {
        display: 'block',
    },
    listing_button: {
        color: '#000',
        background: 'rgba(0,0,0,0)',
        cursor: 'pointer',
        position: 'absolute',
        right: '2em',
        top: '50%',
        transform: 'translate(0, -50%)',
        border: 0,
        padding: '1em',
    },
    listing_onLoading: {
        display: 'block',
    },
    listing_offLoading: {
        display: 'none',
    },
    listing_onOpen: {
        display: 'block',
        position: 'absolute',
        overflowX: 'hidden',
        overflowY: 'scroll',
        left: 0,
        right: 0,
        top: '6.2em',
        bottom: 0,
        minHeight: '100vh',
        zIndex: 100,
        background: 'url(/images/header.jpg) no-repeat 50% -6.2em #000',
        backgroundSize: '100% auto',
    },
    listing_offOpen: {
        display: 'none',
    },
    listing_item: {
        padding: '0.5em 0 1.3em',
        position: 'relative',
    },
    listing_ava: {
        position: 'absolute',
        left: '1.3em',
        top: '1.3em',
        borderRadius: '0.5em',
        width: '6.5em',
        height: '6.5em',
        overflow: 'hidden',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        boxShadow: '0.8em 0.8em 1em -0.6em rgba(0,0,0,0.2)',
    },
    listing_inner: {
        margin: '1em 0 0 9em',
        height: '5em',
        display: 'flex',
        alignItems: 'center',
    },
    listing_content: {
        position: 'relative',
        zIndex: 20,
    },
    listing_shadow: {
        zIndex: 10,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: '6.2em',
        background: '#000',
        opacity: 0.8,
    },
    listing_text: {
        fontSize: '1.2em',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        lineHeight: 1.6,
        margin: '0 0 0.2em',
        padding: 0,
        maxHeight: '3em',
        color: '#000',
        overflow: 'hidden',
        position: 'relative',
        // width: '70%',
        fontWeight: 300,
        display: 'block',
    },
    listing_pageNumber: {
        color: '#999',
        border: '1px solid #999',
        borderRadius: '1em',
        padding: '0 0.4em',
        lineHeight: 1.6,
        margin: '0 1em 0 0',
    },
    listing_link: {
        display: 'block',
        cursor: 'pointer',
    },
    listing_last: {
        height: '8em',
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

        return (
        !SUtils.empty(listing) ? <MuiThemeProvider theme={theme}>
                <div className={classes.menuWrapper}>
                    <Button onClick={this.props.doOpenListing} classes={{}} className={classes.button}>
                        {arrow_down}
                    </Button>
                    <Drawer anchor="right" classes={{}} theme={theme} open={this.props.open} onClose={this.props.doClose}>
                        <div className={classes.drawerInner}>
                            <div className={classes.header}>
                                <div className={classes.close} onClick={this.props.doCloseListing}>
                                    {close}
                                </div>
                                <div className={classes.label}>Оглавление</div>
                            </div>
                            <div className={classes.bundlesContainer}>
                                {listing.map(l =>
                                    <div onClick={() => this.navigate(l.id)} key={`listing_${l.page_number}`} className={classes.listing_item}>
                                        <div
                                            className={classes.listing_link}>
                                            <div className={classes.listing_ava} style={{backgroundImage:'url(' + l.image + ')' }} />
                                            <div className={classes.listing_inner}>
                                                <p className={classes.listing_text}><span className={classes.listing_pageNumber}>{l.page_number}</span>{l.title}</p>
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

export default withStyles(styles)(ListingMenu);