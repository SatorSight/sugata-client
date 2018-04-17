import React, {Component} from 'react';

export default class AllIssuesView extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title ? this.props.title.name : null}</h1>
                <button onClick={this.props.load_more}>Load more issues</button>
                <pre>{JSON.stringify(this.props.issues)}</pre>;
            </div>
        );
    }
}