import React, { Component } from "react";
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import * as SUtils from '../Helpers/SUtils';

const styles = {
    root: {
        paddingBottom: '1em',
        // overflow: 'hidden',
        background: 'white',
        fontFamily: 'Montserrat',
        fontSize: '0.9em',

        lineHeight: 1,
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: '1em',

        textTransform: 'uppercase',
        fontWeight: 400,
        padding: '2.41em 1.2em 1em',
    },
    main: {
        // margin: '0 -6em 0 -1.4em'
        marginTop: '1em',
    },
    item: {
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '2em',
        display: 'inline-block',
        margin: '0.3em 0.2em',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    name: {
        color: 'rgba(76, 76, 76, 0.5)',
    },
    img: {
        width: '100%',
        left: '50%',
        top: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
    },
    add: {
        marginLeft: '1em',
        display: 'flex',
        alignItems: 'center',
    },
    send: {

    },
    text_area: {
        lineHeight: 1,
        fontFamily: 'HelveticaNeueCyr!important',
    },
    comment: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 1em 1em',
        fontFamily: 'HelveticaNeueCyr!important',
    },
    image: {
        marginRight: '1em',
        height: '3em',
    },
    text: {
        wordBreak: 'break-all',
        fontFamily: 'HelveticaNeueCyr!important',
        paddingRight: '2.5em',
    },
    alert: {
        color: '#00ad00',
        margin: '1em',
        fontFamily: 'HelveticaNeueCyr!important',
    },
};

const send = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/>
</svg>;

const avatar = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
    <path fill="rgba(76, 76, 76, 0.5)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>;

class Comments extends Component {
    constructor(props){
        super(props);

        this.state = {
            input: '',
            comments: props.comments,
            alert_visible: false,
        }
    }

    send = () => {
        const payload = {
            article_id: this.props.article_id,
            content: this.state.input,
        };

        SUtils.makeQuery(payload, 'POST', 'api/article/add_comment', () => this.setState({alert_visible: true}));
        setTimeout(() => this.setState({alert_visible: false}), 30000);
    };

    change = e => this.setState({input: e.target.value});

    render() {
        let { comments, classes } = this.props;

        return (
            <div className={classes.root}>
                <span className={classes.title}>
                    Комменарии {comments && comments.length}
                </span>
                {this.props.authorized && <div className={classes.add}>
                    <TextField
                        style={styles.text_area}
                        placeholder="Добавить комментарий"
                        multiline={true}
                        value={this.state.input}
                        onChange={this.change}
                    />
                    <div className={classes.send} onClick={this.send}>
                        {send}
                    </div>
                </div>}
                {this.state.alert_visible && <div className={classes.alert}>Комментарий будет добавлен после модерации</div>}
                <div className={classes.main}>
                    {comments.map(c =>
                        <div key={`comment_${c.id}`} className={classes.comment}>
                            <div className={classes.image}>{avatar}</div>
                            <div>
                                <div className={classes.name}>
                                    {c.user && c.user.login ? c.user.login : 'Аноним'} {c.created_at}
                                </div>
                                <div className={classes.text}>{c.content}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Comments);