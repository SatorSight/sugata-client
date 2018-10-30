import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
import HubHeader from '../Components/HubHeader';
import NewArticles from '../../containers/NewArticles';
import Footer from '../Components/Footer';
import PropTypes from 'prop-types';
import { getResource } from '../Helpers/dataComposer';

const mapStateToProps = state => ({
    loading: state.server.loading,
    self_id: state.router.self_id,
    state: state,
});

class TagPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const tag = getResource(this.props.state, 'tag');

        const links_labels = {
            title: (tag && tag.is_hub ? 'Новые статьи' : 'Статьи по тегу ' + (tag.name || '')),
        };

        return (
            !this.props.loading && <div>
                <Header />
                {tag && tag.is_hub && <HubHeader tag={tag} />}
                <NewArticles no_links {...links_labels} resource={'articles'}/>
                <Footer />
            </div>
        );
    }
}

TagPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    self_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(mapStateToProps)(TagPage);