import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
    swiper: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 10,
    },
    item: {
        width: '100%',
        height: '20em',
        overflow: 'hidden',
        position: 'relative',
    },
    mask: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%)',
    },
    bg: {
        width: '100%',
        pointerEvents: 'none',
        position: 'absolute',
        textAlign: 'center',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
    },
};
class PopularTop extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SwipeableViews style={styles.swiper} enableMouseEvents index={this.props.active} onChangeIndex={this.props.changer} onSwitching={this.props.changer}>
                {this.props.journals.map(journal =>
                    <div style={styles.item} key={journal.id}>
                        <div style={styles.mask} />
                        <img style={styles.bg} src={journal.image} alt={journal.title} />
                    </div>
                )}
            </SwipeableViews>
        );
    }
}


export default PopularTop;