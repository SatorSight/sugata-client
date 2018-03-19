import React, {Component} from 'react';
import IndexMenu from '../MainPage/IndexMenu';
import * as SUtils from "../../Helpers/SUtils";


const styles = {
    item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
    },
    menu: {
        position: 'absolute',
        top: '50%',
        left: 0,
        marginTop: '-28px',
    },
    inner: {
        width: '100%',
        maxWidth: '34em',
        position: 'relative',
        zIndex: 20,
    },
    bg: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    imgBg: {
        zIndex: 10,
        position: 'absolute',
        top: '-50%',
        right: 0,
        width: '100%',
        opacity: '0.3'
    },
    mask: {
        zIndex: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: 'hidden',
        background: 'url("images/article/mask.png") no-repeat 50% 100%',
        backgroundSize: 'cover',
    },
    left: {
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em',
        borderRadius: '0.2em',
        float: 'left',
        width: '5.6em',
        maxHeight: '7em',
        margin: '1.3em 1.3em -1em 5em',
    },
    magLeft: {
        width: '100%',
        float: 'left',
    },
    url: {
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '30%',
        padding: '1.8em 0 1.5em',
        maxWidth: '50%',
    },
    title: {
        fontSize: '1.3em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 200,
        letterSpacing: '0.35em',
        color: '#fff',
        marginBottom: '0.4em',
    },
    captionColorSwiper: {
        display: 'inline',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.3em 0.5em 0.1em 0.7em',
        fontSize: '1em',
        fontWeight: 200,
        letterSpacing: '0.2em',
        lineHeight: 1.5,
        textTransform: 'uppercase',
        border: '1px solid #FFF',
    },
    arrow: {
        display: 'block',
        position: 'absolute',
        width: '4.8em',
        top: 0,
        right: 0,
        bottom: 0,
        color: '#FFF',
        background: 'url(images/arrow.png) no-repeat 50% 50%',
        backgroundSize: '1.5em auto',
        cursor: 'pointer',
        zIndex: 20,
    },
};
class IssueArticlesHeader extends Component {

    constructor(props){
        super(props);
    }



    render() {
        const journals = this.props.data.journals;
        let index = SUtils.any(journals) ? Math.floor(journals.length/2) : 1;
        // console.log(this.props.id);

        return (
            <div style={styles.header}>
                {SUtils.any(journals) ? <div>
                <div style={styles.item}>
                    <div style={styles.inner}>
                        <div style={styles.menu}>
                            <IndexMenu data={this.props.data} />
                        </div>
                        <div style={styles.left}>
                            <a style={styles.url} href={journals[index].url_prefix}>
                                <img style={styles.magLeft} src={journals[index].image_path} alt={journals[index].name} />
                            </a>
                        </div>
                        <div style={styles.right}>
                            <a style={styles.url} href={journals[index].url_prefix}>
                                <h3 style={styles.title}>&laquo;{journals[index].name}&raquo;</h3>
                                <div style={styles.page}>
                                    <p style={styles.captionColorSwiper}>
                                        <span>2/</span>
                                        <span>24</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <a style={styles.arrow} href={journals[index].url_prefix} />
                    <div style={styles.bg}>
                        <img style={styles.imgBg} src={journals[index].image_path} alt={journals[index].name} />
                        <div style={styles.mask} />
                    </div>
                </div>
                </div> : null }
            </div>
        );
    }
}

export default IssueArticlesHeader;