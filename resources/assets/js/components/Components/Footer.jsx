import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import Licence from '../Components/Licence';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
    footer: {
        background: 'rgb(51,51,51)',
    },
    title: {
        padding: '2em',
    },
    titleLink: {
        color: 'rgb(255,255,255)',
        textTransform: 'uppercase',
        fontSize: '1.5rem',
        fontFamily: 'Montserrat',
        fontWeight: 500,
    },
    text: {
        background: 'black',
        padding: '1rem 0 0.1rem 1.5rem',
    },
    p: {
        color: 'rgb(175,175,175)',
        fontSize: '0.8rem',
        marginBottom: '1rem',
        lineHeight: '1.2',
    },

};

class IndexFooter extends PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.footer}>
                <div className={classes.title}>
                    <Link className={classes.titleLink} to="/">
                        Киоск Плюс
                    </Link>
                </div>
                <div className={classes.menu}>
                    <Licence />
                </div>
                <div className={classes.text}>
                    <p className={classes.p}>Все права зарегистрированы, копирование <br/> информации строго запрещено.</p>
                    <p className={classes.p}>Киоск Плюс, {(new Date()).getFullYear()}</p>
                </div>
            </div>
        );
    }
}

IndexFooter.propTypes = {};

export default withStyles(styles)(IndexFooter);