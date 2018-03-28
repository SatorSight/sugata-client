import React, {Component} from 'react';
import IndexMenu from '../../Components/IndexMenu';
import CustomMenu from '../../Components/CustomMenu';
import IndexMenuSet from '../../Components/IndexMenuSet';
import { Link } from 'react-router-dom'

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
    shadow: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '1em',
        zIndex: 35,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        opacity: 0.4,
    },
    colorOne: {
        position: 'absolute',
        left: '-50%',
        bottom: '-40%',
        width: '100%',
        height: '100%',
        zIndex: 20,
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.8,
    },
    colorTwo: {
        position: 'absolute',
        right: '-60%',
        top: '-50%',
        width: '100%',
        height: '100%',
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(172,168,165,1) 0%, rgba(115,112,110,1) 20%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 70%)',
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
        fontSize: '2.1em',
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        padding: '0.7em 1.5em',
        margin: '4.8em auto',
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
        left: 0,
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
    },
    customMenu:{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
    },
};
class IndexHeader extends Component {

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
                    <div style={styles.shadow} />
                </div>
                <div style={styles.inner}>
                    <div style={styles.indexMenu}>
                        <IndexMenu data={this.props.data} />
                    </div>
                    <div style={styles.customMenu}>
                        <CustomMenu data={this.props.data} />
                    </div>
                    <Link to="/" style={styles.h1}>
                        киоск плюс<span style={styles.arrow} />
                    </Link>
                </div>
                <IndexMenuSet data={this.props.data} />
            </div>
        );
    }
}

export default IndexHeader;