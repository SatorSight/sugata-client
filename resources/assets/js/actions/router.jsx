import * as action_types from '../constants/ActionTypes';

export function receiveSelfId(self_id){
    return {
        type: action_types.RECEIVE_SELF_ID,
        payload: self_id,
    }
}

export function receiveEntity(entity){
    return {
        type: action_types.RECEIVE_ENTITY,
        payload: entity,
    }
}