import React, {Component} from 'react';
import * as SUtils from "../../Helpers/SUtils";


const styles = {
    header: {
        width: '100%',
        position: 'relative',
        background: '#000',
        overflow: 'hidden',
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
        opacity: 0.6,
        overflow: 'hidden',
        backgroundImage:'url("/images/header.jpg")'
    },
    colorOne: {
        position: 'absolute',
        left: '-50%',
        top: '3em',
        width: '100%',
        height: '100%',
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(96,147,166,1) 0%, rgba(96,147,166,0) 70%)',
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
        fontSize: '2.5em',
        letterSpacing: '0.5em',
        textIndent: '0.5em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        padding: '0.7em 0 1.3em',
        margin: '1em auto 0.2em',
        position: 'relative',
        zIndex: 30,
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
    fot: {
        position: 'relative',
        zIndex: 50,
        overflow: 'hidden',
    },
    text: {
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: '0.3em',
        fontStretch: 'ultra-condensed',
        lineHeight: 3.2,
        fontSize: '1.2em',
        color: '#FFF',
        fontWeight: '200',
    },
    content: {
        backgroundColor: '#FFF',
        margin: '0 0.3em 1em',
        padding: '3em',
        borderRadius: '0.4em',
        position: 'relative',
        zIndex: 60,
    }
};
class LoginHeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={styles.header}>
                <div style={styles.mask}>
                    <div style={styles.bg} />
                    <div style={styles.colorOne} />
                    <div style={styles.colorTwo} />
                    <div style={styles.colorThree} />
                </div>
                <div style={styles.inner}>
                    <div style={styles.iconMenu}>
                    </div>
                    <h2 style={styles.h1}>киоск плюс<span style={styles.arrow} /></h2>
                </div>
                <div style={styles.fot}>
                    <p style={styles.text}>вход</p>
                </div>
                <div style={styles.content}>
                    <h2>Добро пожаловать<br />в Киоск!</h2>
                </div>
            </div>
        );
    }
}

export default LoginHeader;