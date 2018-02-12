import React, { Component } from 'react';
import PaginationDot from './PaginationDot';

const styles = {
    root: {
        position: 'absolute',
        width: '7em',
        textAlign: 'center',
        bottom: '1.5em',
        left: '2em',
        flexDirection: 'row',
    },
};

class Pagination extends Component {
    handleClick = (event, index) => {
        this.props.onChangeIndex(index);
    };

    render() {
        const { index, dots } = this.props;

        const children = [];

        for (let i = 0; i < dots; i += 1) {
            children.push(
                <PaginationDot key={i} index={i} active={i === index} onClick={this.handleClick} />,
            );
        }

        return <div style={styles.root}>{children}</div>;
    }
}

export default Pagination;