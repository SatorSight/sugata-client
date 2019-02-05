import { connect } from 'react-redux';
import Hubs from '../components/Components/Hubs';

const mapStateToProps = state => ({
    hubs: state.server.hubs,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hubs);