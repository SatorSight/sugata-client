import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

const styles = {
    line: {
        width: '40%',
        height: 0,
        borderWidth: '1px 70px 1px 70px',
        borderStyle: 'solid',
        borderBottom: '1px solid',
        borderColor: 'transparent',
    },
    lineContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
};

class Line extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return <div style={styles.lineContainer}>
            <div style={Object.assign(
                {},
                styles.line,
                { borderBottomColor: this.props.color || 'white' },
                { ...this.props.style },
            )}></div>
        </div>
    }
}

Line.propTypes = {
    color: PropTypes.string,
    style: PropTypes.object,
};

export default Line;