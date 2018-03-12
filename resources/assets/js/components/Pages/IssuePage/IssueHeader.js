import React, {Component} from 'react';
import IndexMenu from '../MainPage/IndexMenu';
import * as SUtils from "../../Helpers/SUtils";


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
        left: '40%',
        bottom: '-70%',
        width: '100%',
        height: '130%',
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.6,
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
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    pc: {
        overflowY: 'hidden',
        overflowX: 'auto',
    },
    h1: {
        fontSize: '1.3em',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        padding: '0em 1.4em 0.85em',
        margin: '1em auto 0',
        position: 'relative',
        zIndex: 30,
        minWidth: '12em',
    },
    date: {
        color: '#FFF',
        fontSize: '0.9em',
        lineHeight: 3,
        letterSpacing: 1,
        fontWeight: 200,
    },
    arrow:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '0.1em',
        background: 'url("/images/arrow-h.svg") no-repeat 50% 50%',
        backgroundSize: 'contain',
        opacity: 0.6,
    },
    iconMenu:{
        position: 'absolute',
        left: '0.5em',
        top: 0,
        zIndex: 50,
    },
    bigMag: {
        position: 'relative',
    },
    imgMag: {
        position: 'relative',
        zIndex: 20,
        maxWidth: '20em',
        maxHeight: '9.4em',
        margin: '0.5em auto',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em -0.2em, rgba(255, 255, 255, 0.15) -1em -0.8em 1.5em -0.1em',
        borderRadius: '0.1em',
    },
    imgMagMask: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        maxWidth: '20em',
        maxHeight: '9.4em',
        margin: '0.5em auto',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em -0.2em, rgba(255, 255, 255, 0.15) -1em -0.8em 1.5em -0.1em',
        borderRadius: '0.1em',
        transform: 'rotate(3deg)',
        opacity: 0.6,
    },
    leftMag: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translate(-30%, -50%)',
    },
    rightMag: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translate(30%, -50%)',
    },
    butMag: {
        position: 'relative',
        maxWidth: '15em',
        maxHeight: '7em',
        borderRadius: '0.1em',
        zIndex: 20,
    },
    butMagMask: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        maxWidth: '15em',
        maxHeight: '7em',
        borderRadius: '0.1em',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em -0.2em, rgba(255, 255, 255, 0.15) -1em -0.8em 1.5em -0.1em',
        transform: 'rotate(3deg)',
        opacity: 0.6,
    },
    h3: {
        color: '#FFF',
        opacity: 0.8,
        fontSize: '1em',
        fontWeight: 400,
        letterSpacing: '0.15em',
    },
    button: {
        display: 'block',
        width: '60%',
        margin: '0.7em auto 1.45em',
        maxWidth: '25em',
        fontSize: '1em',
        color: '#FFF',
        lineHeight: 2.8,
        letterSpacing: 1,
        fontWeight: 200,
        padding: '0.3em 0 0.1em',
        textTransform: 'uppercase',
        border: '0.1em solid #FFF',
        textDecoration: 'none',
        borderRadius: '3em',
    },
};
class IssueHeader extends Component {

    constructor(props){
        super(props);
    }


    render() {
        const journals = this.props.data.journals;
        let index = SUtils.any(journals) ? Math.floor(journals.length/2) : 1;

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
                    {SUtils.any(journals) ? <div>
                        <h1 style={styles.h1}>{journals[index].bundle.name}<span style={styles.arrow} /></h1>
                        <p style={styles.date}>{journals[index].updated_at}</p>
                        <div style={styles.leftMag}>
                            <img style={styles.butMag} src={journals[index-1].image_path} alt={journals[index].name} />
                            <img style={styles.butMagMask} src={journals[index-1].image_path} alt={journals[index].name} />
                        </div>
                        <div style={styles.bigMag}>
                            <img style={styles.imgMag} src={journals[index].image_path} alt={journals[index].name} />
                            <img style={styles.imgMagMask} src={journals[index].image_path} alt={journals[index].name} />
                        </div>
                        <div style={styles.rightMag}>
                            <img style={styles.butMag} src={journals[index+1].image_path} alt={journals[index].name} />
                            <img style={styles.butMagMask} src={journals[index+1].image_path} alt={journals[index].name} />
                        </div>
                        <a style={styles.button} href="#">открыть и читать</a>
                    </div> : null }
                </div>
            </div>
        );
    }
}

export default IssueHeader;