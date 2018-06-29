import {
    START_LOADING,
    STOP_LOADING,
    RECEIVE_RESOURCE,
    RECEIVE_AUTH_DATA,
} from '../constants/ActionTypes';

const initialState = {
    loading: true
};

const data = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            console.log('started loading');
            return {
                ...state,
                loading: true
            };

        case STOP_LOADING:
            console.log('stopped loading');
            return {
                ...state,
                loading: false
            };

        case RECEIVE_AUTH_DATA:
            const authorized = !!action.payload.msisdn;

            return {
                authorized: authorized,
                auth_data: action.payload,
                ...state
            };


        case RECEIVE_RESOURCE:

            /*
            * payload.self_id - ?
            * payload.resource
            * payload.data
            * */

            let data_wrapper = {};
            let data_object = {};

            if(action.payload.self_id){
                if(state[action.payload.self_id]){
                    data_object = state[action.payload.self_id];
                    data_object[action.payload.resource] = action.payload.data;

                    data_wrapper[action.payload.self_id] = data_object;
                }else{
                    data_wrapper[action.payload.self_id] = {};
                    data_wrapper[action.payload.self_id][action.payload.resource] = action.payload.data;
                }
            }else{
                data_wrapper[action.payload.resource] = action.payload.data;
            }

            return {
                ...data_wrapper,
                ...state
            };

        default:
            return state;
    }
};



export default data;