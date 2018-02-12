import React, { Component } from "react";
import PopularTop from './PopularTop';
import PopularMain from './PopularMain';
// import fixtures from './fixtures';
const styles = {
    issuesSwiper: {
        backgroundColor: '#FFF',
        overflow: 'hidden',
        position: 'relative',
    },
    over: {
        overflow: 'hidden',
        position: 'relative',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontWeight: 400,
        padding: '2.41em 0 1.3em',
        letterSpacing: '0.15em',
        textAlign: 'center',
    },
};
class PopularJournals extends React.Component {

    constructor(props) {
        super(props);

        // const first_fixture_id = Math.floor(fixtures.length/2);
        const first_fixture_id = 1;

        this.state = {
            index: first_fixture_id,
        };
    }

    handleChangeIndex = index => {
        this.setState({ index });
    };

    render() {
        return (
            <div style={styles.issuesSwiper}>
                <h3 style={styles.title}>Популярные издания</h3>
                <div style={styles.over}>
                    <PopularTop key={PopularTop} active={this.state.index} /*fixtures={fixtures}*/ changer={this.handleChangeIndex} onSwitching={this.handleChangeIndex} />
                    <PopularMain key={PopularMain} active={this.state.index} /*fixtures={fixtures}*/ changer={this.handleChangeIndex} onSwitching={this.handleChangeIndex} />
                </div>
            </div>
        );
    }
}
export default PopularJournals;

