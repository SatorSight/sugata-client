import React, { PureComponent } from 'react';
import NavMenu from '../../containers/NavMenu';
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Line from '../Helpers/Line';

const menuButtonWidth = '2.5rem';

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom: '2em',
    },
    subHeader: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '2rem',
        fontSize: '0.8rem',
        fontWeight: 400
    },
    menuButton: {
        width: menuButtonWidth,
        display: 'block',
    },
    customMenuButton: {
        width: menuButtonWidth,
        display: 'block',
    },
    title: {
        fontSize: '2rem',
        letterSpacing: '0.1rem',
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: 900,
        fontFamily: 'Montserrat',
    },
    container: {
        // marginBottom: '1em',
        position: 'relative',
        zIndex: 50,
        background: 'white',
    },
};

class Header extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container + ' header-container'}>
                <h2 className={classes.subHeader}>
                    Популярнейшие российские издания
                </h2>
                <div className={classes.header}>
                    <div className={classes.menuButton}>
                        <NavMenu />
                    </div>
                    <Link to="/">
                        <h1 className={classes.title}>
                            Киоск Плюс
                        </h1>
                    </Link>
                    <div className={classes.customMenuButton}></div>
                </div>
                {/*<Line color={'blue'} style={{opacity: '0.3'}} />*/}
            </div>
        );
    }
}

export default withStyles(styles)(Header);