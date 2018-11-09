import { connect } from 'react-redux';
import SearchResults from '../components/Components/SearchResults';

const mapStateToProps = (state, ownProps) => ({
    phrase: state.tagSearch.phrase,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);