import React, { Component } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import InputMask from 'react-input-mask';
import AuthHelper from '../Helpers/AuthHelper';

import { withStyles } from 'material-ui/styles';

const mapStateToProps = state => ({
    loading: state.server.loading,
    auth_data: state.server.auth_data,
    bundles: state.server.bundles,
});


const styles = {
    header: {
        width: '100%',
        position: 'relative',
        // background: '#000',
        // height: '100vh'
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
    inner: {
        position: 'relative',
        maxWidth: '720px',
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
        position: 'relative',
        width: '50%',
        margin: '0 auto 10em',
        minWidth: '28em',
        overflow: 'hidden',
        zIndex: 60,
    },
    innerTop: {
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
        height: '40vh',
        justifyContent: 'center',
        alignItems: 'center'
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
        // margin: '0.9em 0 1.5em',
        lineHeight: 3.7,
        // paddingBottom: '0.1em',
        fontSize: '1.3em',
        padding: '1.3em 0px 1em 0',
        textTransform: 'capitalize',

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
        opacity: .8,
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
    },
    arrow2: {
        textAlign: 'center',
        margin: '2em 0',
    },
    subText: {
        textAlign: 'center',
        fontSize: '1rem',
        margin: '0.5em 2em',
    },
    phoneLabel: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
};

const arrow = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="7px"  viewBox="0 0 13 34">
    <g id="Оплата-флоу" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="14" transform="translate(-359.000000, -581.000000)" stroke="#979797" strokeWidth="2.39999986">
            <g id="Group-10" transform="translate(363.089610, 598.270215) rotate(-9.000000) translate(-363.089610, -598.270215) translate(358.089610, 582.770215)">
                <path d="M9.77634928,0.152576715 C1.1788174,9.85161948 1.1788174,20.0573573 9.77634928,30.76979" id="Path-5"></path>
                <polyline id="Path-6" points="0.393106469 25.9807411 9.55617587 30.6536062 9.55617587 19.6813927"></polyline>
            </g>
        </g>
    </g>
</svg>;


class AuthPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            msisdn: ''
        };
    }

    onChange = event => {
        this.setState({
            msisdn: event.target.value
        });
    };

    buttonClicked = () => AuthHelper.checkMsisdn(this.state.msisdn);

    render() {
        const { classes } = this.props;
        return (
            !this.props.loading && <div>
                <Header/>

                <div className={classes.header}>
                    <div className={classes.content}>
                        <h2 className={classes.h2}>Вход и регистрация</h2>
                        <div className={classes.subText}>Еще немного, и вы сможете читать Киоск Плюс</div>
                        <div className={classes.arrow2}>{arrow}</div>
                        <div className={classes.phoneLabel}>Ваш номер телефона:</div>
                        <div className={classes.divInput}>
                            <span className={classes.spanInput}>&nbsp;</span>
                            {/*<span className={classes.spanInput}>Ваш номер телефона</span>*/}
                            <InputMask
                                onKeyPress={(e) => e.charCode === 13 ? this.buttonClicked() : null}
                                onChange={this.onChange}
                                value={this.state.msisdn}
                                className={classes.inputMask}
                                type="tel"
                                mask="+7 (999) 999-99-99"
                                placeholder="+7 (   )    -  -  "
                                maskChar=" " />
                            {/*<p className={classes.textFot}>*/}
                            <p style={{color: 'black'}} className={classes.textFot}>
                                Автоматически определим, если
                                вы уже зарегистрированы и
                                оплатили подписку
                            </p>
                        </div>
                        {/*<div className={classes.info}>*/}
                            {/*Автоматически определим, если*/}
                            {/*вы уже зарегистрированы и*/}
                            {/*оплатили подписку*/}
                        {/*</div>*/}
                        <div style={{transform: 'scaleX(-1)'}} className={classes.arrow2}>{arrow}</div>




                        {/*<div className={classes.divButton}>*/}
                            {/*<button onClick={this.buttonClicked} className={classes.button}>Продолжить</button>*/}
                            {/*<div className={classes.shadowButton} />*/}
                        {/*</div>*/}


                        <Button classes={{}} color="primary" className={classes.button} onClick={this.buttonClicked}>
                            Продолжить
                        </Button>


                    </div>
                </div>


                <Footer />
            </div>
        );
    }
}


export default withStyles(styles)(connect(mapStateToProps)(AuthPage));

// export default connect(mapStateToProps)(AuthPage);