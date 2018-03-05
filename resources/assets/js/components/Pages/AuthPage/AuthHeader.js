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
        overflow: 'hidden',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    h1: {
        fontSize: '2.6em',
        letterSpacing: '0.46em',
        textIndent: '0.54em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        padding: '0.6em 0 1.2em',
        margin: '1em auto 0.3em',
        position: 'relative',
        zIndex: 30,
    },
    arrow:{
        position: 'absolute',
        left: '14%',
        right: '14%',
        bottom: 0,
        height: '0.05em',
        background: 'url("../images/arrow-h.svg") no-repeat 50% 50%',
        backgroundSize: '100% 100%',
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
        paddingLeft: '1.8em',
    },
    text: {
        textTransform: 'uppercase',
        textAlign: 'left',
        letterSpacing: '0.4em',
        fontStretch: 'ultra-condensed',
        margin: '0.8em 0 1.6em',
        fontSize: '1.1em',
        color: '#FFF',
        fontWeight: '200',
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
        fontSize: '2.3em',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 1.05,
    },
    divInput: {
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        marginTop: '3.1em',
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
        background: ' linear-gradient(to bottom, rgba(44,65,113,1) 0%, rgba(54,60,106,1) 100%)',
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
        height: '7em',
    },
    magOne: {
        transform: 'rotate(160deg)',
        left: '0.8em',
        top: '-4.8em',
        zIndex: '2',
        backgroundColor: '#DDD',
    },
    magTwo: {
        transform: 'rotate(30deg)',
        left: '-3em',
        top: '0.8em',
        zIndex: '1',
        backgroundColor: '#999',
    },
    magThree: {
        transform: 'rotate(60deg)',
        left: '-3em',
        bottom: '0.8em',
        zIndex: '1',
        backgroundColor: '#888',
    },
    magFour: {
        transform: 'rotate(27deg)',
        left: '-1.8em',
        bottom: '-1em',
        zIndex: '3',
        backgroundColor: '#777',
    },
    magFive: {
        transform: 'rotate(11deg)',
        left: '1.2em',
        bottom: '-4.8em',
        zIndex: '2',
        backgroundColor: '#666',
    },
    magSix: {
        transform: 'rotate(-30deg)',
        left: '4em',
        bottom: '-3.5em',
        zIndex: '1',
        backgroundColor: '#555',
    },
    magSeven: {
        transform: 'rotate(10deg)',
        right: '1.5em',
        bottom: '-6em',
        zIndex: '2',
        backgroundColor: '#444',
    },
    magEight: {
        transform: 'rotate(20deg)',
        right: '-0.5em',
        bottom: '-4.5em',
        zIndex: '1',
        backgroundColor: '#333',
    },
    magNine: {
        transform: 'rotate(-12deg)',
        right: '-2.6em',
        bottom: '0.5em',
        zIndex: '3',
        backgroundColor: '#222',
    },
    magTen: {
        transform: 'rotate(-77deg)',
        right: '-4em',
        top: '0.6em',
        zIndex: '2',
        backgroundColor: '#111',
    },
    magEleven: {
        transform: 'rotate(-150deg)',
        right: '-0.5em',
        top: '-5.5em',
        zIndex: '1',
        backgroundColor: '#000',
    },
    imgMag: {
        float: 'left',
        width: 'auto',
        height: '7em',
    },
};
class AuthHeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const new_issues = this.props.data.new_issues;
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
                    <h1 style={styles.h1}>киоск плюс<span style={styles.arrow} /></h1>
                </div>
                <div style={styles.fot}>
                    <p style={styles.text}>вход</p>
                </div>
                    {SUtils.any(new_issues) ?
                        <div style={styles.content}>
                            <div style={Object.assign({}, styles.mag, styles.magOne)} >
                                <img src={new_issues[0].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magTwo)} >
                                <img src={new_issues[1].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magThree)} >
                                <img src={new_issues[2].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magFour)} >
                                <img src={new_issues[3].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magFive)} >
                                <img src={new_issues[4].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magSix)} >
                                <img src={new_issues[5].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magSeven)} >
                                <img src={new_issues[6].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magEight)} >
                                <img src={new_issues[7].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magNine)} >
                                <img src={new_issues[8].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magTen)} >
                                <img src={new_issues[9].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <div style={Object.assign({}, styles.mag, styles.magEleven)} >
                                <img src={new_issues[10].image_path} style={styles.imgMag} alt='' />
                            </div>
                            <h2 style={styles.h2}>Добро пожаловать<br />в Киоск!</h2>
                            <div style={styles.divInput}>
                                <span style={styles.spanInput}>Ваш номер телефона</span>
                                <InputMask style={styles.inputMask} {...this.props} mask="+7 (999) 999-99-99" placeholder="+7 (   )    -  -  " maskChar=" " />
                                <div style={styles.divButton}>
                                    <button style={styles.button}>Войти</button>
                                    <div  style={styles.shadowButton} />
                                </div>
                            </div>
                        </div> : null }
            </div>
        );
    }
}

export default AuthHeader;