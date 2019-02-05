import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

const styles = {
    results: {

    },
    result: {
        margin: '1em',

    },
    title: {
        fontSize: '1.5em',
        margin: '0 0 0.2em 0',
    },
    text: {
        // margin: '0 0 0 1em',
    },
    link: {
        color: 'inherit',
    }
};

class SearchResults extends Component {
    constructor(props){
        super(props);

        this.state = {
            results: [],
        };

        this.doSearch(this.props.phrase);
    }

    componentDidUpdate(prevProps) {
        if(this.props.phrase !== prevProps.phrase)
            this.doSearch(this.props.phrase);
    }

    doSearch = val => {
        if(val.length > 3)
            fetch(`/api/search/${val}`)
                .then(r => r.json())
                .then(r => this.setState({results: r}));
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.results}>
                    {this.state.results.map(r =>
                        <Link key={`search_result_${r.id}`} className={classes.link} to={`/article/${r.id}`}>
                            <div className={classes.result}>
                                <div className={classes.title} dangerouslySetInnerHTML={{__html: r.title}}></div>
                                <div className={classes.text} dangerouslySetInnerHTML={{__html: r.html}}></div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SearchResults);