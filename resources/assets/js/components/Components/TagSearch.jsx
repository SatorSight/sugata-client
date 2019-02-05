import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
    input: {
        backgroundColor: '#FFFFFF',
        border: 'solid 1px #8C8C8C',
        fontSize: '18px',
        color: '#000000',
        borderRadius: '1px',
        padding: '0.5em',
        width: '70%',
        marginBottom: '1em',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
};

class TagSearch extends Component {
    constructor(props){
        super(props);
    }

    change = e => this.props.set_phrase(e.target.value);

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.container}>
                    <input
                        placeholder="Начните, а мы подскажем"
                        className={classes.input}
                        onChange={this.change}
                        type="text"
                        value={this.props.phrase}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TagSearch);