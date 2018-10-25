import { connect } from 'react-redux';
import TagSearch from '../components/Components/TagSearch';
import { set_phrase } from '../actions/set_phrase';

const mapStateToProps = (state, ownProps) => ({
    phrase: state.tagSearch.phrase,
});

const mapDispatchToProps = dispatch => ({
    set_phrase: phrase => dispatch(set_phrase(phrase)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagSearch);