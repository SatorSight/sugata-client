import React, {Component} from 'react'

export default class AllIssuesView extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.props.issues)}</pre>;
            </div>
        );
    }
}