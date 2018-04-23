import React, {Component} from 'react';
import Button from 'material-ui/Button';

const styles = {
    buttonDisplay: {
        display: 'block',
    },
    buttonHidden: {
        display: 'none',
    },
    button: {
        fontSize: '1em',
        padding: '1.2em 1em 1em',
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
    fot: {
        padding: '0.5em 0 2em',
        textAlign: 'center',
        position: 'relative',
        zIndex: 20,
        clear: 'both',
    },
};
export default class LoadMoreButton extends Component {

    constructor(props){
        super(props);

        this.state = {
            is_loading: false,
            enabled: true
        }
    }

    buttonClick = () => {
        this.setState({ is_loading: true });
        this.props.load_more()
            .then(() => this.setState({ is_loading: false }));
    };

    /*
    * props
    * load_more - func
    * */

    render() {
        return (
            <div style={styles.fot}>
                <div style={this.state.enabled ? styles.buttonDisplay : styles.buttonHidden}>
                    <Button
                        classes={{}}
                        color="primary"
                        style={this.state.is_loading ? styles.offButton : styles.button}
                        onClick={this.buttonClick}
                    >
                        {this.state.is_loading ? ' ' : <span style={styles.span}>Загрузить еще</span>}
                    </Button>
                </div>
            </div>
        );
    }
}