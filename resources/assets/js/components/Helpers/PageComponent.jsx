import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";


export default class PageComponent extends Component {
    self_id = null;

    constructor(props){
        super(props);

        this.state = {
            data: {},
            loading: true
        };

        this.self_id = this.props.match.params.id;
    }

    componentDidMount(){
        SUtils.load(this.getRoutesObject(), this);
    }
    componentWillReceiveProps(nextProps){
        this.self_id = nextProps.match.params.id;
        SUtils.load(this.getRoutesObject(), this);
    }

    loadMoreNew = () => SUtils.appendStateWithApiRequestFor('new_articles', this.getEntity(), 'more_new_articles', this, this.self_id);
    loadMorePopular = () => SUtils.appendStateWithApiRequestFor('popular_articles', this.getEntity(), 'more_popular_articles', this, this.self_id);

    getEntity = () => {
        const path = SUtils.getUrlPath();
        return path[1];
    };

    getRoutesObject = () => {
        const entity = this.getEntity();
        if(entity === 'bundle')
            return ResourceRoutes.BUNDLE_RESOURCES;
        if(entity === 'journal')
            return ResourceRoutes.JOURNAL_RESOURCES;
        if(entity === 'issue')
            return ResourceRoutes.ISSUE_RESOURCES;
        if(entity === 'article')
            return ResourceRoutes.ARTICLE_RESOURCES;
        if(SUtils.empty(entity))
            return ResourceRoutes.MAIN_RESOURCES;
    };




}