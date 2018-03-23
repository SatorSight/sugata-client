import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import NewArticles from './NewArticles';
import PopularArticles from './PopularArticles';

const fontWeightMedium = 400;

const styles = {
    main: {
        background: '#fff',
        paddingTop: '1em',
    },
    tabs: {
        background: '#fff',
        color: '#000',
        margin: '0em 0 -1.2em 0.6em',
    },
    tabsItem: {
        height: '30px',
        letterSpacing: '1px',
        paddingTop: 3,
    },
    activeItem: {
        color: '#79608C',
    },
};
const theme = createMuiTheme({
    typography: {
        fontFamily:'HelveticaNeueCyr, arial, serif',
        fontWeightMedium,
        padding: 2,
        body1: {
            fontWeight: fontWeightMedium,
        },
    },
});
class MainTabs extends Component {

    constructor(props){
        super(props);

        this.state = {
            index: this.props.initialIndex ? this.props.initialIndex : 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    //todo rewrite render methods below

    renderTabs = () => {
        if(this.props.onlyFirst)
            return <Tabs indicatorColor="none" value={this.state.index} onChange={this.handleChange} style={styles.tabs}>
                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="Новое" style={styles.tabsItem} />
                    </Tabs>;
        if(this.props.onlySecond)
            return <Tabs indicatorColor="none" value={this.state.index} onChange={this.handleChange} style={styles.tabs}>
                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem, }} label="Популярное" style={styles.tabsItem} />
                   </Tabs>;
        return <Tabs indicatorColor="none" value={this.state.index} onChange={this.handleChange} style={styles.tabs}>
                    <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="Новое" style={styles.tabsItem} />
                    <Tab classes={{ rootInheritSelected: this.props.classes.activeItem, }} label="Популярное" style={styles.tabsItem} />
               </Tabs>
    };

    renderViews = () => {
        if(this.props.onlyFirst)
            return <SwipeableViews animateHeight enableMouseEvents index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                        <NewArticles controls={this.props.controls} data={this.props.data}/>
                   </SwipeableViews>;
        if(this.props.onlySecond)
            return <SwipeableViews animateHeight enableMouseEvents index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                        <PopularArticles controls={this.props.controls} data={this.props.data}/>
                   </SwipeableViews>;
        return <SwipeableViews animateHeight enableMouseEvents index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                    <NewArticles controls={this.props.controls} data={this.props.data}/>
                    <PopularArticles controls={this.props.controls} data={this.props.data}/>
               </SwipeableViews>
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div style={styles.main}>
                    {this.renderTabs()}
                    {/*<Tabs indicatorColor="none" value={index} onChange={this.handleChange} style={styles.tabs}>*/}
                        {/*{this.props.onlySecond ? null : }*/}
                        {/*{this.props.onlyFirst ? null : }*/}
                    {/*</Tabs>*/}
                    {this.renderViews()}
                    {/*<SwipeableViews animateHeight enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>*/}
                        {/*{this.props.onlySecond ? null : <NewArticles controls={this.props.controls} data={this.props.data}/>}*/}
                        {/*{this.props.onlyFirst ? null : <PopularArticles controls={this.props.controls} data={this.props.data}/>}*/}
                    {/*</SwipeableViews>*/}
                </div>
            </MuiThemeProvider>
        );
    }
}

// export default MainTabs;
export default withStyles(styles)(MainTabs);