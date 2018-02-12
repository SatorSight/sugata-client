import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';

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

class PopularMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SwipeableViews style={styles.swiper} enableMouseEvents index={this.props.active} onChangeIndex={this.props.changer} onSwitching={this.props.changer}>
                {this.props.journals.map((journal, index) =>
                    <div style={styles.item} key={index}>
                        <div style={styles.mask} />
                        <img style={styles.img} src={journal.main_image} alt={journal.title} />
                        <div style={Object.assign({}, styles.logo, {backgroundImage:'url(' + journal.image + ')' })} />
                    </div>
                )}
            </SwipeableViews>
        );
    }
}

export default PopularMain;