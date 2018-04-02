import React from 'react';
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
        right: 0,
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
        width: '1.8em',
        height: '0.2em',
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        margin: '-0.1em 0.3em 0.3em -1em',
        backgroundColor: '#FFF',
        borderRadius: '0.1em',
        transform: 'rotate(45deg)',
        zIndex: 20,
    },
    closetLineTwo: {
        width: '1.8em',
        height: '0.2em',
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        margin: '-0.1em 0.3em 0.3em -1em',
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
    icon: {
        width: '1.2em',
        padding: '0.2em 0.5em 0',
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
        padding: '1.5em',
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
        borderRadius: '0.5em',
        width: '6.5em',
        height: '6.5em',
        overflow: 'hidden',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        boxShadow: '0.8em 0.8em 1em -0.6em rgba(0,0,0,0.2)',
    },
    avaMag:{
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
        height: '6.2em',
        marginBottom: '0.8em',
    },
    overMag: {
        position: 'relative',
        overflow: 'hidden',
        height: '7em',
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
        lineHeight: 1.4,
        maxHeight: '5.8em',
        color: '#999',
        overflow: 'hidden',
        position: 'relative',
        width: '90%',
        background: 'linear-gradient(to bottom, rgba(153,153,153,1) 0%, rgba(153,153,153,0) 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
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

class CustomMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
            index: 0,
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleChange = (event, value) =>  this.setState({ index: value });
    handleChangeIndex = index => this.setState({ index });


    render() {
        const { classes } = this.props;
        const { index } = this.state;
        let articles = this.props.data.new_articles;
        let popular_articles = this.props.data.popular_articles;
        let popular_editions = this.props.data.popular_editions;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Button color="primary" className={classes.button} onClick={this.toggleDrawer('right', true)}>
                        <img className={classes.icon} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACYCAMAAAAIslH7AAAApVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+IJwP4AAAANnRSTlMA0/7d9Ri8/AIF6Q4cmu3DKBX42QmpI47iWiA4Uwu2Zk2iPvFHbUJ3h8rlEX6TL3JfxjMsr87+5sWRAAAHUElEQVQYGe3A1WKr2gIF0Ik7gRB3aZS4zP//tGt7l0WatoEA9+UM5OT0Bp5kz1WDfxjq3Ja8Qc9BhazrQq/zK1mmqo+vFqoRL0Y+f2CPxjHK1zid6/yFWutaKJc1q9X5AlXvWyiR1lb5InWtoTQDiRncJyiHefSZib1AGRqewYwMz0LhhntmJsvtBgoW3phLM0ahLI85eRYKZK5lPlG3pVv7OO52x8f2SPLrfMJYmyjOQOVX0nQcQHAdNyN+IasTFOaw5SOjOdDwhTZoynzUuaIg1oiP9EmMp+JJjY9uFoqxMpjm7xx8K177TDMWKMShwzTpAz+aRExTAhTAajKt6eIXvSbTpibed5kzRQ/xq7DGFP+At1l7ppxdvKC3YUrbwrsCn6LOAS+5bCmQ7RbetaZoPsGLBipFO7wp7lDUNvEis02R4uA9XYMCpYWXBQoFxgDvaVJgtJFB26Bgirf0FAoiDRloCgWRi3eMVQrWyKRNwfyEd3gUqAEyudYp2OMNlk7ByEImlk7ByEJ+LYWCMTIaUxD1kJvZrzMxPyAb86AyofaR34CCmoaM3DMFE+S3oGDfQEYNj4IxcrPaFIyR2YKCtYm8nCYFE2Q2oGA6RF5xjQl1icyWdSb0GHmFdybsAzK72ExsQuSlRUx0AmR27TAhacjL7TChtJBZoDChaMjLtZmIesisFzGxdZGXazMR9ZBZL2Ki4yIvTWFCCZBZ0GEi0pCXJjHRCZDZdcvEPURe4YYJ+4LMLj4T5xB5xToT9SUyW9b5SdZj5DWcUjBAZgMKpg3kZa0pGCOzBQU7E7mNKWhbyMjaUzBGbuaEglGIjDSdggny66tM2AEyCuZMqH3k11IomCCjARNy1EN+DZ2CtolMrD0FuoX8TI8CqYFMhhEFHt6xqDNhLJHJh8GEOsY7Dh0KPGQypUC54i06BR0NGfQ6FOh4z8pgor5CBjuDCeOI9wQqBZKGl2kSBfMW3mPqFNS7eNnJoGCEd3UpOrt4kbuhaIB3aQpFK7xoR5EU4l3miqL5DC9Zzik6mnjb1aaoFuMF4YaibYACTGWK9iZ+ZXkUyR6K0LcpUrv41UmlaHtBIdoyRf4Av+j6FBlrFMNVmGIP8KOBz5RIQ0G6BlP8E75njn2mGF0UZdhkmnps4BvDY51p0yEKE3T4YNTHUzOdD5QWCrRQ+WC7c/BFvN4yTVbHKJK55yM5WvQaEDRax0jmozaK5ej8quMNLpoFAJZ7GXhbfqU7KJir8xlf0m/N5kiXfD4z0lC4QOITMn8itVCCZcSMpBlKMZOYyb2PkvRuzKDpojRh0+CLjGmMEllHmy/ZLiyUa1nj7+TaDKVzxhF/IY0dVKG39vk92V67qIjprqM6n6pLaw1V0hbNiI/kqLkIUbnex9HbzPmHf/aOHz38nzS01mE26XYns0NLa+Af//jLtKzGMHav/dny49Ny1r+68bBhWaiC4wbL026qS3b934wH9bot6dPdaRa4DsoTXyar6WbO78j85G+mq8klRgkOi+bGZib2prm4okhWa1fb1plDfVtbtSwUo3UaqTJzk9VRt4W3mf2dwrcpqz7eYp5GcxbCH3WRm/WhqyzMfLS0kEu/abBQxrSP7NzVnIXzjxoyOkkshdRFFuFUZTlk1Yvxsv6ZvzDmdieS7vfNufbHeXO/S1HHnhv8Ra2P15jdLX9gRLWbt+p+XHqOhRTL6V0+uivvVlMM/qAzwCsa+zq/Y9T2p1nLwS+c1vK0P8v8Tn3fwK9iT+ZThq8vDqGFF1nh4ajPDT4l72P8IrzxKb921ExkZLqrs8+nmjF+5N74TLSfmMjFmngKn2lq+EGo84n7uIU3tBYSnxjF+NbQ41fKScObtHGHX+0b+Ia55hf+3kUBXM/nFzt8o1vnI32Cgkx0PlIHeGri84G6GqIww5XKB/YHntA2fBB9mCiOaU4UPjiH+GrNB7cWChaM+GCHL2Yq00YhCqfpTJv38SC+M82LUYLQY9rGQdqOKfLeQSliT6ZIXiHloDClGaIk4Y0pSgCBuWdK1EJpAoUpbQgCm6JtHyWa2RRtW0ismDJGqRZMOeKTplA0aqBUjRFFUYi/uhTIdh/lMvs2RQP8taFoYaJk5pGiGv7oqxRELkrXUyiYH/A/bZkJY48KeDITxhr/NdxQYB9QgYtPQa2B/5jYFOxRCY+C7RL/sZaZMPqoxExmwtgBgHmjQHJQCUehoGkC0O4UtC1UwtpTsAkBXOZMGEtU5IMC/wDgg4J7DxXpSUzISwALCqYOKuI0KRgD1p6CHapi7ihoW3BGFHRRmRMFtyFCiQl1icosVSbuMTSfiU6Ayly3TGw1uAYTkYvK9CIm6i6uFEghKqNJFLTQp2DjoDLxnYILlhScLVSmcaagjw8KdFSoRsEMSwp0VEinYIZAZsJDhaZMGC04Z36qD1ChrsFPugOcDP5VG6JCzpl/GV0Alsc/pACVukb8w7MAmI2dbZBUmwEqFtxUkoa9agD/AhfTQfhIf4XcAAAAAElFTkSuQmCC" />
                    </Button>
                    <Drawer anchor="right" classes={{ paper: classes.drawerPaper, }} open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                        <div className={classes.innerMain} >
                            <div className={classes.top}>
                                <div className={classes.closet} onClick={this.toggleDrawer('right', false)}>
                                    <span className={classes.closetLineOne} />
                                    <span className={classes.closetLineTwo} />
                                </div>
                                <p className={classes.topText}>Моя коллекция</p>
                                <div>
                                    <span />
                                </div>
                            </div>
                            <MuiThemeProvider theme={theme}>
                                <div style={styles.main}>
                                    <span style={styles.arrowTop} />
                                    <Tabs indicatorColor="none" fullWidth value={index} onChange={this.handleChange} style={styles.tabs}>
                                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="журналы" style={styles.tabsItem} />
                                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="статьи" style={styles.tabsItem} />
                                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="обсуждения" style={styles.tabsItem} />
                                    </Tabs>
                                    <SwipeableViews animateHeight enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
                                        <div style={styles.main}>
                                            {SUtils.any(popular_editions) ? popular_editions.map((popular_edition, currentIndex) =>
                                                <div style={styles.item} key={String(currentIndex)}>
                                                    <div style={Object.assign({}, styles.avaMag, {backgroundImage:'url(' + popular_edition.image_path + ')' })} />
                                                    <div style={styles.inner}>
                                                        <div style={styles.overMag}>
                                                            <h3 style={styles.title}>{popular_edition.name}</h3>
                                                        </div>
                                                        <p style={styles.caption}>
                                                            <span>{popular_edition.bundle.name}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div style={styles.main}>
                                            {SUtils.any(articles) ? articles.map((article, currentIndex) =>
                                                <div style={styles.item} key={String(currentIndex)}>
                                                    <div style={Object.assign({}, styles.ava, {backgroundImage:'url(' + article.image_path + ')' })} />
                                                    <div style={styles.inner}>
                                                        <div style={styles.over}>
                                                            <h3 style={styles.title}>{article.title}</h3>
                                                            <p style={styles.text}>{article.text}</p>
                                                        </div>
                                                        <div>
                                                            <p style={styles.caption}>
                                                                <span>{article.journal_name}, </span>
                                                                <span>{article.date}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div style={styles.main}>
                                            {SUtils.any(popular_articles) ? popular_articles.map((popular_article, currentIndex) =>
                                                <div style={styles.item} key={String(currentIndex)}>
                                                    <div style={Object.assign({}, styles.ava, {backgroundImage:'url(' + popular_article.image_path + ')' })} />
                                                    <div style={styles.inner}>
                                                        <div style={styles.over}>
                                                            <h3 style={styles.title}>{popular_article.title}</h3>
                                                            <p style={styles.text}>{popular_article.text}</p>
                                                        </div>
                                                        <div>
                                                            <p style={styles.caption}>
                                                                <span>{popular_article.journal_name}, </span>
                                                                <span>{popular_article.date}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
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

export default withStyles(styles)(CustomMenu);