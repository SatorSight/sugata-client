import React, {Component} from 'react';
import IndexMenu from '../../Components/IndexMenu';
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
        left: '0',
        bottom: '-100%',
        width: '100%',
        height: '200%',
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.5,
    },
    colorTwo: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '50%',
        height: '100%',
        zIndex: 20,
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        opacity: 0.8,
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
        fontSize: '1em',
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 300,
        display: 'block',
        padding: '0.4em 1.4em 1.6em',
        margin: '0 auto',
        position: 'relative',
        zIndex: 30,
    },
    h2: {
        fontSize: '0.8em',
        letterSpacing: 3,
        margin: '2.6em auto 0',
        lineHeight: 1.4,
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        opacity: 0.5,
    },
    h3: {
        fontSize: '1em',
        letterSpacing: 1,
        margin: '2.1em 0 1em 1.6em',
        textTransform: 'uppercase',
        color: '#000',
        fontWeight: 400,
        textAlign: 'left',
    },
    indexMenu:{
        position: 'absolute',
        left: '1em',
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
    },
    button: {
        fontSize: '1em',
        paddingTop: '0.3em',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#000',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        width: '90%',
        maxWidth: 400,
        margin: '0 auto 2em',
        borderRadius: '2em',
        lineHeight: '3em',
        border: '1px solid #E0E0E0',
        cursor: 'pointer',
        display: 'block',
        backgroundColor: '#FFF',
    },
    offButton: {
        fontSize: '1em',
        paddingTop: '0.3em',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#000',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        width: '90%',
        maxWidth: 400,
        margin: '0 auto 2em',
        borderRadius: '2em',
        lineHeight: '3em',
        border: '1px solid #E0E0E0',
        display: 'block',
        backgroundColor: '#FFF',
        opacity: 0.5,
        cursor: 'none',
    },
    content: {
        display: 'block',
        overflow: 'hidden',
        textAlign: 'center',
    },
    item: {
        display: 'inline-block',
        width: '9em',
        margin: '1em 0.5em 1.2em',
        textAlign: 'center',
    },
    image:{
        overflow: 'hidden',
        position: 'relative',
        display: 'inline-block',
        boxShadow: '0.2em 0.2em 0.3em -0.1em rgba(0,0,0,0.3)',
        marginBottom: '0.8em',
        maxWidth: '100%',
    },
    img: {
        float: 'left',
        height: '8em',
        width: 'auto',
    },
    blur: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
        opacity: 0.5,
    },
    name: {
        fontSize: '1.1em',
        lineHeight: 1.4,
        color: '#000',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
    },
    date: {
        fontSize: '1em',
        color: '#999',
        lineHeight: 1.2,
        fontWeight: 300,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
    },
};
export default class AllIssuesView extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
        };
    }
    componentDidMount() {
        // this.setState(prevState => ({
        //     isLoading: !prevState.isLoading
        // }));
        const item = this.props.issues ? this.props.data.issues : '';
        // console.log(item.length);
        this.onLoad(item.length);
    }
    onLoad = (item) => {
        console.log(item+' onLoad');

    };

    render() {
        const item = this.props.issues ? this.props.data.issues : '';
        let content= [];
        if (item!=null){
            for(let i=0; i < item.length; i++){
                content[i] = <div key={String(i)} style={styles.item}>
                                <Link  to={`/journal/${item[i].journal_id}`} style={styles.link}>
                                    <div style={styles.image}>
                                        <div style={styles.blur} />
                                        {/*<img style={styles.img} src='/images/header.jpg' alt={item[i].journal_name} />*/}
                                        <img style={styles.img} src={item[i].image_path} alt={item[i].journal_name} />
                                    </div>

                                    <div style={styles.inner}>
                                        <p style={styles.name}>{item[i].journal_name}</p>
                                        <p style={styles.date}>{item[i].content_date}</p>
                                    </div>
                                </Link>
                            </div>;
            }

        }
        return (
            <div>
                <div style={styles.header}>
                    <div style={styles.header}>
                        <div style={styles.mask}>
                            <div style={styles.bg} />
                            <div style={styles.colorOne} />
                            <div style={styles.colorTwo} />
                        </div>
                        <div style={styles.inner}>
                            <div style={styles.indexMenu}>
                                <IndexMenu data={this.props.data}/>
                            </div>
                            <Link to="/" style={styles.h2}>
                                киоск плюс
                            </Link>
                            <h1 style={styles.h1}>{this.props.title ? this.props.title.name : null}</h1>
                        </div>
                    </div>
                </div>
                <div style={styles.content}>
                    <h3 style={styles.h3}>Последние выпуски</h3>
                    {content}
                </div>
                <button style={this.props.isLoading ? styles.offButton : styles.button} onClick={this.props.load_more}>
                    {this.props.loading ? 'Подождите...' : 'Загрузить еще'}
                </button>
                {/*<button style={styles.button} onClick={this.props.load_more}>Загрузить еще</button>*/}
            </div>
        );
    }
}