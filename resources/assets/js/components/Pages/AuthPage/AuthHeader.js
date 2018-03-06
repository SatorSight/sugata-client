import React, {Component} from 'react';
import InputMask from 'react-input-mask';
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
        left: '-15em',
        top: '3em',
        width: '32em',
        height: '25em',
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(96,147,166,1) 10%, rgba(96,147,166,0) 60%)',
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
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    h1: {
        fontFamily: 'Montserrat',
        fontWeight: 200,
        fontSize: '2.6em',
        letterSpacing: '0.35em',
        textIndent: '0.54em',
        textTransform: 'uppercase',
        color: '#FFF',
        display: 'inline-block',
        padding: '0.48em 0 1.2em',
        margin: '1em auto 0.3em',
        position: 'relative',
        zIndex: 30,
    },
    arrow: {
        position: 'absolute',
        left: '14%',
        right: '14%',
        bottom: 0,
        height: '0.05em',
        background: 'url("../images/arrow-h.svg") no-repeat 50% 50%',
        backgroundSize: '100% 100%',
        opacity: 0.6,
    },
    fot: {
        position: 'relative',
        zIndex: 50,
        overflow: 'hidden',
        paddingLeft: '1.8em',
    },
    text: {
        textTransform: 'uppercase',
        textAlign: 'left',
        letterSpacing: '0.2em',
        fontStretch: 'ultra-condensed',
        margin: '0.8em 0 1.6em',
        fontSize: '1.1em',
        fontFamily: 'Montserrat',
        fontWeight: 200,
        color: '#FFF',
    },
    content: {
        backgroundColor: '#FFF',
        margin: '0 0.3em 1em',
        padding: '3.7em 1.4em 8em',
        borderRadius: '0.5em',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 60,
    },
    h2: {
        fontSize: '2.2em',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 1.05,
        position: 'relative',
        zIndex: 60,
    },
    divInput: {
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        maxWidth: '30em',
        margin: '3.1em auto 0',
    },
    inputMask: {
        width: '90%',
        position: 'relative',
        padding: '1.68em 5% 0.62em',
        border: 0,
        backgroundColor: '#DDD',
        wordSpacing: '0,2em',
        borderRadius: '0.1em',
        fontSize: '1.55em',
        color: '#000',
    },
    spanInput: {
        zIndex: 20,
        position: 'absolute',
        top: '1.2em',
        left: '1.8em',
        color: '#999',
        fontSize: '0.9em',
        fontWeight: 300,
        letterSpacing: '0.04em',
        pointerEvents: 'none',
    },
    divButton: {
        position: 'relative',
        overflow: 'hidden',
    },
    button: {
        background: 'linear-gradient(to bottom, rgba(44,65,113,1) 0%, rgba(47,53,101,1) 100%)',
        color: '#FFF',
        border: 0,
        borderRadius: '4em',
        position: 'relative',
        zIndex: '20',
        width: '88%',
        margin: '0.8em 6% 1.5em',
        paddingBottom: '0.1em',
        lineHeight: 4,
        fontSize: '1.25em',
        letterSpacing: '0.04em',
        fontWeight: 400,
        cursor: 'pointer',
    },
    shadowButton: {
        position: 'absolute',
        zIndex: '10',
        width: '64%',
        left: '18%',
        height: '4em',
        bottom: '1em',
        borderRadius: '2em',
        backgroundColor: '#ABB0B8',
        filter: 'blur(4px)',
    },
    mag: {
        position: 'absolute',
        overflow: 'hidden',
        height: '8em',
        width: '8em',
        zIndex: '2',
    },
    magOne: {
        right: 0,
        top: 0,
        background: 'url(mag1.png) no-repeat 0 100%',
        backgroundSize: 'contain',
    },
    magTwo: {
        right: 0,
        bottom: 0,
        background: 'url(mag2.png) no-repeat 100% 100%',
        backgroundSize: 'contain',
    },
    magThree: {
        left: 0,
        bottom: 0,
        background: 'url(mag3.png) no-repeat 0 100%',
        backgroundSize: 'contain',
    },
    magFour: {
        left: 0,
        top: 0,
        background: 'url(mag4.png) no-repeat 0 0',
        backgroundSize: 'contain',
    },
};
class AuthHeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={styles.header}>
                <div style={styles.mask}>
                    <div style={styles.bg} />
                    <div style={styles.colorTwo} />
                    <div style={styles.colorThree} />
                </div>
                <div style={styles.inner}>
                    <div style={styles.colorOne} />
                    <h1 style={styles.h1}>киоск плюс<span style={styles.arrow} /></h1>
                    <div style={styles.fot}>
                        <p style={styles.text}>вход</p>
                    </div>
                    <div style={styles.content}>
                        <div style={Object.assign({}, styles.mag, styles.magOne)} />
                        <div style={Object.assign({}, styles.mag, styles.magTwo)} />
                        <div style={Object.assign({}, styles.mag, styles.magThree)} />
                        <div style={Object.assign({}, styles.mag, styles.magFour)} />
                        <h2 style={styles.h2}>Добро пожаловать<br />в Киоск!</h2>
                        <div style={styles.divInput}>
                            <span style={styles.spanInput}>Ваш номер телефона</span>
                            <InputMask style={styles.inputMask} {...this.props} mask="+7 (999) 999-99-99" placeholder="+7 (   )    -  -  " maskChar=" " />
                            <div style={styles.divButton}>
                                <button style={styles.button}>Войти</button>
                                <div style={styles.shadowButton} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthHeader;