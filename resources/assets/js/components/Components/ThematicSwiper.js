import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import * as SUtils from './../Helpers/SUtils';

const styles = {
    item: {
        paddingBottom: '1em',
        margin: '0 0.7em 3em',
        height: '12em',
        position: 'relative',
        width: '30em',
        overflow: 'hidden',
        borderRadius: '1em',
        boxShadow: '0 1.5em 3em -1.5em rgba(0,0,0,0.8)',
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



export default class ThematicSwiper extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let new_issues = this.props.data.new_issues;

        return (
            <div style={styles.main}>
                <h3 style={styles.title}>Тематические страницы</h3>
                {SUtils.any(new_issues) ?
                    <OwlCarousel autoWidth loop dots={false} center >
                    {new_issues.map((issue, currentIndex) =>
                        <div key={String(currentIndex)} style={styles.item} >
                            <a href={'#'}>
                                <div style={styles.owlMask} />
                                <img style={styles.img} src={issue.image_path} alt={issue.number} />
                                <div style={Object.assign({}, styles.logo, {backgroundImage:'url(' + issue.image_path + ')' })} />
                            </a>
                        </div>
                    )}
                </OwlCarousel> : null }
            </div>
        );
    }
}