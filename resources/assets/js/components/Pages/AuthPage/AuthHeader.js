import React, {Component} from 'react';
import InputMask from 'react-input-mask';
import IndexMenu from '../../Components/IndexMenu';
import CustomMenu from '../../Components/CustomMenu';
import AuthHelper from '../../Helpers/AuthHelper';
import { Link } from 'react-router-dom'


const styles = {
    header: {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#000',
        overflow: 'hidden',
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
        overflow: 'hidden',
        background:'url("/images/header.jpg") 50% 0 no-repeat',
        backgroundSize: '100% auto',
    },
    colorOne: {
        position: 'absolute',
        left: '-50%',
        top: 0,
        width: '100%',
        maxWidth: '70em',
        height: '100%',
        zIndex: 20,
        background: 'radial-gradient(ellipse at center, rgba(0,124,192,1) 0%, rgba(57,0,174,0.4) 50%, rgba(57,0,174,0) 70%)',
        opacity: 0.6,
    },
    colorTwo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '2em',
        zIndex: 20,
        background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        opacity: 0.6,
    },
    colorThree: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: '22em',
        bottom: 0,
        background: '#000',
        zIndex: 15,
        boxShadow: '0 0 20em 10em #000',
    },
    inner: {
        position: 'relative',
        maxWidth: '40em',
        height: '100%',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    h1: {
        fontFamily: 'Montserrat',
        fontSize: '2em',
        fontWeight: 200,
        letterSpacing: '0.3em',
        textIndent: '0.2em',
        textTransform: 'uppercase',
        color: '#FFF',
        display: 'inline-block',
        padding: '0.7em 1.5em 0.68em',
        position: 'relative',
        zIndex: 30,
        overflow: 'hidden',
    },
    arrow: {
        position: 'absolute',
        left: '8%',
        right: '8%',
        bottom: 0,
        height: '0.05em',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIwAAAAECAMAAADbJFQ7AAAA3lBMVEVHcEyV0OKSz+GTz+GTz+GU0eSTz+GU0OKSz+GW0+STz+GTz+Gg5OyTzuGX1uWTz+Gf2O6Y0+OSz+GV0uOTz+GTz+GTz+CW0eOU0OOT0OGT0OKUz+GTz+GU0OOTz+GTz+GU0OKTz+GUz+KTz+KTz+GUz+KTz+GTz+HG//+r4v+Sz+CTz+Ga0+eY0uSTz+GU0eKTz+GT0OGTz+GTz+GU0OGTz+GT0OGTzuGSz+GSz+GUz+GSz+GUz+GTz+CY1eOV0eWc1eqSz+GTz+KU0OOTz+GTz+GT0OKTz+GTz+GSzuDJon4XAAAASXRSTlMAOsW84C7KQ+8g1qYJ9hiIDiTrMrXkripIbU+Eez7BqlOMWnGAaZboAwb50hUczlddZpmfTHWQ/LixY5x42REnDPOTNqLbYP7dBUf55QAAAn1JREFUWMPt111LG1EUheEnWtpEEtVQBTR+oUKuRFCB3oo/u/RWoArilaDiVxRQSawGTUW1wJzMZIzRFtK7bCCT4czmwOGsd+2V0auPq0wGp6xg2yKqOME09kGWRXaFRYMswQ8owQUYgRLO+QyGuMUgY6hzT53wM4AivnAEWdxDHUUwSh4V8sjRwAg24GtomGMP5vkJJlABn0AZT3DIMln6fYcRKHLJHfiGTSYpMNzn+Zrb+IQ2wACjVKEG655osMUs9GMXPIISzsAq+7DAAXK4gm+oIcs96pRQ5xJUkRcaGjDD77BwB3nIkyOPC25Q4Bd4YBwVqIExqMAabHMDRSizQwPM4xhTYXHHUnxCXtgFvXq3MmVkOMVKU2eqnMB0Wmd239SZUlpnSpzjMwzhlkGMUY9vUaIzxbTO4i8UYRR5KvEt0mAENvAV7pnDHubxEyakhVaGJxxiWVZTaC06S4QWblHBsL7eJelVV+rZtdvY02Jgp4i97gkNW5hFP+xCAmxnsIp9LOCAHFzhG9Riy6qjRB2XUIU8ctLErmoldvgizwVuKOAXPGCcCkiIXQFtxC5LE/sYpihqEnsTk7wEGGVeeX53WBR7fmBR4vlpFnX0/A4savP8wKJ2z1eBxPPTLOr3NosSz++xqFf/kUY2oJ1Gnmhop5FHSGj0an6MafRqfuxIo/fnx4RGYX6MaRTmx67RKKjthQx69S8pbdvbKS0rndIGsYQE2C4gBnaHlFaXTmktw6Oj1uHxg5QWD49dSmlF6ZQWHK3AsD7P4pyWsv1RVNHFnBZs/8OcpoEZUrbfktOC7XfMaWqQ5DRr2MZNOqdpQHtOC7bfy2l/XX8ACrYiZGZgGQ8AAAAASUVORK5CYII=") no-repeat 50% 100%',
        backgroundSize: 'contain',
        opacity: 0.6,
    },
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: '40%',
        display: 'table',
        width: '100%',
        verticalAlign: 'middle',
    },
    content: {
        backgroundColor: '#FFF',
        padding: '4em 1.4em 6em',
        borderRadius: '0.5em',
        position: 'absolute',
        left: '0.3em',
        right: '0.3em',
        top: '40%',
        bottom: '5%',
        overflow: 'hidden',
        zIndex: 60,
    },
    innerTop: {
        overflow: 'hidden',
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'middle',
    },
    h2: {
        fontSize: '1.7em',
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: 1.05,
        position: 'relative',
        zIndex: 60,
        letterSpacing: '0.02em',
    },
    divInput: {
        overflow: 'hidden',
        position: 'relative',

        // margin: '3.1em 1.8em 0',
        margin: '0.3em 1.8em 1em 1.8em',
    },
    inputMask: {
        width: '90%',
        position: 'relative',
        padding: '0 5% 1.22em',
        border: 0,
        backgroundColor: '#FFF',
        wordSpacing: '0,2em',
        borderRadius: '0.1em',
        fontSize: '1.55em',
        color: '#000',
        textAlign: 'center',
        lineHeight: '1.8',
        // minHeight: '20em'
    },
    spanInput: {
        zIndex: 20,
        position: 'absolute',
        top: '3em',
        borderTop: '0.05em solid #8B8B8B',
        lineHeight: 2,
        left: 0,
        right: 0,
        color: '#939393',
        fontSize: '0.85em',
        fontWeight: 300,
        letterSpacing: '0.04em',
        pointerEvents: 'none',
        textAlign: 'center',
    },
    divButton: {
        position: 'relative',
        overflow: 'hidden',
    },
    button: {
        background: 'linear-gradient(to bottom, rgba(38,45,48,1) 0%, rgba(38,31,40,1) 100%)',
        color: '#FFF',
        border: 0,
        borderRadius: '4em',
        position: 'relative',
        zIndex: '20',
        width: '100%',
        margin: '0.9em 0 1.5em',
        lineHeight: 3.7,
        paddingBottom: '0.1em',
        fontSize: '1.2em',
        fontWeight: 500,
        cursor: 'pointer',
        letterSpacing: '0.045em',
    },
    shadowButton: {
        position: 'absolute',
        zIndex: '10',
        width: '74%',
        left: '13%',
        height: '4em',
        bottom: '1em',
        borderRadius: '2em',
        backgroundColor: '#ABB0B8',
        filter: 'blur(4px)',
    },
    mag: {
        position: 'absolute',
        overflow: 'hidden',
        height: '8em',
        width: '8em',
        zIndex: '2',
    },
    magOne: {
        right: 0,
        top: 0,
        background: 'url(mag1.png) no-repeat 0 100%',
        backgroundSize: 'contain',
    },
    magTwo: {
        right: 0,
        bottom: 0,
        background: 'url(mag2.png) no-repeat 100% 100%',
        backgroundSize: 'contain',
    },
    magThree: {
        left: 0,
        bottom: 0,
        background: 'url(mag3.png) no-repeat 0 100%',
        backgroundSize: 'contain',
    },
    magFour: {
        left: 0,
        top: 0,
        background: 'url(mag4.png) no-repeat 0 0',
        backgroundSize: 'contain',
    },
    indexMenu:{
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
        opacity: .6,
    },
    customMenu:{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
    },
    textFot: {
        zIndex: 20,
        lineHeight: 1.2,
        color: '#939393',
        fontSize: '1em',
        fontWeight: 300,
        letterSpacing: '0.04em',
        textAlign: 'center',
        maxWidth: '80%',
        margin: '0 auto',
    }
};
class AuthHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            width: '0',
            height: '0',
            msisdn: ''
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    onChange = event => {
        this.setState({
            msisdn: event.target.value
        });
    };

    buttonClicked = () => AuthHelper.checkMsisdn(this.state.msisdn);

    render() {
        return (
            <div style={Object.assign({}, styles.header, {height: this.state.height+'px'})}>
                <div style={styles.mask}>
                    <div style={styles.bg} />
                    <div style={styles.colorOne} />
                    <div style={styles.colorTwo} />
                    <div style={styles.colorThree} />
                </div>
                <div style={styles.inner}>
                    <div style={styles.top}>
                        <div style={styles.innerTop}>
                            <div style={styles.indexMenu}>
                                <IndexMenu payment_trigger={this.props.payment_trigger} auth_data={this.props.auth_data} data={this.props.data}/>
                            </div>
                            {/*<div style={styles.customMenu}>*/}
                                {/*<CustomMenu data={this.props.data}/>*/}
                            {/*</div>*/}
                            <Link to="/" style={styles.h1}>
                                киоск плюс<span style={styles.arrow} />
                            </Link>
                        </div>
                    </div>
                    <div style={styles.content}>
                        <div style={Object.assign({}, styles.mag, styles.magOne)} />
                        <div style={Object.assign({}, styles.mag, styles.magTwo)} />
                        <div style={Object.assign({}, styles.mag, styles.magThree)} />
                        <div style={Object.assign({}, styles.mag, styles.magFour)} />
                        <h2 style={styles.h2}>Вход и регистрация</h2>
                        <div style={styles.divInput}>
                            <span style={styles.spanInput}>Ваш номер телефона</span>
                            <InputMask
                                onKeyPress={(e) => e.charCode === 13 ? this.buttonClicked() : null}
                                onChange={this.onChange}
                                value={this.state.msisdn}
                                style={styles.inputMask}
                                type="tel"
                                mask="+7 (999) 999-99-99"
                                placeholder="+7 (   )    -  -  "
                                maskChar=" " />
                            <div style={styles.divButton}>
                                <button onClick={this.buttonClicked} style={styles.button}>Продолжить</button>
                                <div style={styles.shadowButton} />
                            </div>
                            <p style={styles.textFot}>Если у вас еще нет учетной записи, мы&nbsp;создадим ее автоматически</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthHeader;