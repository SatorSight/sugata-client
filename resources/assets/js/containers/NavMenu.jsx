import { connect } from 'react-redux';
import { open, close } from '../actions/NavMenuActions';
import Menu from '../components/Components/NavMenu';

const mapStateToProps = state => ({
    open: state.navMenu.open,
    bundles: state.server.bundles,
    auth_data: state.server.auth_data,
    authorized: state.server.authorized,
});

const mapDispatchToProps = dispatch => ({
    doOpen: () => {dispatch(open())},
    doClose: () => dispatch(close()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);