import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const styles = {
    main: {
        padding: '1em 0',
    },
    item: {
        padding: '0 3.2em',
        display: 'block',
        color: '#999',
        fontSize: '1.2em',
        lineHeight: 4,
        fontWeight: 300,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
    },
};

class IndexMenuShowcase extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div style={styles.main}>
                    {this.props.data.bundles.map(bundle =>
                        <Link key={bundle.item} style={styles.item} to={`/bundle/${bundle.id}`}>
                            {bundle.name}
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

export default IndexMenuShowcase;