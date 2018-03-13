import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const STYLES = {
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0',
    margin: '0',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1500',
    top: '0',
    left: '0'
};
const ON = {display: 'flex'};
const OFF = {display: 'none'};

const styles = theme => ({
    progress: {
        // margin: theme.spacing.unit * 2,
    },
});

class Waiter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            enabled: props.enabled,
            waiter_styles: this.off_styles()
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.enabled !== nextProps.enabled)
            this.setState({
                enabled: nextProps.enabled,
                waiter_styles: nextProps.enabled ? this.on_styles() : this.off_styles()
            });
    }

    on_styles = () => Object.assign({}, STYLES, ON);
    off_styles = () => Object.assign({}, STYLES, OFF);

    render() {
        const { classes } = this.props;
        return (
            <div style={this.state.waiter_styles}>
                <CircularProgress size={300} thickness={2} />
            </div>
        )
    }
}

export default withStyles(styles)(Waiter);