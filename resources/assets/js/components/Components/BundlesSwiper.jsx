import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';

import 'react-id-swiper/src/styles/css/swiper.css';
import { withStyles } from 'material-ui/styles';

import * as css from '../Helpers/cssConstants';
import Line from '../Helpers/Line';

const cover_style = {
    width: '4em',
    // position: 'absolute',
    // display: 'flex',
};

const styles = {
    bundleContainer: {
        height: '12em',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.7em',
        overflow: 'hidden',
        width: '30em',
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
        marginTop: '0.5em',
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
        // left: 0,
        // top: 0,
    },
    cover2: {
        ...cover_style,
        // left: 0,
        // bottom: 0,
    },
    cover3: {
        ...cover_style,
        // right: 0,
        // top: 0,
    },
    cover4: {
        ...cover_style,
        // right: 0,
        // bottom: 0,
    },
    sectionWrapper: {
        ...css.sectionWrapper,
    },

};

class BundlesSwiper extends PureComponent {
    constructor(props){
        super(props);
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
        const bundles = this.props.bundles;
        const { classes } = this.props;

        const params = this.get_swiper_params(classes);

        return (
            <div className={classes.sectionWrapper}>
                {/*<div className={classes.d}>*/}
                    {/*<div className={classes.d1}></div>*/}
                {/*</div>*/}
                <div className={classes.swiperContainerOuter}>
                    <Swiper {...params}>
                        {bundles.map(bundle =>
                            <div className={classes.bundleContainer} key={`bundles_swiper_${bundle.id}`}>
                                <div className={classes.textContainer}>
                                    <div className={classes.bundleName}>
                                        <Link className={classes.link} to={`/bundle/${bundle.id}`}>
                                            «{bundle.name}»
                                        </Link>
                                    </div>
                                    <Line color={'white'}/>
                                    <div className={classes.journalNamesContainer}>
                                        {bundle.journal_names.map((j_name, i, names) => {
                                            return ([
                                                <div key={`bundles_swiper_journal_name_${j_name}`}
                                                     className={classes.journalName}>
                                                    <Link className={classes.link} to={`/bundle/${bundle.id}`}>
                                                        {j_name}
                                                    </Link>
                                                </div>,
                                                i !== names.length - 1
                                                    ? <div key={`divider_${i}`} className={classes.divider}>|</div>
                                                    : null
                                                ]
                                            );
                                            }
                                        )}
                                    </div>
                                </div>
                                <img className={classes.bundleImage} src={bundle.image_path} alt={bundle.name}/>
                                <div className={classes.coversContainer}>
                                    {bundle.issue_covers.map((cover, index) =>
                                        <div key={`bundle_issue_covers_${bundle.id}_${index}`}
                                             className={classes[`cover_wrapper${index + 1}`]}>
                                            <img
                                                src={cover}
                                                className={classes[`cover${index + 1}`]}
                                            ></img>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Swiper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BundlesSwiper);