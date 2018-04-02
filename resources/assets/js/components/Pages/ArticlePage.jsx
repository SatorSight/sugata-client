import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";

export default class ArticlePage extends Component {

    self_id = null;

    constructor(props){
        super(props);

        this.self_id = this.props.match.params.id;

        this.state = {
            data: {},
            loading: true,
        };
    }

    componentDidMount(){
        SUtils.load(ResourceRoutes.ARTICLE_RESOURCES, this);
    }
    componentWillReceiveProps(){
        SUtils.load(ResourceRoutes.ARTICLE_RESOURCES, this);
    }

    render() {
        return <div>{JSON.stringify(this.state.data)}</div>;
    }
}