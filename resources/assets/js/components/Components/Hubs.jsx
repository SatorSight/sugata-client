import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';
import 'react-id-swiper/src/styles/css/swiper.css';
import { withStyles } from 'material-ui/styles';
import * as css from '../Helpers/cssConstants';
import Line from '../Helpers/Line';

const cover_style = {
    width: '4em',
};

const styles = {
    bundleContainer: {
        height: '12em',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.7em',
        overflow: 'hidden',
        width: '23em',
    },
    bundleImage: {
        width: '100%',
        top: 0,
    },
    bundleName: {
        fontFamily: 'Montserrat',
        fontSize: '1.1rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1rem',
        textAlign: 'center',
        marginBottom: '0.5em',
    },
    journalNamesContainer: {
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '0.5em 1em 0',
        maxHeight: '3.4em',
        overflow: 'hidden',
    },
    journalName: {
        margin: '0.1rem 1em',
    },
    textContainer: {
        position: 'absolute',
        color: 'white',
        height: '3rem',
        margin: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
    },
    link: {
        color: 'inherit',
        cursor: 'pointer',
    },
    swiperContainerOuter: {
        margin: '0 1em 0 1em',
    },
    activeBullet: {
        background: 'black',
    },
    divider: {
        color: 'white',
        opacity: '0.5',
    },
    //default + height
    swiperContainer: {
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        listStyle: 'none',
        padding: 0,
        zIndex: 1,
        height: '14.5em',
    },
    coversContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',

    },
    cover_wrapper1:{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        left: '-1em',
        transform: 'rotate(25deg)',
    },
    cover_wrapper2:{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        left: '-2em',
    },
    cover_wrapper3:{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        right: '-1em',
        transform: 'rotate(-25deg)',
    },
    cover_wrapper4:{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        right: '-2em',
    },
    cover1: {
        ...cover_style,
    },
    cover2: {
        ...cover_style,
    },
    cover3: {
        ...cover_style,
    },
    cover4: {
        ...cover_style,
    },
    sectionWrapper: {
        ...css.sectionWrapper,
    },
};

class Hubs extends PureComponent {
    constructor(props){
        super(props);

        console.log('---');
        console.log(props);
    }

    get_swiper_params = classes => ({
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            bulletActiveClass: 'swiper-pagination-bullet-active ' + classes.activeBullet,
            type: 'bullets',
            clickable: true
        },
        roundLengths: true,
        spaceBetween: 10,
        containerClass: classes.swiperContainer,
    });

    render() {
        const { classes, hubs } = this.props;
        const params = this.get_swiper_params(classes);
        return (
            <div className={classes.sectionWrapper}>
                <div className={classes.swiperContainerOuter}>
                    <Swiper {...params}>
                        {hubs.map(hub =>
                            <div className={classes.bundleContainer} key={`hubs_swiper_${hub.id}`}>
                                <div className={classes.textContainer}>
                                    <div className={classes.bundleName}>
                                        <Link className={classes.link} to={`/hub/${hub.id}`}>
                                            «{hub.name}»
                                        </Link>
                                    </div>
                                </div>
                                <img className={classes.bundleImage} src={hub.image_path} alt={hub.name}/>
                            </div>
                        )}
                    </Swiper>
                </div>
            </div>
        );
    }
}

Hubs.propTypes = {
    hubs: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(Hubs);