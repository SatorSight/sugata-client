import React, { Component } from "react";
import PopularTop from './PopularTop';
import PopularMain from './PopularMain';
import * as SUtils from './../Helpers/SUtils';

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
class PopularJournals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };
    }

    componentWillReceiveProps(nextProps){
        const journals = nextProps.journals;
        const index = SUtils.any(journals) ? Math.floor(journals.length/2) : 1;
        this.setState({ index });
    }

    handleChangeIndex = index => {
        this.setState({ index });
    };

    render() {
        const journals = this.props.journals;
        // let index = SUtils.any(journals) ? Math.floor(journals.length/2) : 1;
        return (
            <div style={styles.issuesSwiper}>
                <h3 style={styles.title}>Популярные издания</h3>
                {SUtils.any(journals) ? <div style={styles.over}>
                    <PopularTop active={this.state.index} journals={journals}/>
                    <PopularMain active={this.state.index} journals={journals} changer={this.handleChangeIndex}/>
                </div> : null }
            </div>
        );
    }
}
export default PopularJournals;

