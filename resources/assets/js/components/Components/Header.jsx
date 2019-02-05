import React, { PureComponent } from 'react';
import NavMenu from '../../containers/NavMenu';
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import ListingMenu from '../../containers/ListingMenu';

// import Line from '../Helpers/Line';

const menuButtonWidth = '2.5rem';

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: '8vw',
        letterSpacing: '0.1rem',
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: 900,
        fontFamily: 'Montserrat',
    },
    container: {
        position: 'relative',
        zIndex: 50,
        background: 'white',
        // height: '8em',
        paddingBottom: '2em',
    },
};

const search_icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>;

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
                    <ListingMenu />
                    <div className={classes.customMenuButton}>
                        <Link style={{cursor: 'pointer'}} to={`/tag_search/`}>
                            {search_icon}
                        </Link>
                    </div>
                </div>
                {/*<Line color={'blue'} style={{opacity: '0.3'}} />*/}
            </div>
        );
    }
}

Header.propTypes = {};

export default withStyles(styles)(Header);