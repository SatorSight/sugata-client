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

    scroll_top = () => scrollTo(0, 0);

    componentDidMount(){

        SUtils.loadAuthDataToState(this);
        SUtils.load(this.getRoutesObject(), this);
        this.scroll_top();
    }
    componentWillReceiveProps(nextProps){
        this.self_id = nextProps.match.params.id;
        SUtils.load(this.getRoutesObject(), this);
        this.scroll_top();
    }

    loadMoreNew = () => SUtils.appendStateWithApiRequestFor('new_articles', this.getEntity(), 'more_new_articles', this, this.self_id);
    loadMorePopular = () => SUtils.appendStateWithApiRequestFor('popular_articles', this.getEntity(), 'more_popular_articles', this, this.self_id);

    getEntity = () => {
        const path = SUtils.getUrlPath();
        if(SUtils.empty(path[1]))
            return 'index';
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
        if(entity === 'index')
            return ResourceRoutes.MAIN_RESOURCES;
    };




}