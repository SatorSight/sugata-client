import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = {
    root: {
        paddingBottom: '1em',
        overflow: 'hidden',
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

        fontFamily: 'Montserrat',
        lineHeight: 1,

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



class ArticleTags extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let { tags, classes } = this.props;

        return (
            tags.length > 0 && <div className={classes.root}>
                <span className={classes.title}>
                    {tags ? <Link className={classes.link} to={`/tag_search/`}>{tags && tags.length}</Link> : ''} ТЕМЫ
                </span>
                <div className={classes.main}>
                    {tags && tags.map((tag, currentIndex) =>
                        <div key={`all_tags_${tag.id}`} className={classes.item}>
                            <Link to={`/tag/${tag.id}`} className={classes.link}>
                                {tag && tag.image_path && <img src={tag.image_path} className={classes.img} />}
                                <p style={{
                                    fontFamily: 'Montserrat',
                                    lineHeight: 1,
                                    margin: 0,
                                }} className={classes.name}>{tag.name}</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ArticleTags);