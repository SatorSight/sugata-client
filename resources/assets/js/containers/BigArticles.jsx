import { connect } from 'react-redux';
import BigArticles from '../components/Components/BigArticles';
import { getResources } from '../components/Helpers/dataComposer';

const mapStateToProps = (state, ownProps) => ({
    articles: getResources(state, ownProps),
    title: ownProps.title,
    link: ownProps.link,
    label: ownProps.label,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BigArticles);