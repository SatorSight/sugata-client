import React, { PureComponent } from "react";

import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import { withStyles } from 'material-ui/styles';
import * as css from '../Helpers/cssConstants';

const styles = {
    item: {
        width: '27em',
        overflow: 'hidden',
        borderRadius: '1em',
    },
    img: {
        width: '100%',
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
    section: {
        ...css.sectionWrapper
    },
};

class PopularJournals extends PureComponent {
    constructor(props) {
        super(props);
    }

    // get_initial_slide_index = () => Math.round(this.props.journals.length / 2);
    get_initial_slide_index = () => 0;
    get_swiper_params = () => ({
        initialSlide: this.get_initial_slide_index(),
        // centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        width: 27,
        // slidesOffsetBefore: 32,
    });

    render() {
        const params = this.get_swiper_params();
        const { journals, classes } = this.props;

        return (
            <div className={classes.section}>
                <SectionTitle link={this.props.link || '/'} title={'Популярнейшие издания'}/>
                <Swiper {...params}>
                    {journals.map(journal =>
                        <div  key={`popular_editions_${journal.id}`} className={classes.item}>
                            <Link to={`/journal/${journal.id}`}>
                                <img className={classes.img} src={journal.additional_image_path} alt={journal.title} />
                                <div className={classes.logo} style={{backgroundImage:'url(' + journal.logo_path + ')' }} />
                            </Link>
                        </div>
                    )}
                </Swiper>
            </div>
        );
    }
}

export default withStyles(Object.assign({}, styles, css))(PopularJournals);