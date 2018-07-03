import React, { PureComponent } from 'react';
import Dialog, {
    DialogContent,
} from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { beautifyTel, getGetParameterByName, empty } from '../Helpers/SUtils';

const styles = {
    dialog:{
        minWidth: 240,
    },
    dialogTitle: {
        fontSize: '1.6em',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '2em 0 1em 0px',

        position: 'absolute',
        top: '2em',
        padding: '0 1em 0 1em',
        color: 'white',
    },
    dialogText: {
        fontSize: '1.1em',
        textAlign: 'center',
        margin: '2em 1.5em',
    },
    dialogAccount: {
        textAlign: 'center',
        margin: '2em 0',
        display: 'flex',
        justifyContent: 'center',
    },
    dialogAccountInner: {
        borderBottom: '1px dashed gray',
    },
    dialogClose: {
        textAlign: 'center',
        color: 'blue',
        fontSize: '1.2em',
        borderTop: '1px solid gray',
        paddingTop: '2em',
        paddingBottom: '2em',
    },
    dialogImage: {
        width: '100%',
        height: '20rem',
    },
    dialogImageWrapper: {
        height: '10rem',
        overflow: 'hidden',

    },
    darkMask: {
        position: 'absolute',
        width: '100%',
        height: '10rem',
        background: 'black',
        opacity: '0.5',
    },
    msisdn: {
        fontSize: '1.5em',
        height: '2em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '10em',
        margin: '0 auto',
        borderRadius: '1em',
        position: 'relative',
        top: '-1em',
        background: 'white',

    },
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth_data: state.server.auth_data,
    }
};

class JustSubscribedDialog extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            open: true,
        };
    }

    registered = () => this.props.auth_data
        && !empty(this.props.auth_data.msisdn)
        && !empty(getGetParameterByName('bridge_token'));

    render() {
        return this.registered() ? <div>
            <div dangerouslySetInnerHTML={{ __html: `<style>.paper{border-radius: 0.5em;}</style>`}}></div>
            <Dialog classes={{paper: 'paper'}}
                    maxWidth={'md'}
                    fullWidth
                    style={styles.dialog}
                    open={this.state.open}>
                <div dangerouslySetInnerHTML={{ __html: `<style>.root{padding: 0;}</style>`}}></div>
                <DialogContent classes={{root: 'root'}}>
                    <div style={{width: 'auto', background: 'rgb(236,236,236)'}}>
                        <div style={styles.dialogImageWrapper}>
                            <div style={styles.darkMask}></div>
                            <img style={styles.dialogImage} src="/images/success.jpg" alt=""/>
                        </div>
                        <div style={styles.dialogTitle}>
                            Ура! Вы успешно
                            подписались на сервис
                            Киоск Плюс
                        </div>
                        <div style={styles.msisdn}>{this.props.auth_data ? beautifyTel(this.props.auth_data.msisdn) : null}</div>
                        <div style={styles.dialogText}>
                            <p>
                                По данному номеру была
                                осуществленна подписка на сервис
                                {/*с тарификацией 7 руб. в день.*/}
                            </p>
                        </div>
                        {/*<div style={styles.dialogAccount}>*/}
                            {/*<div onClick={this.go_to_auth} style={styles.dialogAccountInner}>Управление подпиской</div>*/}
                        {/*</div>*/}
                        <div onClick={() => this.setState({open: false})} style={
                            Object.assign({}, styles.dialogClose, {
                                background: 'rgb(98,163,234)',
                                color: 'white',
                            })
                        }>
                            Вернуться в сервис
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div> : null;
    }
}

export default connect(
    mapStateToProps,
    // mapDispatchToProps,
)(JustSubscribedDialog);

// export default withStyles(styles, {withTheme: true})(Licence)