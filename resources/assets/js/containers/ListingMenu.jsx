import { connect } from 'react-redux';
import { openListing, closeListing } from '../actions/nav_menu';
import Menu from '../components/Components/ListingMenu';
import { getResource } from '../components/Helpers/dataComposer';

const mapStateToProps = state => ({
    open: state.navMenu.openListing,
    listing: getResource(state, 'listing'),
});

const mapDispatchToProps = dispatch => ({
    doOpenListing: () => {dispatch(openListing())},
    doCloseListing: () => dispatch(closeListing()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);