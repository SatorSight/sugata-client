import React, { Component } from 'react';
import * as SUtils from "../../Helpers/SUtils";

const styles = {
    item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        minHeight: '9.8em',
        zIndex: 50,
        cursor: 'pointer',
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
    off: {
        zIndex: 30,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: "#000",
    },
    imgBg: {
        zIndex: 10,
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: 0,
        width: '100%',
        opacity: '0.3'
    },
    mask: {
        zIndex: 20,
        position: 'absolute',
        left: '-50%',
        top: '-30%',
        width: '200%',
        height: '300%',
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.4,
    },
    left: {
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.3) 1em 1em 2em -0.2em',
        borderRadius: '0.2em',
        float: 'left',
        width: '6.4em',
        margin: '1.8em 2em 1em 1.8em',
        maxHeight: '6.4em',
    },
    magLeft: {
        width: '100%',
        float: 'left',
    },
    url: {
        display: 'block',
        overflow: 'hidden',
    },
    right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '26%',
        padding: '1.8em 0',
        maxWidth: '50%',
    },
    title: {
        fontSize: '1em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 200,
        letterSpacing: 3.2,
        color: '#fff',
        lineHeight: 1.2,
        opacity: 0.8,
        margin: '0 0 0.8em',
    },
    text: {
        fontSize: '1.2em',
        lineHeight: 1.5,
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        letterSpacing: 1.2,
        color: '#fff',
        maxHeight: '4em',
        overflow: 'hidden',
        margin: '0 0 1em',
        padding: 0,
    },
    captionColorSwiper: {
        display: 'inline',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.6em 0.2em 0.8em',
        margin: 0,
        fontSize: '0.9em',
        fontWeight: 200,
        letterSpacing: '0.2em',
        lineHeight: 1.8,
        textTransform: 'uppercase',
        border: '1px solid #FFF',
        opacity: 0.8,
    },
    itemEnd: {
        display: 'none',
    }
};

class NextArticle extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {},
            loading: false,
            nextId: 0,
            nextTitle: 0,
            nextNumber: 0,
            nextCount: 0,
            nextHtml: 0,
            nextPath: 0,
            end: false,
        };
    }
    componentDidMount(){
        const self_id = Number(this.props.self_id);
        fetch('/api/article/next_article/'+self_id)
            .then((results) => results.json())
            .then((data) => {
                this.setState({
                    nextId: data.id,
                    nextTitle: data.title,
                    nextNumber: data.page_number,
                    nextHtml: data.html,
                    nextPath: data.image_path,
                    loading: true,
                    end: false,
                },);
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    componentWillReceiveProps(nextProps){
        if (this.props.id_next!==nextProps.id_next) {
            this.setState ({ loading: false }, function () {
                fetch('/api/article/next_article/'+nextProps.id_next)
                    .then((results) => results.json())
                    .then((data) => {
                        if (!data.id) {
                            this.setState({
                                end: true,
                            },);
                        }
                        else {
                            this.setState({
                                nextId: data.id,
                                nextTitle: data.title,
                                nextNumber: data.page_number,
                                nextHtml: data.html,
                                nextPath: data.image_path,
                                end: false,
                            },);
                        }
                    })
                    .then(() => {
                        this.setState({
                            loading: true,
                        },);
                    })
                    .catch((error) =>{
                        console.error(error);
                    });
            });
        }
        else {
            return false
        }
    }

    render() {
        const pages_count = this.props.data.issue ? this.props.data.issue.pages_count : '';
        return (
            <div style={this.state.end ? styles.itemEnd : styles.item} key={this.state.nextId}>
                <div style={styles.inner}>
                    <div style={styles.left}>
                        <div style={styles.url}>
                            <img style={styles.magLeft} src={this.state.nextPath} alt={this.state.nextTitle} />
                        </div>
                    </div>
                    <div style={styles.right}>
                        <div style={styles.url}>
                            <h3 style={styles.title}>Следующая статья</h3>
                            <p style={styles.text}>{this.state.nextTitle}</p>
                            <div>
                                <p style={styles.captionColorSwiper}>
                                    <span>{this.state.nextNumber}/</span>
                                    <span>{pages_count}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={this.state.loading ? styles.bg : styles.off}>
                    <img style={styles.imgBg} src="/images/header.jpg" alt={this.state.nextTitle} />
                    <div style={styles.mask} />
                </div>
            </div>
        );
    }
}

export default NextArticle;