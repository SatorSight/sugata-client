import React, {Component} from 'react';
import IndexMenu from '../../Components/IndexMenu';
import CustomMenu from '../../Components/CustomMenu';
import OwlCarousel from 'react-owl-carousel';
import * as SUtils from "../../Helpers/SUtils";
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
    colorOne: {
        position: 'absolute',
        left: '50%',
        bottom: '-50%',
        width: '100%',
        height: '200%',
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
        background: 'linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
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
        fontSize: '1.2em',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 300,
        display: 'inline-block',
        margin: '1.9em auto 0.4em',
        zIndex: 30,
    },
    h2: {
        color: '#FFF',
        fontSize: '0.9em',
        opacity: .8,
        letterSpacing: 1,
        fontWeight: 300,
        position: 'relative',
        minWidth: '8em',
        paddingBottom: '1.8em',
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
        left: '0.6em',
        top: '0.8em',
        zIndex: 50,
    },
    customMenu:{
        position: 'absolute',
        right: '0.6em',
        top: '0.8em',
        zIndex: 50,
    },
    h3: {
        color: '#FFF',
        opacity: 0.8,
        fontSize: '1em',
        fontWeight: 400,
        letterSpacing: '0.15em',
    },
    item: {
        margin: '0 0.5em 0 1.5em',
        paddingBottom: '1em',
    },
    main: {
        position: 'relative',
        overflow: 'hidden',
        height: '6.5em',
        marginTop: '1.4em',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontWeight: 400,
        padding: '2.41em 0 1.3em',
        letterSpacing: '0.15em',
        textAlign: 'center',
    },
    imgOtherIssues: {
        boxShadow: '0.2em 0.2em 0.2em rgba(0,0,0,0.3)',
        overflow: 'hidden',
        height: '11em',
        width: 'auto',
    },
};
class TagHeader extends Component {

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
                    <div style={styles.indexMenu}>
                        <IndexMenu data={this.props.data} />
                    </div>
                    <div style={styles.customMenu}>
                        <CustomMenu data={this.props.data}/>
                    </div>
                    {SUtils.any(journals) ? <div>
                        <h1 style={styles.h1}>&laquo;{journals[index].bundle.name}&raquo;</h1>
                        <p style={styles.h2}>{journals.length} статей по теме<span style={styles.arrow} /></p>
                        <div style={styles.main}>
                                <OwlCarousel autoWidth dots={false} >
                                    {journals.map((journal, currentIndex) =>
                                        <div key={String(currentIndex)} style={styles.item} >
                                            <Link to={`/journal/${journal.id}`}>
                                                <img src={journal.image_path} alt={journal.number} style={styles.imgOtherIssues} />
                                            </Link>
                                        </div>
                                    )}
                                </OwlCarousel>
                        </div>
                    </div> : null }
                </div>
            </div>
        );
    }
}

export default TagHeader;