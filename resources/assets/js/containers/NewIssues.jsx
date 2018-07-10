import { connect } from 'react-redux';
import Issues from '../components/Components/NewIssues';
import { getResources } from '../components/Helpers/dataComposer';

const mapStateToProps = (state, ownProps) => ({
    issues: getResources(state, ownProps),
    count: ownProps.count,
    title: ownProps.title,
    link: ownProps.link,
    label: ownProps.label,
    no_links: ownProps.no_links,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Issues);