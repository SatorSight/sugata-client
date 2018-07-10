import { connect } from 'react-redux';
import BigArticles from '../components/Components/BigArticles';
import { getResources, getResource } from '../components/Helpers/dataComposer';

const mapStateToProps = (state, ownProps) => ({
    articles: getResources(state, ownProps),
    issue: getResource(state, 'issue'),
    title: ownProps.title,
    link: ownProps.link,
    label: ownProps.label,
    no_links: ownProps.no_links,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BigArticles);