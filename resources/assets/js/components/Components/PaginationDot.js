import React, { Component } from 'react';

const styles = {
    root: {
        height: 9,
        width: 9,
        textAlign: 'center',
        cursor: 'pointer',
        border: 0,
        background: 'none',
        padding: 0,
        display: 'inline',
    },
    dot: {
        border: '0.5px solid #6DA8D6',
        height: 5,
        width: 5,
        borderRadius: 5,
        margin: 1,
    },
    active: {
        backgroundColor: '#6DA8D6',
    },
};

class PaginationDot extends Component {
    handleClick = event => {
        this.props.onClick(event, this.props.index);
    };

    render() {
        const { active } = this.props;

        let styleDot;

        if (active) {
            styleDot = Object.assign({}, styles.dot, styles.active);
        } else {
            styleDot = styles.dot;
        }

        return (
            <button style={styles.root} onClick={this.handleClick}>
                <div style={styleDot} />
            </button>
        );
    }
}

export default PaginationDot;