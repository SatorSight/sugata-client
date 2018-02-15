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
        paddingTop: 20,
    },
    tabs: {
        background: '#fff',
        color: '#000',
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
            index: 0,
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

    render() {
        const { index } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <div style={styles.main}>
                    <Tabs indicatorColor="none" value={index} onChange={this.handleChange} style={styles.tabs}>
                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem}} label="Новое" style={styles.tabsItem} />
                        <Tab classes={{ rootInheritSelected: this.props.classes.activeItem, }} label="Популярное" style={styles.tabsItem} />
                    </Tabs>
                    <SwipeableViews enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
                        <NewArticles controls={this.props.controls} data={this.props.data}/>
                        <PopularArticles controls={this.props.controls} data={this.props.data}/>
                    </SwipeableViews>
                </div>
            </MuiThemeProvider>
        );
    }
}

// export default MainTabs;
export default withStyles(styles)(MainTabs);