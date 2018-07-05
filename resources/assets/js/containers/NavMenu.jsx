import { connect } from 'react-redux';
import { open, close, changeActiveTab } from '../actions/NavMenuActions';
import Menu from '../components/Components/NavMenu';

const mapStateToProps = state => ({
    // active_tab: state.navMenu.active_tab,
    open: state.navMenu.open,
    bundles: state.server.bundles,
    auth_data: state.server.auth_data,
    authorized: state.server.authorized,
    // loading: state.server.loading
});

const mapDispatchToProps = dispatch => ({
    doOpen: () => {dispatch(open())},
    doClose: () => dispatch(close()),
    // changeActiveTab: index => dispatch(changeActiveTab(index)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);