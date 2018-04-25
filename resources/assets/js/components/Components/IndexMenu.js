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
        padding: '0 1.5em 1.5em',
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
        position: 'relative',
        paddingBottom: '1px',
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
    handleChangeOption = (event) =>  this.setState({ option: event.target.value });
    handleChangeIndex = index => this.setState({ index });


    render() {
        const { classes } = this.props;
        const { index } = this.state;
        let articles = this.props.data.new_articles;
        let issues = this.props.data.new_issues;
        let bundles = this.props.data.bundles;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
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
                                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="настройки" style={styles.tabsItem} />
                                    </Tabs>
                                    <SwipeableViews animateHeight enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
                                        <div style={styles.mainBundle}>
                                            <Link onClick={this.linkHandler} style={styles.itemBundle} to={'/'}>
                                                На главную
                                            </Link>
                                            {SUtils.any(bundles) ? bundles.map((bundle, currentIndex) =>
                                                <Link onClick={this.linkHandler} key={String(currentIndex)} style={styles.itemBundle} to={`/bundle/${bundle.id}`}>
                                                    {bundle.name}
                                                </Link>
                                            ) : null}
                                        </div>
                                        <div style={styles.main}>
                                            В разработке ...
                                            {/*{SUtils.any(articles) ? articles.map((article, currentIndex) =>*/}
                                                {/*<div style={styles.item} key={String(currentIndex)}>*/}
                                                    {/*<div style={Object.assign({}, styles.ava, {backgroundImage:'url(' + article.image_path + ')' })} />*/}
                                                    {/*<div style={styles.inner}>*/}
                                                        {/*<div style={styles.over}>*/}
                                                            {/*<h3 style={styles.title}>{article.title}</h3>*/}
                                                            {/*<p style={styles.text}>{article.text}</p>*/}
                                                        {/*</div>*/}
                                                        {/*<div>*/}
                                                            {/*<p style={styles.caption}>*/}
                                                                {/*<span>{article.journal_name}, </span>*/}
                                                                {/*<span>{article.date}</span>*/}
                                                            {/*</p>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*) : null}*/}
                                        </div>
                                        <div style={styles.settings}>
                                            <div style={styles.itemSettings}>
                                                <label style={styles.leftSettings}>Номер телефона
                                                    <input style={styles.lineSettings} type="text" placeholder="+7 (909) 999-99-99" disabled />
                                                </label>
                                                <span style={styles.arrowSettings} />
                                            </div>
                                            <div style={styles.itemSettings}>
                                                <label style={styles.leftSettings}>Имя (для комментариев)
                                                    <input style={styles.lineSettings} type="text" placeholder="Константин" />
                                                </label>
                                                <span style={styles.arrowSettings} />
                                            </div>
                                            <div style={styles.itemSettings}>
                                                <label style={styles.leftSettings}>Присылать оповещения</label>
                                                <select style={styles.lineSettings} value={this.state.option} onChange={this.handleChangeOption}>
                                                    <option style={styles.optionSettings} value="true">&nbsp;Да</option>
                                                    <option style={styles.optionSettings} value="false">Нет</option>
                                                </select>
                                                <span style={styles.arrowSettings} />
                                            </div>
                                        </div>
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