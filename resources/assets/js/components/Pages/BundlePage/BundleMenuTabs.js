import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import BundleMenuShowcase from './BundleMenuShowcase';
import BundleMenuSettings from './BundleMenuSettings';

const fontWeightMedium = 400;

const styles = {
    main: {
    },
    tabs: {
        position: 'relative',
        overflow: 'hidden',
    },
    tabsItem: {
        fontWeight: 200,
        color: '#FFF',
        letterSpacing: '0.3em',
        padding: '2em 0',
        height: '6.6em',
    },
    activeItem: {
        color: '#999',
        fontWeight: '300 !important',
    },
    arrowTop:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '0.1em',
        background: 'url("/images/arrow-h.svg") no-repeat 50% 50%',
        backgroundSize: 'contain',
        opacity: 0.4,
        display: 'block',
    },
    arrowBot:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '0.1em',
        background: 'url("/images/arrow-h.svg") no-repeat 50% 50%',
        backgroundSize: 'contain',
        opacity: 0.8,
        display: 'block',
    },
};
const theme = createMuiTheme({
    typography: {
        fontFamily:'HelveticaNeueCyr, arial, serif',
        fontWeightMedium,
        fontSize: '1.2em',
        body1: {
            fontWeight: fontWeightMedium,
        },
    },
});
class BundleMenuTabs extends Component {
    constructor(props){
        super(props);

        this.state = {
            index: 0,
        };
    }

    handleChange = (event, value) =>  this.setState({ index: value });
    handleChangeIndex = index => this.setState({ index });

    render() {
        const { index } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <div style={styles.main}>
                    <Tabs indicatorColor="none" fullWidth value={index} onChange={this.handleChange} style={styles.tabs}>
                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="витрина" style={styles.tabsItem} />
                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="баланс" style={styles.tabsItem} />
                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="настройки" style={styles.tabsItem} />
                        <span style={styles.arrowTop} />
                        <span style={styles.arrowBot} />
                    </Tabs>
                    <SwipeableViews animateHeight enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
                        <BundleMenuShowcase data={this.props.data} />
                        <BundleMenuSettings />
                    </SwipeableViews>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(BundleMenuTabs);