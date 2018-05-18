import React, { Component } from 'react';

const STYLES = {
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    thing: {
        height: '15px',
        width: '3px',
        background: '#f2f2f2',
        position: 'absolute',
        animation: 'something_maybe_cool_idk 2s infinite ease'
    },
    superContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        // background: '#292929',
        background: '#fff',
        zIndex: 10000
    }
};

const keyframes = `
    @keyframes something_maybe_cool_idk {
      50% {
        background: purple;
        transform-origin: 50% -170%;
      }
    }
`;

let timeout_id = null;

export default class Waiter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: 0
        };

        this.fadeIn();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.loading && nextProps.loading === false)
            this.fadeOut();
        if(!this.props.loading && nextProps.loading === true)
            this.fadeIn();
    }

    fadeIn = () => {
        if(this.state.opacity <= 1){
            timeout_id = setTimeout(() => {
                this.setState({
                    opacity: (this.state.opacity > 1 ? 1 : this.state.opacity + .1)
                }, this.fadeIn);
            }, 1);
        }
    };

    fadeOut = () => {
        clearTimeout(timeout_id);
        if(this.state.opacity > 0){
            setTimeout(() => {
                this.setState({
                    opacity: (this.state.opacity <= 0 ? 0 : this.state.opacity - .05)
                }, this.fadeOut);
            }, 1);
        }else{
            this.setState({opacity: 0});
        }
    };

    shouldComponentUpdate(nextProps){
        return this.props === nextProps;
    }

    renderKeyFrames = () => {
        let styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    };

    renderThings = () => {
        let things = [];
        for(let i = 0; i++, i <= 12;){
            const style = Object.assign({}, STYLES.thing, {
                transform: `rotate(${30 * i}deg)`,
                transformOrigin: '50% -200%',
                animationDelay: `${0.25 * i}s`
            });
            things.push(<div key={i} style={style}></div>)
        }
        return things;
    };

    render(){
        this.renderKeyFrames();
        const { opacity } = this.state;

        return opacity !== 0 ? <div style={Object.assign({}, STYLES.superContainer, {opacity: this.state.opacity})}>
            <div style={STYLES.container}>
                {this.renderThings()}
            </div>
        </div> : null
    }
}