import { connect } from 'react-redux';
import AllTags from '../components/Components/AllTags';
import { getResources } from '../components/Helpers/dataComposer';

const mapStateToProps = (state, ownProps) => ({
    tags: getResources(state, ownProps),
    phrase: state.tagSearch.phrase
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllTags);