import React, {Component} from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import SwipeableViews from 'react-swipeable-views';
import * as SUtils from "../Helpers/SUtils";
import { Link } from 'react-router-dom'

const fontWeightMedium = 400;

const styles = {
    button: {
        display: 'block',
        minWidth: '2.8em',
        padding: '0.8em 0.7em',
    },
    list: {
        color: '#FFF',
        width: '100vw',
    },
    listFull: {
        width: '100vw',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#FFF',
        borderRadius: '0.3em',
        display: 'block',
        margin: '0.4em auto',
    },
    top: {
        textAlign: 'center',
        position: 'relative',
    },
    innerMain: {
        maxWidth: '50em',
        margin: '0 auto',
        position: 'relative',
        width: '100%',
    },
    topText: {
        fontSize: '1.55em',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 300,
        display: 'inline-block',
        lineHeight: 2.7,
        marginTop: '0.8em'
    },
    closet: {
        position: 'absolute',
        left: 0,
        top: '50%',
        height: '1.8em',
        width: '1.8em',
        padding: '1em',
        transform: 'translate(0px, -50%)',
        cursor: 'pointer',
        background: '#333',
        boxShadow: '0 0 2em 2em #333, inset 0 0 1em 1em #333',
        border: '0.1em solid #333',
        borderRadius: '50%',
    },
    closetLineOne: {
        width: '2em',
        height: '0.2em',
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        margin: '-0.25em 0 0 -1em',
        backgroundColor: '#FFF',
        borderRadius: '0.1em',
        transform: 'rotate(45deg)',
        zIndex: 20,
    },
    closetLineTwo: {
        width: '2em',
        height: '0.2em',
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        margin: '-0.25em 0 0 -1em',
        backgroundColor: '#FFF',
        borderRadius: '0.1em',
        transform: 'rotate(-45deg)',
        zIndex: 20,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: '100vw',
        boxShadow: 'inset 0 25em 4em -4em rgba(0,0,0,1)'
    },
    tabs: {
        position: 'relative',
        overflow: 'hidden',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIwAAAAECAMAAADbJFQ7AAAA3lBMVEVHcEyV0OKSz+GTz+GTz+GU0eSTz+GU0OKSz+GW0+STz+GTz+Gg5OyTzuGX1uWTz+Gf2O6Y0+OSz+GV0uOTz+GTz+GTz+CW0eOU0OOT0OGT0OKUz+GTz+GU0OOTz+GTz+GU0OKTz+GUz+KTz+KTz+GUz+KTz+GTz+HG//+r4v+Sz+CTz+Ga0+eY0uSTz+GU0eKTz+GT0OGTz+GTz+GU0OGTz+GT0OGTzuGSz+GSz+GUz+GSz+GUz+GTz+CY1eOV0eWc1eqSz+GTz+KU0OOTz+GTz+GT0OKTz+GTz+GSzuDJon4XAAAASXRSTlMAOsW84C7KQ+8g1qYJ9hiIDiTrMrXkripIbU+Eez7BqlOMWnGAaZboAwb50hUczlddZpmfTHWQ/LixY5x42REnDPOTNqLbYP7dBUf55QAAAn1JREFUWMPt111LG1EUheEnWtpEEtVQBTR+oUKuRFCB3oo/u/RWoArilaDiVxRQSawGTUW1wJzMZIzRFtK7bCCT4czmwOGsd+2V0auPq0wGp6xg2yKqOME09kGWRXaFRYMswQ8owQUYgRLO+QyGuMUgY6hzT53wM4AivnAEWdxDHUUwSh4V8sjRwAg24GtomGMP5vkJJlABn0AZT3DIMln6fYcRKHLJHfiGTSYpMNzn+Zrb+IQ2wACjVKEG655osMUs9GMXPIISzsAq+7DAAXK4gm+oIcs96pRQ5xJUkRcaGjDD77BwB3nIkyOPC25Q4Bd4YBwVqIExqMAabHMDRSizQwPM4xhTYXHHUnxCXtgFvXq3MmVkOMVKU2eqnMB0Wmd239SZUlpnSpzjMwzhlkGMUY9vUaIzxbTO4i8UYRR5KvEt0mAENvAV7pnDHubxEyakhVaGJxxiWVZTaC06S4QWblHBsL7eJelVV+rZtdvY02Jgp4i97gkNW5hFP+xCAmxnsIp9LOCAHFzhG9Riy6qjRB2XUIU8ctLErmoldvgizwVuKOAXPGCcCkiIXQFtxC5LE/sYpihqEnsTk7wEGGVeeX53WBR7fmBR4vlpFnX0/A4savP8wKJ2z1eBxPPTLOr3NosSz++xqFf/kUY2oJ1Gnmhop5FHSGj0an6MafRqfuxIo/fnx4RGYX6MaRTmx67RKKjthQx69S8pbdvbKS0rndIGsYQE2C4gBnaHlFaXTmktw6Oj1uHxg5QWD49dSmlF6ZQWHK3AsD7P4pyWsv1RVNHFnBZs/8OcpoEZUrbfktOC7XfMaWqQ5DRr2MZNOqdpQHtOC7bfy2l/XX8ACrYiZGZgGQ8AAAAASUVORK5CYII=") no-repeat 50% 100%',
        backgroundSize: 'auto 0.1em',
    },
    tabsItem: {
        fontWeight: 200,
        fontSize: '1.2em',
        color: '#FFF',
        letterSpacing: '0.25em',
        height: '4.9em',
        padding: '0.3em 0 0 0',
    },
    activeItem: {
        color: '#999',
        fontWeight: '300 !important',
    },
    arrowTop:{
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: '0.1em',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIwAAAAECAMAAADbJFQ7AAAA3lBMVEVHcEyV0OKSz+GTz+GTz+GU0eSTz+GU0OKSz+GW0+STz+GTz+Gg5OyTzuGX1uWTz+Gf2O6Y0+OSz+GV0uOTz+GTz+GTz+CW0eOU0OOT0OGT0OKUz+GTz+GU0OOTz+GTz+GU0OKTz+GUz+KTz+KTz+GUz+KTz+GTz+HG//+r4v+Sz+CTz+Ga0+eY0uSTz+GU0eKTz+GT0OGTz+GTz+GU0OGTz+GT0OGTzuGSz+GSz+GUz+GSz+GUz+GTz+CY1eOV0eWc1eqSz+GTz+KU0OOTz+GTz+GT0OKTz+GTz+GSzuDJon4XAAAASXRSTlMAOsW84C7KQ+8g1qYJ9hiIDiTrMrXkripIbU+Eez7BqlOMWnGAaZboAwb50hUczlddZpmfTHWQ/LixY5x42REnDPOTNqLbYP7dBUf55QAAAn1JREFUWMPt111LG1EUheEnWtpEEtVQBTR+oUKuRFCB3oo/u/RWoArilaDiVxRQSawGTUW1wJzMZIzRFtK7bCCT4czmwOGsd+2V0auPq0wGp6xg2yKqOME09kGWRXaFRYMswQ8owQUYgRLO+QyGuMUgY6hzT53wM4AivnAEWdxDHUUwSh4V8sjRwAg24GtomGMP5vkJJlABn0AZT3DIMln6fYcRKHLJHfiGTSYpMNzn+Zrb+IQ2wACjVKEG655osMUs9GMXPIISzsAq+7DAAXK4gm+oIcs96pRQ5xJUkRcaGjDD77BwB3nIkyOPC25Q4Bd4YBwVqIExqMAabHMDRSizQwPM4xhTYXHHUnxCXtgFvXq3MmVkOMVKU2eqnMB0Wmd239SZUlpnSpzjMwzhlkGMUY9vUaIzxbTO4i8UYRR5KvEt0mAENvAV7pnDHubxEyakhVaGJxxiWVZTaC06S4QWblHBsL7eJelVV+rZtdvY02Jgp4i97gkNW5hFP+xCAmxnsIp9LOCAHFzhG9Riy6qjRB2XUIU8ctLErmoldvgizwVuKOAXPGCcCkiIXQFtxC5LE/sYpihqEnsTk7wEGGVeeX53WBR7fmBR4vlpFnX0/A4savP8wKJ2z1eBxPPTLOr3NosSz++xqFf/kUY2oJ1Gnmhop5FHSGj0an6MafRqfuxIo/fnx4RGYX6MaRTmx67RKKjthQx69S8pbdvbKS0rndIGsYQE2C4gBnaHlFaXTmktw6Oj1uHxg5QWD49dSmlF6ZQWHK3AsD7P4pyWsv1RVNHFnBZs/8OcpoEZUrbfktOC7XfMaWqQ5DRr2MZNOqdpQHtOC7bfy2l/XX8ACrYiZGZgGQ8AAAAASUVORK5CYII=") no-repeat 50% 50%',
        backgroundSize: 'contain',
        opacity: 0.4,
        display: 'block',
    },
    main: {
        // padding: '1.5em',
        padding: '0.5em 0 0 1.5em',
        color: 'white',
        height: '140px',
        fontSize: '20px',
    },
    overMain: {
        // padding: '0 1.5em 1.5em',
    },
    mainBundle: {
        padding: '1em 0',
    },
    itemBundle: {
        padding: '0 3.2em',
        display: 'block',
        color: '#999',
        fontSize: '1.2em',
        lineHeight: 4,
        fontWeight: 300,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
    },
    item: {
        padding: '0.5em 0 1.3em',
        position: 'relative',
        color: '#FFF',
    },
    ava: {
        position: 'absolute',
        left: 0,
        top: '0.5em',
        borderRadius: '0.2em',
        width: '6.5em',
        height: '8.5em',
        overflow: 'hidden',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        boxShadow: '0.5em 0.5em 1em rgba(0,0,0,0.2)',
    },
    inner: {
        marginLeft: '8em',
    },
    over: {
        position: 'relative',
        overflow: 'hidden',
        height: '9em',
    },
    caption: {
        display: 'inline',
        background: 'linear-gradient(to right, rgba(104,216,181,1) 0%, rgba(113,133,238,1) 100%)',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.7em 0.2em',
        fontSize: '0.9em',
        lineHeight: 2,
        textTransform: 'uppercase',
        fontWeight: 300,
    },
    title: {
        fontSize: '1.2em',
        lineHeight: 1.2,
        fontWeight: 500,
        marginBottom: '0.3em',
        maxHeight: '2.2em',
        letterSpacing: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '75%',
    },
    text: {
        fontSize: '1.1em',
        lineHeight: 1.7,
        maxHeight: '5.8em',
        color: '#999',
        overflow: 'hidden',
        position: 'relative',
        width: '90%',
        background: 'linear-gradient(to bottom, rgba(153,153,153,1) 0%, rgba(153,153,153,0) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    settings: {
        margin: '0 1rem',
        position: 'relative',
        paddingBottom: '1px',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    itemSettings: {
        position: 'relative',
        fontFamily: 'HelveticaNeueCyr, arial, serif',
        display: 'block',
        fontSize: '1.2em',
        letterSpacing: 0.3,
        padding: '1.6em 0 0',
        color: '#FFF',
        overflow: 'hidden',
        fontWeight: 300,
        ':hover': {
            background: 'red',
        }
    },
    leftSettings: {
        display: 'block',
        float: 'left',
        lineHeight: 2.4,
    },
    rightSettings: {
        display: 'block',
        width: '50%',
        float: 'right',
        overflow: 'hidden',
        textAlign: 'right',
        lineHeight: 2.4,
    },
    arrowSettings: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    lineSettings: {
        position: 'absolute',
        maxWidth: '50%',
        textAlign: 'right',
        fontSize: '1em',
        background: 'none',
        border: 'none',
        lineHeight: 2.4,
        color: '#FFF',
        right: 0,
        bottom: 0,
        borderBottom: '1px solid rgba(255,255,255,0.6)',
        WebkitAppearance: 'none',
        WebkitBorderRadius: 0,
        ':hover': {
            background: 'red',
        },
    },
    optionSettings: {
        textAlign: 'right',
    },
};

const balance_styles = {
    "container": {
        "width": "100%"
    },
    "balance_bg": {
        "width": "100%",
        "position": "fixed",
        "height": "100%",
        "background": "url('/images/balance_bg.png')",
        "backgroundPosition": "50% 220%",
        "backgroundSize": "260%",
        "opacity": "0.4",
        "zIndex": "-1"
    },
    "bundle_bg": {
        "width": "calc(100% - 20px)",
        "height": "100%",
        "background": "rgba(0,0,0,0.5)",
        "position": "absolute",
        "zIndex": "-1"
    },
    "bundle": {
        "width": "calc(100% - 30px)",
        "height": "5rem",
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center",
        "border": "1px solid rgba(255,255,255,0.4)",
        "marginBottom": "10px",
        "borderRadius": "5px",
        "marginLeft": '5px',
        "marginRight": '5px',
        "padding": "10px",
        // "background": "radial-gradient(circle at 100% 140%, rgba(86, 50, 81, 0.8) 30%, rgba(0, 0, 0, 0.5) 50%)",
        "backgroundSize": "100%",
        "backgroundRepeat": "no-repeat"
    },
    "bundle_container": {
        "width": "100%",
        "zIndex": "-2",
        "backgroundImage": "linear-gradient(\n    60deg,\n    rgba(0, 0, 0, 0) 0%,\n    rgba(0, 0, 0, 0) 25%,\n\n    rgba(137,78,141,0.3) 33%,\n    rgba(103,137,210,0.3) 41%,\n    rgba(69,194,134,0.3) 49%,\n    rgba(255,171,61,0.3) 57%,\n\n    rgba(0, 0, 0, 0) 75%,\n    rgba(0, 0, 0, 0) 100%\n  )",
        "backgroundSize": "170%",
        "backgroundPosition": "0% 50%",
        "backgroundRepeat": "no-repeat"
    },
    "left_container": {
        // "marginLeft": "1rem"
    },
    "premium": {
        "height": "60rem"
    },
    "label": {
        "color": "white",
        "fontSize": "1.2rem",
        "textTransform": "uppercase",
        "fontFamily": "Montserrat",
        "letterSpacing": "2px",
        'marginBottom': '5px'
        // "lineHeight": "33px"
    },
    "journals_list": {
        "color": "white",
        "fontFamily": "HelveticaNeueCyr",
        // "lineHeight": "32px",
        "lineHeight": "1rem",
        "fontWeight": "400",
        "fontSize": "0.8rem",
    },
    "check_mark": {
        "paddingTop": "4px"
    },
    "active_button": {
        "backgroundColor": "rgba(0,0,0,0)",
        "color": "white",
        "padding": "0.3em 0.7em",
        "textDecoration": "none",
        "fontSize": "0.9rem",
        "border": "2px solid white",
        "borderRadius": "10px",
        "fontWeight": "500",
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "space-around"
    },
    "active_button_premium": {
        "backgroundColor": "rgba(0,0,0,0)",
        "color": "white",
        "padding": "0.3em 0.7em",
        "textDecoration": "none",
        "fontSize": "0.9rem",
        "border": "2px solid white",
        "borderRadius": "10px",
        "fontWeight": "500",
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "space-around"
    },
    "inactive_button": {
        "backgroundColor": "white",
        "color": "black",
        "padding": "0.5rem",
        "textDecoration": "none",
        "fontSize": "0.9rem",
        "border": "2px solid white",
        "borderRadius": "10px",
        "fontFamily": "HelveticaNeueCyr",
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "space-around",
        "cursor": "pointer"
    },
    "mark_container": {
        "marginRight": "1rem"
    },
    "bundle_premium": {
        "width": "calc(100% - 20px)",
        "height": "14rem",
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center",
        "marginBottom": "10px",
        "borderRadius": "5px",
        "padding": "10px",
        "fontSize": "1.3rem"
    },
    button_label: {
        marginTop: '4px'
    },
    premium_label: {
        "color": "white",
        "fontSize": "1.6rem",
        "textTransform": "uppercase",
        "fontFamily": "Montserrat",
        "letterSpacing": "2px",
        'marginBottom': '5px'
    },
    button_settings: {
        fontSize: '1em',
        padding: '1.2em 1em 1em',
        letterSpacing: 1,
        textTransform: 'uppercase',
        // color: '#000',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        width: '90%',
        maxWidth: 400,
        margin: '0 auto 2em',
        borderRadius: '2em',
        lineHeight: '3em',
        border: '1px solid #E0E0E0',
        cursor: 'pointer',
        // display: 'block',
        backgroundColor: '#FFF',

        display: 'flex'
    },
    span: {
        color: 'black',
        fontWeight: 500
    }
};

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: 'rgba(0,0,0,0.8)',
            paper: 'rgba(0,0,0,0.8)',
            appBar: 'rgba(0,0,0,0.8)',
            contentFrame: 'rgba(0,0,0,0.8)',
            chip:'rgba(0,0,0,0.8)',
        },
    },
    typography: {
        fontFamily:'HelveticaNeueCyr, arial, serif',
        fontWeightMedium,
        fontSize: '1.2em',
        body1: {
            fontWeight: fontWeightMedium,
        },
    },
});

const colors = [
    'rgba(137,78,141, 0.8)',
    'rgba(171,15,15, 0.8)',
    'rgba(125,61,255, 0.8)',
    'rgba(143,194,80, 0.8)'
];

let iterator = 0;
const get_color_style = () => {
    const style = {background: `radial-gradient(circle at 100% 140%, ${colors[iterator]} 30%, rgba(0, 0, 0, 0.5) 50%)`};
    iterator++;
    if(!colors[iterator])
        iterator = 0;

    return style;
};

class IndexMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
            index: 0,
            option: 'true',
        };

   }

   shouldComponentUpdate(nextProps){
        return !SUtils.empty(nextProps.payment_trigger)
            && !SUtils.empty(nextProps.data)
            && !SUtils.empty(nextProps.data.bundles)
            && !SUtils.empty(nextProps.classes)
            && !SUtils.empty(nextProps.auth_data)
   }

    lockBody = () => {
        document.querySelector('#root').style.overflow = 'hidden';
        document.querySelector('#root').style.position = 'fixed';
    };

    unlockBody = () => {
        document.querySelector('#root').style.overflow = 'auto';
        document.querySelector('#root').style.position = 'initial';
    };

    componentWillUnmount(){
        this.unlockBody();
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
        if(open) {
            this.lockBody();
        }else {
            this.unlockBody();
        }
    };

    linkHandler = () => this.setState({left: false}, this.unlockBody());

    handleChange = (event, value) =>  this.setState({ index: value });
    // handleChangeOption = (event) =>  this.setState({ option: event.target.value });
    handleChangeIndex = index => this.setState({ index });

    go_to_subscription = bundle_id => this.props.payment_trigger(bundle_id);

    subscribed_to_all_bundles = () => {
        const bundles = this.props.data.bundles;
        const user_bundles = SUtils.propOrNull(this.props.auth_data, 'user_bundles');
        if(!bundles || !user_bundles)
            return false;
        if(bundles.length < 1 && user_bundles.length < 1)
            return false;

        if(bundles && user_bundles)
            return bundles.length === user_bundles.length;
        return false;
    };

    resolveLoginLogout = () => {
        if(SUtils.propOrNull(this.props.auth_data, 'msisdn')){
            this.logout();
        }else{
            //login
        }
    };

    login = () => {};
    logout = () => {
        fetch('/api/logout', {credentials: 'include'})
            .then(resp => window.location.reload())
    };

    renderTabs = () => {
        let tabs = [];

        let bundles = this.props.data.bundles;

        const operator_object = SUtils.propOrNull(this.props.auth_data, 'operator');
        const operator = SUtils.propOrNull(operator_object, 'tech_name');
        const user_bundles = SUtils.propOrNull(this.props.auth_data, 'user_bundles');
        const user_msisdn = SUtils.propOrNull(this.props.auth_data, 'msisdn');

        tabs.push(<div key={'menu-tab-links'} style={styles.mainBundle}>
            <Link draggable={false} onClick={this.linkHandler} style={styles.itemBundle} to={'/'}>
                На главную
            </Link>
            {SUtils.any(bundles) ? bundles.map(bundle =>
                <Link draggable={false} onClick={this.linkHandler} key={`index_menu_bundles_${bundle.id}`} style={styles.itemBundle} to={`/bundle/${bundle.id}`}>
                    {bundle.name}
                </Link>
            ) : null}
        </div>);

        tabs.push(<div key={'menu-tab-balance'} style={balance_styles.container}>
            <div style={balance_styles.balance_bg}></div>
            <div style={balance_styles.bundle_container}>
                {(!operator || operator === 'unknown' || operator === 'beeline.ru') ?
                    <div style={balance_styles.bundle_premium}>
                        <div style={balance_styles.left_container}>
                            <div style={balance_styles.premium_label}>Премиум</div>
                            <div style={balance_styles.journals_list}>
                                Включает все журналы
                            </div>
                        </div>
                        {/*
                         PREMIUM HARDCODE
                         */}
                        {this.subscribed_to_all_bundles()
                            ? <div style={balance_styles.button_container}>
                            <button style={balance_styles.active_button_premium} type="button" name="button">
                                <div style={balance_styles.mark_container}>
                                    <div style={balance_styles.check_mark}>
                                        <svg viewBox="0 0 30 22" width="30" style={{fill: 'none', stroke: '#ffffff', strokeLinecap: 'round', strokeWidth: 3.2}} height="20"><path id="Path 2" d="M2.11,11.32l7.56,7.82l13.67,-16.9" /></svg>
                                    </div>
                                </div>
                                <div style={balance_styles.button_label}>Активна</div>
                            </button>
                        </div>
                        : <button onClick={() => this.go_to_subscription()} style={balance_styles.inactive_button} type="button" name="button">
                            <div style={balance_styles.button_label}>Активировать&nbsp;&nbsp;<b>></b></div>
                        </button>}
                    </div>
                    : null
                }
                {SUtils.any(bundles) ? bundles.map(bundle =>
                    <div key={`balance_bundles_${bundle.id}`} style={
                        Object.assign(
                            {},
                            balance_styles.bundle,
                            get_color_style()
                        )
                    }>
                        <div style={balance_styles.left_container}>
                            <div style={balance_styles.label}>«{bundle.name}»</div>
                            <div style={balance_styles.journals_list}>
                                {bundle.journal_names.slice(0, 3).join(', ')}
                            </div>
                        </div>
                        {SUtils.in_array(bundle.id, user_bundles)
                            ? <div style={balance_styles.button_container}>
                                <button style={balance_styles.active_button} type="button" name="button">
                                    <div style={balance_styles.mark_container}>
                                        <div style={balance_styles.check_mark}>
                                            <svg viewBox="0 0 30 22" width="30" style={{fill: 'none', stroke: '#ffffff', strokeLinecap: 'round', strokeWidth: 3.2}} height="20"><path id="Path 2" d="M2.11,11.32l7.56,7.82l13.67,-16.9" /></svg>
                                        </div>
                                    </div>
                                    <div style={balance_styles.button_label}>Активна</div>
                                </button>
                            </div>
                            : <button onClick={() => this.go_to_subscription(bundle.id)} style={balance_styles.inactive_button} type="button" name="button">
                                <div style={balance_styles.button_label}>Активировать&nbsp;&nbsp;<b>></b></div>
                            </button>
                        }
                    </div>
                ) : null}
            </div>
        </div>);


        if(user_msisdn){
            tabs.push(<div key={'menu-tab-settings'} style={styles.settings}>
                <div style={styles.itemSettings}>
                    <label style={styles.leftSettings}>Номер телефона
                        <input style={styles.lineSettings} type="text"
                               value={SUtils.beautifyTel(user_msisdn)}
                            // placeholder="+7 (909) 999-99-99"
                               disabled />
                    </label>
                    <span style={styles.arrowSettings} />
                </div>
                <Button classes={{}} color="primary" style={balance_styles.button_settings} onClick={this.resolveLoginLogout}>
                    <svg style={{marginBottom: '0.2rem', marginRight: '1rem'}} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span style={balance_styles.span}>
                        {user_msisdn ? 'Выйти' : 'Войти'}
                    </span>
                </Button>

                {/*<div style={styles.itemSettings}>*/}
                {/*<label style={styles.leftSettings}>Имя (для комментариев)*/}
                {/*<input style={styles.lineSettings} type="text" placeholder="Константин" />*/}
                {/*</label>*/}
                {/*<span style={styles.arrowSettings} />*/}
                {/*</div>*/}
                {/*<div style={styles.itemSettings}>*/}
                {/*<label style={styles.leftSettings}>Присылать оповещения</label>*/}
                {/*<select style={styles.lineSettings} value={this.state.option} onChange={this.handleChangeOption}>*/}
                {/*<option style={styles.optionSettings} value="true">&nbsp;Да</option>*/}
                {/*<option style={styles.optionSettings} value="false">Нет</option>*/}
                {/*</select>*/}
                {/*<span style={styles.arrowSettings} />*/}
                {/*</div>*/}
            </div>);

        }

        return tabs;

    };


    render() {
        const { classes } = this.props;
        const { index } = this.state;

        const operator = SUtils.propOrNull(this.props.auth_data, 'operator');
        const user_bundles = SUtils.propOrNull(this.props.auth_data, 'user_bundles');
        const user_msisdn = SUtils.propOrNull(this.props.auth_data, 'msisdn');

        return (
            <MuiThemeProvider theme={theme}>
                <div style={{overflow: 'auto'}}>
                    <Button color="primary" className={classes.button} onClick={this.toggleDrawer('left', true)}>
                        <span className={classes.line} />
                        <span className={classes.line} />
                        <span className={classes.line} />
                    </Button>
                    <Drawer anchor="left" classes={{ paper: classes.drawerPaper, }} open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                        <div className={classes.innerMain} >
                            <div className={classes.colorTwo} />
                            <div className={classes.top}>
                                <div className={classes.closet} onClick={this.toggleDrawer('left', false)}>
                                    <span className={classes.closetLineOne} />
                                    <span className={classes.closetLineTwo} />
                                </div>
                                <p className={classes.topText}>меню</p>
                                <div>
                                    <span />
                                </div>
                            </div>
                            <MuiThemeProvider theme={theme}>
                                <div style={styles.overMain}>
                                    <span style={styles.arrowTop} />
                                    <Tabs indicatorColor="none" fullWidth value={index} onChange={this.handleChange} style={styles.tabs}>
                                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="витрина" style={styles.tabsItem} className={classes.tabsItem} />
                                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="баланс" style={styles.tabsItem} />
                                        <Tab disabled={user_msisdn === null} classes={{ rootInheritSelected: this.props.classes.activeItem}} label="настройки" style={styles.tabsItem} />
                                    </Tabs>
                                    <SwipeableViews
                                        animateHeight
                                        enableMouseEvents
                                        slideStyle={{overflowX: 'auto'}}
                                        index={index}
                                        onChangeIndex={this.handleChangeIndex}>
                                        {this.renderTabs()}
                                    </SwipeableViews>
                                </div>
                            </MuiThemeProvider>
                        </div>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(IndexMenu);