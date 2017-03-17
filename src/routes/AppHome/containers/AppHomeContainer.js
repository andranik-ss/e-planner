import AppHome from '../components/HomeView';
import { connect } from 'react-redux';
import { onSetOpen, onSetDocked, onChangeSide } from '../../App/modules/sidebar';

const mapStateToProps = (state) => {
    return {
        docked   : state.getIn(['app', 'sidebar', 'sidebarDocked']),
        pullRight: state.getIn(['app', 'sidebar', 'pullRight'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetOpen: (open) => {
            dispatch(onSetOpen(open));
        },
        onSetDocked: (docked) => {
            dispatch(onSetDocked(docked));
        },
        onChangeSide: (docked) => {
            dispatch(onChangeSide(docked));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHome);
