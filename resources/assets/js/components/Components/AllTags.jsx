import React, { Component } from "react";
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
        padding: '1em 1.2em 1em',
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
    },
};

export default class AllTags extends Component {

    constructor(props){
        super(props);
    }

    filterTags = () => {
        const phrase = this.props.phrase;
        const tags = this.props.tags;

        return tags.filter(tag => phrase === '' || tag.name.toLowerCase().includes(phrase.toLowerCase()));
    };

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.main}>
                    {this.filterTags().map((tag, currentIndex) =>
                        <div key={`all_tags_${tag.id}`} style={styles.item}>
                            <Link to={`/tag/${tag.id}`} style={styles.link}>
                                {tag && tag.image_path && <img src={tag.image_path} style={styles.img} />}
                                <p style={styles.name}>{tag.name}</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}