import {
    RECEIVE_SELF_ID,
    RECEIVE_ENTITY,
} from '../constants/ActionTypes';

const initialState = {
    self_id: null,
    entity: null,
};

const router = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SELF_ID:
            return {
                ...state,
                self_id: action.payload,
            };
        case RECEIVE_ENTITY:
            return {
                ...state,
                entity: action.payload,
            };
        default:
            return state;
    }
};

export default router;