import React, {Component} from 'react';
import IndexMenu from '../../Components/IndexMenu';
import CustomMenu from '../../Components/CustomMenu';
import * as SUtils from "../../Helpers/SUtils";

const styles = {
    header: {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#000',
        overflow: 'hidden',
    },
    item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
    },
    indexMenu:{
        position: 'absolute',
        left: '1em',
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
    },
    customMenu:{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '6em',
        height: '100%',
        zIndex: 50,
        background: 'linear-gradient(to right, rgba(0,0,0,0) 0,rgba(0,0,0,1) 100%)',
        paddingLeft: '2em',
    },
    customMenuIcon: {
        position: 'absolute',
        right: '2em',
        top: '50%',
        transform: 'translate(0, -50%)',
    },
    inner: {
        width: '100%',
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
        top: '-10%',
        left: 0,
        width: '80%',
        height: '200%',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.6,
        maxWidth:'30em',
    },
    shadow: {
        zIndex: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '15%',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
        opacity: 0.6,
    },
    left: {
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0.1em -0.1em 0.3em',
        borderRadius: '0.2em',
        float: 'left',
        width: '5.6em',
        maxHeight: '6em',
        margin: '1em 1.2em -1em 4.6em',
    },
    magLeft: {
        width: '100%',
        float: 'left',
    },
    url: {
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
        // cursor: 'pointer',
    },
    right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '7.4em',
        padding: '1.8em 0 1.3em',
        maxWidth: '50%',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 200,
        letterSpacing: 4,
        color: '#fff',
        marginBottom: '0.3em',
        lineHeight: 1.2,
    },
    captionColorSwiper: {
        display: 'inline',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.6em 0.2em 0.8em',
        fontSize: '0.9em',
        fontWeight: 200,
        letterSpacing: '0.2em',
        lineHeight: 1.6,
        textTransform: 'uppercase',
        border: '1px solid #FFF',
    },
};
class ArticlePageHeader extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {},
            loading: true,
        };
    }


    render() {
        const journal_name = this.props.data.journal ? this.props.data.journal.name : '';
        const page_number = this.props.data.article ? this.props.data.article.page_number : '';
        const pages_count = this.props.data.issue ? this.props.data.issue.pages_count : '';
        const image_path = this.props.data.issue ? this.props.data.issue.image_path : '';
        const other_articles_ids = this.props.data.article ? this.props.data.article.other_articles_ids : '';

        return (
            <div style={styles.header}>
                <div style={styles.item}>
                    <div style={styles.inner}>
                        <div style={styles.indexMenu}>
                            <IndexMenu data={this.props.data} />
                        </div>
                        <div style={styles.customMenu}>
                            <div style={styles.customMenuIcon}>
                                <CustomMenu data={this.props.data} />
                            </div>
                        </div>
                        <div style={styles.left}>
                            <div style={styles.url} >
                                <img style={styles.magLeft} src={image_path} alt={journal_name} />
                            </div>
                        </div>
                        <div style={styles.right}>
                            <div style={styles.url}>
                                <h3 style={styles.title}>&laquo;{journal_name}&raquo;</h3>
                                <div style={styles.page}>
                                    <p style={styles.captionColorSwiper}>
                                        <span>{page_number}/</span>
                                        <span>{pages_count}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.bg}>
                        <img style={styles.imgBg} src="/images/header.jpg" alt={journal_name} />
                        <div style={styles.mask} />
                        <div style={styles.shadow} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticlePageHeader;