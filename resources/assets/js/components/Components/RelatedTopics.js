import React, { Component } from "react";
import * as SUtils from './../Helpers/SUtils';
import { Link } from 'react-router-dom'

const styles = {
    root: {
        paddingBottom: '1em',
        overflow: 'hidden',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontWeight: 400,
        padding: '2.41em 1.2em 1em',
    },
    main: {
        margin: '0 -6em 0 -1.4em'
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
        color: '#FFF',
        textTransform: 'uppercase',
        padding: '0.8em 4.5em 0.6em 1.5em',
        zIndex: 20,
        position: 'relative',
        fontWeight: 300,
        letterSpacing: 1,
        fontSize: '1.2em',
        backgroundColor: 'rgba(76,76,76,0.5)',
    },
    img: {
        width: '100%',
        left: '50%',
        top: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
        // opacity: .8,
    },
    link: {
        textDecoration: 'none',
    }
};



export default class RelatedTopics extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let journals = this.props.data.journals;

        return (
            <div style={styles.root}>
                <p style={styles.title}>похожие темы</p>
                {SUtils.any(journals) ?
                    <div style={styles.main}>
                        {journals.map((journal, currentIndex) =>
                            <div key={String(currentIndex)} style={styles.item}>
                                <Link to={`/tag/${journal.id}`} style={styles.link}>
                                    <img src={journal.image_path} style={styles.img} />
                                    <p style={styles.name}>{journal.name}</p>
                                </Link>
                            </div>
                        )}
                    </div> : null }
            </div>
        );
    }
}