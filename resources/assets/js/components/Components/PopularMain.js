import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom'

const styles = {
    swiper: {
        padding: '0 12%',
        zIndex: 20,
        position: 'relative',
        maxWidth: '40em',
        overflowX: 'none',
        margin: '0 auto',
    },
    item: {
        margin: '2em 0.7em 6em',
        display: 'block',
        height: '12em',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1em',
        boxShadow: '0 2em 3em -1.5em rgba(0,0,0,0.8)',
    },
    mask: {
        zIndex: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    img: {
        width: '100%',
        pointerEvents: 'none',
        position: 'absolute',
        textAlign: 'center',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
    },
    logo: {
        width: '50%',
        height: '50%',
        position: 'absolute',
        left: '25%',
        top: '25%',
        zIndex: 50,
        textAlign: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundSize: 'contain',
    },
};

let links_clickable = true;

class PopularMain extends React.Component {
    constructor(props) {
        super(props);
    }

    linkClickHandler = (e) => {
        if(!links_clickable)
            e.preventDefault();
    };

    proxyChanger = (index, type) => {
        this.disableClicking();
        this.props.changer(index, type);
    };

    restoreClicking = () => links_clickable = true;
    disableClicking = () => links_clickable = false;

    render() {
        return (
            <SwipeableViews
                            onTransitionEnd={this.restoreClicking}
                            style={styles.swiper}
                            enableMouseEvents
                            index={this.props.active}
                            onSwitching={this.proxyChanger}
            >
                {this.props.journals.map((journal, index) =>
                    <Link draggable={false} onClick={this.linkClickHandler} key={index} to={`/journal/${journal.id}`} style={styles.item}>
                            <div style={styles.mask} />
                            <img style={styles.img} src={journal.additional_image_path} alt={journal.title} />
                            <div style={Object.assign({}, styles.logo, {backgroundImage:'url(' + journal.logo_path + ')' })} />
                    </Link>
                )}
            </SwipeableViews>
        );
    }
}

export default PopularMain;