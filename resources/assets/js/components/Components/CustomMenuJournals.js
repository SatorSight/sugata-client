import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";


const styles = {
    main: {
        padding: '1.5em',
    },
    item: {
        padding: '0.5em 0 1.3em',
        position: 'relative',
        color: '#FFF',
    },
    ava: {
        position: 'absolute',
        left: 0,
        top: '0.5em',
        borderRadius: '0.2em',
        width: '6.5em',
        height: '8.5em',
        overflow: 'hidden',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        boxShadow: '0.5em 0.5em 1em rgba(0,0,0,0.2)',
    },
    inner: {
        marginLeft: '8em',
        minHeight: '8em',
    },
    over: {
        position: 'relative',
        overflow: 'hidden',
        // height: '9em',
    },
    caption: {
        display: 'inline',
        background: 'linear-gradient(to right, rgba(104,216,181,1) 0%, rgba(113,133,238,1) 100%)',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.7em 0.2em',
        fontSize: '0.9em',
        lineHeight: 2,
        textTransform: 'uppercase',
        fontWeight: 300,
    },
    title: {
        fontSize: '1.2em',
        lineHeight: 1.2,
        fontWeight: 500,
        marginBottom: '0.3em',
        maxHeight: '2.2em',
        letterSpacing: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '75%',
    },
    text: {
        fontSize: '1.1em',
        lineHeight: 1.7,
        maxHeight: '5.8em',
        color: '#999',
        overflow: 'hidden',
        position: 'relative',
        width: '90%',
        background: 'linear-gradient(to bottom, rgba(153,153,153,1) 0%, rgba(153,153,153,0) 100%)',
        backgroundClip: 'text',
        webkitBackgroundClip: 'text',
        webkitTextFillColor: 'transparent'
    },
};

class CustomMenuJournals extends Component {

    constructor(props){
        super(props);
    }
    render() {
        let journals = this.props.data.journals;
        return (
            <div>
                <div style={styles.main}>
                    {SUtils.any(journals) ? journals.map((journal, currentIndex) =>
                        <div style={styles.item} key={String(currentIndex)}>
                            <div style={Object.assign({}, styles.ava, {backgroundImage:'url(' + journal.image_path + ')' })} />
                            <div style={styles.inner}>
                                <div style={styles.over}>
                                    <h3 style={styles.title}>{journal.name}</h3>
                                    {/*<p style={styles.text}>{journal.text}</p>*/}
                                </div>
                                <div>
                                    <p style={styles.caption}>
                                        <span>{journal.bundle.name} </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default CustomMenuJournals;