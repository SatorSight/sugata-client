import {
    SET_PAGE_HEIGHT,
} from '../constants/ActionTypes';

const initialState = {
    height: 0,
};

const pageHeight = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE_HEIGHT:
            return {
                ...state,
                height: action.payload,
            };

        default:
            return state;
    }
};

export default pageHeight;