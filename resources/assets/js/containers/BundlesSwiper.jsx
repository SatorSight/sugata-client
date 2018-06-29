import { connect } from 'react-redux';
import BundlesSwiper from '../components/Components/BundlesSwiper';

const mapStateToProps = state => ({
    bundles: state.server.bundles,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BundlesSwiper);