import * as action_types from '../constants/ActionTypes';

export function setPageHeight(height){
    return {
        type: action_types.SET_PAGE_HEIGHT,
        payload: height,
    }
}