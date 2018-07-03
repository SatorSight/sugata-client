import React, {Component} from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import SwipeableViews from 'react-swipeable-views';
import * as SUtils from "../Helpers/SUtils";
import { Link } from 'react-router-dom'

const fontWeightMedium = 400;


const theme = createMuiTheme({
    // palette: {
    //     type: 'dark',
    //     background: {
    //         default: 'rgba(0,0,0,0.8)',
    //         paper: 'rgba(0,0,0,0.8)',
    //         appBar: 'rgba(0,0,0,0.8)',
    //         contentFrame: 'rgba(0,0,0,0.8)',
    //         chip:'rgba(0,0,0,0.8)',
    //     },
    // },
    // typography: {
    //     fontFamily:'HelveticaNeueCyr, arial, serif',
    //     fontWeightMedium,
    //     fontSize: '1.2em',
    //     body1: {
    //         fontWeight: fontWeightMedium,
    //     },
    // },
});

const colors = [
    'rgba(137,78,141, 1)',
    'rgba(171,15,15, 1)',
    'rgba(125,61,255, 1)',
    'rgba(143,194,80, 1)'
];

let iterator = 0;
const get_color = () => {
    const color = colors[iterator];

    iterator++;
    if(!colors[iterator])
        iterator = 0;

    return color;
};



const close = <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px"  viewBox="0 0 357 357"><g><g id="close">
    <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3
			214.2,178.5"/>
</g></g>
</svg>;


const arrow = <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px"  viewBox="0 0 492 492">
    <g>
        <path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"/>
    </g>
</svg>;




const get_lock = () => <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px"  viewBox="0 0 47.002 47.002">
    <g>
        <path d="M33.603,17.388v-7.281C33.603,4.53,29.069,0,23.499,0c-5.57,0-10.103,4.53-10.103,10.106v7.281h-4.68V43.35h6.661
			c-0.027-0.229-0.041-0.463-0.041-0.699c0-2.719,1.824-5.034,4.631-6.106v-2.382c-1.662-0.303-2.896-1.828-2.928-3.734
			c-0.754-0.647-1.231-1.607-1.231-2.679c0-1.944,1.585-3.53,3.533-3.53h0.826c0.484-1.374,1.796-2.361,3.333-2.361
			c1.948,0,3.533,1.585,3.533,3.535v11.151c2.807,1.072,4.632,3.388,4.632,6.106c0,0.236-0.014,0.471-0.041,0.699h6.662V17.388
			H33.603z M28.543,17.388H18.452v-7.281c0-2.786,2.263-5.056,5.047-5.056c2.781,0,5.044,2.27,5.044,5.056V17.388z"/>
        <path d="M24.617,38.386c0.004-0.028,0.019-0.051,0.019-0.083v-12.91c0-0.631-0.509-1.137-1.135-1.137
			c-0.628,0-1.135,0.506-1.135,1.137v1.226h-3.025c-0.627,0-1.135,0.509-1.135,1.132c0,0.63,0.508,1.137,1.135,1.137h1.229
			c-0.628,0-1.134,0.656-1.134,1.469s0.506,1.463,1.134,1.463h1.794v6.486c0,0.031,0.016,0.055,0.017,0.082
			c-2.678,0.383-4.648,2.119-4.648,4.266c0,2.438,2.532,4.35,5.767,4.35c3.235,0,5.767-1.912,5.767-4.35
			C29.269,40.505,27.299,38.77,24.617,38.386z M23.501,44.729c-2.061,0-3.497-1.096-3.497-2.076c0-0.983,1.437-2.077,3.497-2.077
			c2.062,0,3.499,1.094,3.499,2.077C27,43.633,25.562,44.729,23.501,44.729z"/>
    </g>
</svg>;


const get_check = () => <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px"  viewBox="0 0 342.357 342.357">
    <g>
        <polygon points="290.04,33.286 118.861,204.427 52.32,137.907 0,190.226 118.862,309.071 342.357,85.606 "/>
    </g>
</svg>;

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
    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#000',
        borderRadius: '0.3em',
        display: 'block',
        margin: '0.4em auto',
    },
    drawerInner: {
        width: '18rem',
    },



    backToMain: {
        display: 'flex',
        padding: '0.6rem 2rem 0.5rem',
        justifyContent: 'flex-start',
        borderBottom: '1px solid black',
    },
    backLabel: {
        fontWeight: 'bold',
        fontSize: '1.2em',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1rem',
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
    circle: {
        backgroundColor: 'white',
        // border: '3px solid ' + get_color(),
        height: '1.8rem',
        borderRadius: '50%',
        width: '1.8rem',
        marginLeft: '-1rem',
        position: 'absolute',
        zIndex: '-1'
    },
    lockIcon: {
        position: 'relative',
        left: '-1.7rem',
        top: '0.3rem',
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
    }
};




class Menu extends Component {
    constructor(props){
        super(props);

        // this.state = {
        //     open: false,
        // };
    }
    //
    // open = () => this.setState({ open: true });
    // close = () => this.setState({ open: false });

    bundleSubscribed = bundle_id => SUtils.in_array(bundle_id, this.props.auth_data.user_bundles);

    render() {
        const { classes, bundles } = this.props;

        console.log('menu props');
        console.log(this.props);

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.menuWrapper}>
                    <Button color="primary" classes={{}} className={classes.button} onClick={this.props.doOpen}>
                        <span className={classes.line} />
                        <span className={classes.line} />
                        <span className={classes.line} />
                    </Button>
                    <Drawer classes={{}} theme={theme} open={this.props.open} onClose={this.props.doClose}>
                        <div className={classes.drawerInner}>
                            <div className={classes.header}>
                                <div className={classes.close} onClick={this.props.doClose}>
                                    {close}
                                </div>
                                <div className={classes.label}>Меню</div>
                            </div>
                            <Link style={{color: 'black'}} to={'/'}>
                                <div className={classes.backToMain}>
                                    <div className={classes.arrow}>{arrow}</div>
                                    <div className={classes.backLabel}>На главную</div>
                                </div>
                            </Link>
                            <div className={classes.bundlesContainer}>
                                {bundles.map(bundle => {
                                    const color = get_color();
                                    return (
                                        <div key={`menu_bundle_${bundle.id}`}>
                                            <div className={classes.bundleWrapper}>

                                                    <div
                                                        className={classes.bundle}
                                                        style={{
                                                            borderBottom: `1px solid black`,
                                                        }}
                                                    >
                                                        <Link style={{color: 'black'}} to={`/bundle/${bundle.id}`}>
                                                            {bundle.name}
                                                        </Link>
                                                    </div>
                                                    <div className={classes.lock}>
                                                        {/*<div*/}
                                                            {/*className={classes.circle}*/}
                                                            {/*style={{*/}
                                                                {/*border: '3px solid ' + color,*/}
                                                            {/*}}*/}
                                                        {/*></div>*/}
                                                        <div className={classes.lockIcon}>
                                                            {this.bundleSubscribed(bundle.id) ? get_check() : get_lock()}
                                                        </div>
                                                    </div>

                                            </div>
                                        </div>
                                )})}
                            </div>
                        </div>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Menu);