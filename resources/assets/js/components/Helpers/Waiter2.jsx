import React, { Component } from 'react';

const STYLES = {
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    thing: {
        height: '30px',
        width: '6px',
        background: '#f2f2f2',
        position: 'absolute',
        animation: 'something_maybe_cool_idk 2s infinite ease'
    },
    superContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: '#292929',
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

export default class Waiter extends Component {
    constructor(props) {
        super(props);
    }

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

    render() {
        this.renderKeyFrames();
        return (
            <div style={STYLES.superContainer}>
                <div style={STYLES.container}>
                    {this.renderThings()}
                </div>
            </div>
        )
    }
}