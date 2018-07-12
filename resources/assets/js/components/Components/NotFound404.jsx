import React, { PureComponent } from "react";
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
    notFound: {
        textAlign: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        margin: '1em 0',
        fontFamily: 'Montserrat',
        fontWeight: 900,
        fontSize: '3em',
    },
    link: {
        color: 'black',
        fontSize: '2em',
        textDecoration: 'underline',
    }
};

const mapStateToProps = (state, ownProps) => ({
    loading: state.server.loading,
});

class NotFound404 extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            !this.props.loading && <div className={classes.notFound}>
                <h1 className={classes.h1}>404 <br/> Страница не найдена</h1>
                <a className={classes.link} href="/">На главную</a>
            </div>
        );
    }
}

NotFound404.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
};

export default connect(
    mapStateToProps,
    // mapDispatchToProps,
)(withStyles(styles)(NotFound404));