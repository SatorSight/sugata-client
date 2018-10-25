import {
    SET_SEARCH_PHRASE,
} from '../constants/ActionTypes';

const initialState = {
    phrase: '',
};

const tagSearch = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_PHRASE:
            return {
                ...state,
                phrase: action.payload,
            };

        default:
            return state;
    }
};

export default tagSearch;