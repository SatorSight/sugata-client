import React, {Component} from 'react';
import InputMask from 'react-input-mask';
import IndexMenu from '../MainPage/IndexMenu';
import * as SUtils from "../../Helpers/SUtils";


const styles = {
    header: {
        width: '100%',
        minHeight: '100vh',
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
        overflow: 'hidden',
        background:'url("/images/header.jpg") 50% 0 no-repeat',
        backgroundSize: '100% auto',
    },
    colorOne: {
        position: 'absolute',
        left: '-50%',
        top: 0,
        width: '100%',
        maxWidth: '70em',
        height: '100%',
        zIndex: 20,
        background: 'radial-gradient(ellipse at center, rgba(0,124,192,1) 0%, rgba(57,0,174,0.4) 50%, rgba(57,0,174,0) 70%)',
        opacity: 0.6,
    },
    colorTwo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '2em',
        zIndex: 20,
        background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        opacity: 0.6,
    },
    colorThree: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: '22em',
        bottom: 0,
        background: '#000',
        zIndex: 15,
        boxShadow: '0 0 20em 10em #000',
    },
    inner: {
        position: 'relative',
        maxWidth: '40em',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    h1: {
        fontFamily: 'Montserrat',
        fontSize: '2em',
        fontWeight: 200,
        letterSpacing: '0.3em',
        textIndent: '0.2em',
        textTransform: 'uppercase',
        color: '#FFF',
        display: 'inline-block',
        padding: '0.7em 1.5em 0.68em',
        margin: '4em auto',
        position: 'relative',
        zIndex: 30,
    },
    arrow: {
        position: 'absolute',
        left: '8%',
        right: '8%',
        bottom: 0,
        height: '0.05em',
        background: 'url("../images/arrow-h.svg") no-repeat 50% 100%',
        backgroundSize: 'contain',
        opacity: 0.6,
    },
    content: {
        backgroundColor: '#FFF',
        margin: '0 0.3em 1em',
        padding: '4em 1.4em 6em',
        borderRadius: '0.5em',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 60,
    },
    h2: {
        fontSize: '1.7em',
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: 1.05,
        position: 'relative',
        zIndex: 60,
        letterSpacing: '0.02em',
    },
    divInput: {
        overflow: 'hidden',
        position: 'relative',
        margin: '3.1em 1.8em 0',
    },
    inputMask: {
        width: '90%',
        position: 'relative',
        padding: '0.08em 5% 2.22em',
        border: 0,
        backgroundColor: '#FFF',
        wordSpacing: '0,2em',
        borderRadius: '0.1em',
        fontSize: '1.55em',
        color: '#000',
        textAlign: 'center',
    },
    spanInput: {
        zIndex: 20,
        position: 'absolute',
        top: '3em',
        borderTop: '0.05em solid #8B8B8B',
        lineHeight: 2,
        left: 0,
        right: 0,
        color: '#939393',
        fontSize: '0.85em',
        fontWeight: 300,
        letterSpacing: '0.04em',
        pointerEvents: 'none',
        textAlign: 'center',
    },
    divButton: {
        position: 'relative',
        overflow: 'hidden',
    },
    button: {
        background: 'linear-gradient(to bottom, rgba(38,45,48,1) 0%, rgba(38,31,40,1) 100%)',
        color: '#FFF',
        border: 0,
        borderRadius: '4em',
        position: 'relative',
        zIndex: '20',
        width: '100%',
        margin: '0.9em 0 1.5em',
        lineHeight: 3.7,
        paddingBottom: '0.1em',
        fontSize: '1.2em',
        fontWeight: 500,
        cursor: 'pointer',
        letterSpacing: '0.045em',
    },
    shadowButton: {
        position: 'absolute',
        zIndex: '10',
        width: '74%',
        left: '13%',
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
    iconMenu:{
        position: 'absolute',
        left: 0,
        top: '8em',
        // marginTop: '-2.4em',
        zIndex: 50,
        opacity: .6,
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
                    <div style={styles.colorOne} />
                    <div style={styles.colorTwo} />
                    <div style={styles.colorThree} />
                </div>
                <div style={styles.inner}>
                    <div style={styles.iconMenu}>
                        <IndexMenu data={this.props.data} />
                    </div>
                    <h1 style={styles.h1}>киоск плюс<span style={styles.arrow} /></h1>
                    <div style={styles.content}>
                        <div style={Object.assign({}, styles.mag, styles.magOne)} />
                        <div style={Object.assign({}, styles.mag, styles.magTwo)} />
                        <div style={Object.assign({}, styles.mag, styles.magThree)} />
                        <div style={Object.assign({}, styles.mag, styles.magFour)} />
                        <h2 style={styles.h2}>Вход и регистрация</h2>
                        <div style={styles.divInput}>
                            <span style={styles.spanInput}>Ваш номер телефона</span>
                            <InputMask style={styles.inputMask} {...this.props} mask="+7 (999) 999-99-99" placeholder="+7 (   )    -  -  " maskChar=" " />
                            <div style={styles.divButton}>
                                <button style={styles.button}>Проверить номер</button>
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