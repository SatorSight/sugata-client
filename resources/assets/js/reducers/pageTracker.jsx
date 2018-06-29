import {
    PAGE_VISITED,
} from '../constants/ActionTypes';

import { getCookie } from '../components/Helpers/SUtils';

const initialState = {
    pages_viewed: parseInt(getCookie('pages_visited')) || 0,
};

const page_tracker = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_VISITED:
            return {
                ...state,
                pages_viewed: action.payload,
            };
        default:
            return state;
    }
};

export default page_tracker;