import React, { Component } from 'react';
import * as SUtils from "../Helpers/SUtils";
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import PropTypes from 'prop-types';

import { startLoading, stopLoading, loadAuthData, loadResource } from '../../actions/server';
import { receiveSelfId, receiveEntity } from '../../actions/router';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state: state.server,
    self_id: state.router.self_id,
    entity: state.router.entity,
});

let c = 0;

const mapDispatchToProps = dispatch => ({
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading()),
    loadResource: (resource, page_prefix, self_id) => dispatch(loadResource(resource, page_prefix, self_id)),
    loadAuthData: () => dispatch(loadAuthData()),
    receiveSelfId: self_id => dispatch(receiveSelfId(self_id)),
    receiveEntity: entity => dispatch(receiveEntity(entity)),
});


class DataLoader extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const self_id = this.getSelfIdFromProps(this.props);
        const entity = this.getEntityFromProps(this.props);

        // if self id is not present reload component with it
        if(self_id && !this.props.self_id) {
            this.props.receiveSelfId(self_id);
            this.props.receiveEntity(entity);
        }else {
            console.log('load from mounting');
            this.loadEverything();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        const self_id = this.getSelfIdFromProps(this.props);
        const entity = this.getEntityFromProps(this.props);

        if(!self_id && !this.props.self_id
            && this.props.entity !== prevProps.entity
            && prevProps.entity !== null) {

            if(c > 3){
                console.log('RECURSION');
            }else{
                console.log('load from entity update');

                this.loadEverything();
                return true;
            }
        }


        if(!self_id && entity !== this.props.entity){
            this.props.receiveEntity(entity);
        }

        if(self_id !== this.props.self_id) {
            if(this.getEntity() !== 'article' || prevProps.entity !== this.getEntity()) {
                this.props.receiveSelfId(self_id);
            }
            this.props.receiveEntity(entity);
        }else{
            if(this.props.self_id !== prevProps.self_id || (!SUtils.empty(entity) && entity !== prevProps.entity)) {
                // article swiping hardcode
                if(!this.entityChanged(this.getEntity(), prevProps)
                    && this.getEntity() === 'article'
                    && prevProps.self_id)
                    return false;

                console.log('load from update');

                this.loadEverything(true);
            }
        }
    }

    componentWillReceiveProps(nextProps){
        const self_id = this.getSelfIdFromProps(nextProps);
        const entity = this.getEntityFromProps(this.props);

        if(self_id && this.getEntity() !== 'article') {
            this.props.receiveSelfId(self_id);
            this.props.receiveEntity(entity);
        }
    }

    loadAuthData = () => this.props.loadAuthData();

    //reload - all except initial page load
    loadEverything = (reload = false) => {
        this.props.startLoading();

        const res_promise = this.loadResources(reload);
        const auth_promise = this.props.state.auth_data ? null : this.loadAuthData();

        //only initial load
        let promises = [res_promise];
        if(auth_promise)
            promises.push(auth_promise);

        Promise.all(promises).then(() => this.props.stopLoading());
    };

    loadResources = reload => {
        this.scroll_top();

        const routes = this.getRoutesObject();
        if(!routes){
            return false;
        }
        const page_prefix = routes.page_prefix;

        let promises = [];
        if(routes.hasOwnProperty('static'))
            routes.static.map(resource => {
                if(!this.resourceLoaded(resource))
                    promises.push(this.props.loadResource(resource, page_prefix));
            });

        if(routes.hasOwnProperty('with_self_id'))
            routes.with_self_id.map(resource => {
                if(!this.resourceLoadedWithId(resource, this.getSelfIdFromProps(this.props))){
                    promises.push(this.props.loadResource(resource, page_prefix, this.props.self_id));
                }
            });

        return Promise.all(promises);
    };

    resourceLoaded = resource => !!this.props.state[resource];
    resourceLoadedWithId = (resource, id) => this.props.state[id] && this.props.state[id][resource];

    getSelfIdFromProps = props => SUtils.idFromUrl(props.match.params[0]) || null;
    // getEntityFromProps = props => (props && props.match) ? SUtils.entityFromUrl(props.match.params[0]) : null;
    getEntityFromProps = props => {
        const entity = SUtils.entityFromUrl(props.match.params[0]);

        //for index page
        if (entity === '')
            return '';

        return SUtils.empty(entity) ? null : entity;
    };
    entityChanged = (entity, oldProps) => {
        return entity !== oldProps.entity;
    };

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
        if(entity === 'tag')
            return ResourceRoutes.TAG_RESOURCES;
        if(entity === 'tag_search')
            return ResourceRoutes.TAG_SEARCH_RESOURCES;
        if(entity === 'article')
            return ResourceRoutes.ARTICLE_RESOURCES;
        if(entity === 'pay')
            return ResourceRoutes.PAY;
        if(entity === 'index')
            return ResourceRoutes.MAIN_RESOURCES;
        if(entity === 'auth')
            return ResourceRoutes.AUTH_RESOURCES;

        if(entity === 'all_issues')
            return ResourceRoutes.ALL_ISSUES;
        if(entity === 'all_issues_journal')
            return ResourceRoutes.ALL_ISSUES_JOURNAL_RESOURCES;
        if(entity === 'all_issues_bundle')
            return ResourceRoutes.ALL_ISSUES_BUNDLE_RESOURCES;
        return null;
    };

    scroll_top = () => scrollTo(0, 0);

    render(){
        return null;
    }
}

DataLoader.propTypes = {
    //todo fix this, why string?
    self_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    entity: PropTypes.string,
    state: PropTypes.object,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    loadResource: PropTypes.func.isRequired,
    loadAuthData: PropTypes.func.isRequired,
    receiveSelfId: PropTypes.func.isRequired,
    receiveEntity: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataLoader);