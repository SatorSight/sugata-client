import React from "react";
import { Link } from 'react-router-dom'
import * as SUtils from '../Helpers/SUtils'

const styles = {
    root: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    },
    swiper: {
        height: '7em',
        overflow: 'hidden',
        width: '95%',
        marginLeft: '5%',
        display: 'flex',
        transition: '1s'
    },
    slideSwiper: {
        display: 'block',
        paddingRight: '0.5em',
        float: 'left',
        margin: '0 5% 0 0',
        width: '20%',
        transition: '.5s',
    },
    next: {
        position: 'relative',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
    },
    link: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '6em',
        width: '6em',
        textAlign: 'center',
        borderTop: '0.1em solid rgba(255,255,255,0.5)',
        borderLeft: '0.1em solid rgba(255,255,255,0.5)',
        borderBottom: '0.1em solid rgba(255,255,255,0.5)',
        borderRadius: '50% 0 0 50%',
        transition: '1s'
    },
    arrow: {
        display: 'block',
        position: 'absolute',
        top: '3.1em',
        left: '50%',
        width: '1em',
        height: '0.2em',
        backgroundColor: '#FFF',
        borderRadius: '0.2em',
    },
    top: {
        transform: 'rotate(40deg)',
        marginTop: '-0.5em',
    },
    fot: {
        transform: 'rotate(-40deg)',
    },
    magSwiper: {
        width: '100%',
    },
    active: {
        opacity: .8,
        paddingTop: '1em',
    },
};

const swiper_styles = {
    transform: 'translate(-6em)'
};

const all_button_styles = {
    transform: 'translate(3em)'
};

class SwiperTop extends React.Component {
    constructor(props) {
        super(props);
    }

    getAllIssuesLink = () => {
        let id = 0;
        if(this.props.parent_type === 'bundle')
            id = this.props.bundle_id;
        else
            id = SUtils.first(this.props.issues).journal_id;

        return `/all_issues/${this.props.parent_type}/${id}`;
    };

    render() {
        const { active } = this.props;

        console.log('zzzzzzzzzzzzzzzzzz');
        console.log(active);
        console.log(this.props.issues.length);


        const swiper_style = active === this.props.issues.length - 1
            ? Object.assign({}, swiper_styles, styles.swiper)
            : styles.swiper;

        const button_style = active !== this.props.issues.length - 1
            ? Object.assign({}, all_button_styles, styles.link)
            : styles.link;

        return (
            <div style={styles.root}>
                <div style={swiper_style}>
                    {this.props.issues.map((issue, i) => {
                        let show;
                        if (i === active)
                            show = Object.assign({}, styles.slideSwiper, styles.active);
                        else
                            show = styles.slideSwiper;
                        return  <Link to={`/issue/${issue.id}`} key={issue.id} style={show}>
                                    <img style={styles.magSwiper} src={issue.image_path} alt={issue.title}/>
                                </Link>
                        }
                    )}
                </div>
                <div style={button_style}>
                    <Link to={this.getAllIssuesLink()}>
                        <span style={Object.assign({}, styles.top, styles.arrow)} />
                        <span style={Object.assign({}, styles.fot, styles.arrow)} />
                    </Link>
                </div>
            </div>
        );
    }
}

export default SwiperTop;