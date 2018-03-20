import React, {Component} from 'react';
import IndexMenu from '../../Components/IndexMenu';
import CustomMenu from '../../Components/CustomMenu';
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
        bottom: '-50%',
        width: '100%',
        height: '130%',
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
        fontSize: '1.3em',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        padding: '0.4em 1.4em 1em',
        margin: '1em auto 16em',
        position: 'relative',
        zIndex: 30,
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
    indexMenu:{
        position: 'absolute',
        left: '0.5em',
        top: 0,
        zIndex: 50,
    },
    customMenu:{
        position: 'absolute',
        right: '0.2em',
        top: '0.3em',
        zIndex: 50,
    },
    bigLogo: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    imgLogo: {
        maxWidth: '20em',
        maxHeight: '8em',
    },
    h3: {
        color: '#FFF',
        opacity: 0.8,
        fontSize: '1em',
        fontWeight: 400,
        letterSpacing: '0.15em',
    }
};
class JournalHeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const journals = this.props.data.journals;
        let index = SUtils.any(journals) ? Math.floor(journals.length/2) : 1;

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
                        <div style={styles.indexMenu}>
                            <IndexMenu data={this.props.data} />
                        </div>
                        <div style={styles.customMenu}>
                            <CustomMenu data={this.props.data} />
                        </div>
                        {SUtils.any(journals) ? <div>
                            <h1 style={styles.h1}>{journals[index].bundle.name}<span style={styles.arrow} /></h1>
                            <div style={styles.bigLogo}>
                                <img src={journals[index].logo_path} style={styles.imgLogo} alt={journals[index].name} />
                                <h3 style={styles.h3}>{journals.length} выпуска</h3>
                            </div>
                        </div> : null }
                    </div>
                </div>
            </div>
        );
    }
}

export default JournalHeader;