import * as action_types from '../constants/ActionTypes';

export function set_phrase(phrase){
    return {
        type: action_types.SET_SEARCH_PHRASE,
        payload: phrase,
    }
}