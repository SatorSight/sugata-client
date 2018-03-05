import React, {Component} from 'react';
import BundleMenu from './BundleMenu';


const styles = {
    header: {
        width: '100%',
        position: 'relative',
        background: '#000',
    },
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 10,
        backgroundSize: 'cover',
        boxShadow: 'inset 0 -5em 4em -4em rgba(0,0,0,1)',
        overflow: 'hidden',
    },
    bg: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 10,
        backgroundSize: 'cover',
        opacity: 0.4,
        overflow: 'hidden',
        backgroundImage:'url("/images/header.jpg")'
    },
    colorOne: {
        position: 'absolute',
        left: '0',
        bottom: '-100%',
        width: '100%',
        height: '200%',
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.8,
    },
    colorTwo: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '50%',
        height: '100%',
        zIndex: 20,
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    },
    colorThree: {
        position: 'absolute',
        right: '-25%',
        top: '40%',
        width: '100%',
        height: '100%',
        zIndex: 15,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
    },
    inner: {
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    h1: {
        fontSize: '1.2em',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        padding: '0.6em 1.4em 1.5em',
        margin: '0 auto 7em',
        position: 'relative',
        zIndex: 30,
    },
    h2: {
        fontSize: '0.85em',
        letterSpacing: '0.4em',
        margin: '3em auto 0',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        opacity: 0.5,
    },
    arrow:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '0.1em',
        background: 'url("../images/arrow-h.svg") no-repeat 50% 50%',
        backgroundSize: 'contain',
        opacity: 0.6,
    },
    iconMenu:{
        position: 'absolute',
        left: 0,
        top: '2em',
        zIndex: 50,
    },
    swiperTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '-3em',
        zIndex: 10,
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontWeight: 400,
        padding: '2.41em 0 1.3em',
        letterSpacing: '0.15em',
        textAlign: 'center',
    },
    main: {
        backgroundColor: '#FFF',
        overflow: 'hidden',
        position: 'relative',
    },
    over: {
        overflow: 'hidden',
        position: 'relative',
    },
    swiper: {
        zIndex: 20,
        position: 'relative',
        overflowX: 'none',
        width: '100%',
    },
    item: {
        margin: '0 0.7em 3em',
        height: '12em',
        position: 'relative',
        width: '30em',
        overflow: 'hidden',
        borderRadius: '1em',
        boxShadow: '0 1.5em 3em -1.5em rgba(0,0,0,0.8)',
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
    owlMask: {
        zIndex: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
};
class BundleHeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={styles.header}>
                <div style={styles.header}>
                    <div style={styles.mask}>
                        <div style={styles.bg} />
                        <div style={styles.colorOne} />
                        <div style={styles.colorTwo} />
                        <div style={styles.colorThree} />
                    </div>
                    <div style={styles.inner}>
                        <div style={styles.iconMenu}>
                            <BundleMenu data={this.props.data}/>
                        </div>
                        <h2 style={styles.h2}>киоск плюс</h2>
                        <h1 style={styles.h1}>технологии и игры<span style={styles.arrow} /></h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default BundleHeader;