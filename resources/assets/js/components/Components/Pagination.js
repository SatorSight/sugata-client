import React, { PureComponent } from 'react';
import PaginationDot from './PaginationDot';

const styles = {
    root: {
        position: 'absolute',
        width: '7em',
        textAlign: 'center',
        bottom: '2.5em',
        left: '2em',
        flexDirection: 'row',
    },
};

class Pagination extends PureComponent {
    handleClick = (event, index) => this.props.onChangeIndex(index);

    render() {
        const { index, dots } = this.props;
        const children = [];

        for (let i = 0; i < dots; i++) {
            children.push(
                <PaginationDot key={`pagination_dot_${i}`} index={i} active={i === index} onClick={this.handleClick} />,
            );
        }

        return <div style={styles.root}>{children}</div>;
    }
}

export default Pagination;