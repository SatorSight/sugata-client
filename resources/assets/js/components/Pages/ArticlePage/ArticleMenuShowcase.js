import React, { Component } from 'react';

const styles = {
    main: {
        padding: '1em 0',
    },
    item: {
        padding: '0 3.2em',
    },
    name: {
        color: '#999',
        fontSize: '1.2em',
        lineHeight: 4,
        fontWeight: 300,
        letterSpacing: '0.3em',
        textDecoration: 'none',
        textTransform: 'uppercase',
    },
};

class ArticleMenuShowcase extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div style={styles.main}>
                    {this.props.data.bundles.map(bundle =>
                        <div style={styles.item} key={bundle.id}>
                            <a href={'#'} style={styles.name}>{bundle.name}</a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ArticleMenuShowcase;