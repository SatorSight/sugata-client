import React, {Component} from 'react';
import IndexMenu from '../../Components/IndexMenu';
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button';
import * as ResourceRoutes from "../../Helpers/ResourceRoutes";
import * as SUtils from "../../Helpers/SUtils";

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
        padding: '1.2em 1em 1em',
        letterSpacing: 1,
        textTransform: 'uppercase',
        // color: '#000',
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
        padding: '2.2em 1em 1em',
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 400,
        width: '90%',
        maxWidth: 400,
        margin: '0 auto 2em',
        borderRadius: '2em',
        lineHeight: '3em',
        border: '1px solid #E0E0E0',
        background:'url("data:image/gif;base64,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") no-repeat 50% 50% #FFF',
        backgroundSize: 'contain',
        display: 'block',
        cursor: 'none',
    },
    span: {
        color: '#000'
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
    buttonDisplay: {
        display: 'block',
    },
    buttonHidden: {
        display: 'none',
    },
};

export default class AllIssuesView extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            buttonOn: true,
        };
    }
    addMore = () => {
        this.setState({ isLoading: true });
        const issues = this.props.data.issues;
        const _this = this;
        this.props.load_more().then(function() {
            _this.setState({ isLoading: false });
            const issuesAdd = _this.props.data.issues;
            let state = issues.length!==issuesAdd.length;
            _this.setState({ buttonOn: state });
        });
    };
    render() {
        const item = this.props.issues ? this.props.data.issues : '';
        let content= [];
        if (item){
            for(let i=0; i < item.length; i++){
                content[i] = <div key={String(i)} style={styles.item}>
                                <Link  to={`/issue/${item[i].id}`} style={styles.link}>
                                    <div style={styles.image}>
                                        <div style={styles.blur} />
                                        {/*<img style={styles.img} src='/images/header.jpg' alt={item[i].journal_name} />*/}
                                        <img style={styles.img} src={item[i].image_path} alt={item[i].journal_name} />
                                    </div>

                                    <div style={styles.inner}>
                                        <p style={styles.name}>{item[i].journal_name}</p>
                                        <p style={styles.date}>{SUtils.toRuMonthYearLocale(item[i].content_date)}</p>
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
                                <IndexMenu payment_trigger={this.props.payment_trigger} auth_data={this.props.auth_data} data={this.props.data}/>
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
                <div style={this.state.buttonOn ? styles.buttonDisplay : styles.buttonHidden}>
                    <Button classes={{}} color="primary" style={this.state.isLoading ? styles.offButton : styles.button} onClick={this.addMore}>
                        {this.state.isLoading ? ' ' : <span style={styles.span}>Загрузить еще</span>}
                    </Button>
                </div>
            </div>
        );
    }
}