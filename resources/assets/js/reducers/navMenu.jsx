import {
    OPEN_NAV_MENU,
    CLOSE_NAV_MENU,
    CHANGE_NAV_MENU_ACTIVE_TAB
} from '../constants/ActionTypes';

const initialState = {
    open: false,
    active_tab: 0
};

const navMenu = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_NAV_MENU:
            // console.log('qqq');
            return {
                ...state,
                open: true,
            };
        case CLOSE_NAV_MENU:
            return {
                ...state,
                open: false,
            };
        case CHANGE_NAV_MENU_ACTIVE_TAB:
            return {
                ...state,
                active_tab: action.payload,
            };

        default:
            return state;
    }
};



export default navMenu;