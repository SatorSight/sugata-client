import * as action_types from '../constants/ActionTypes';

function lockBody(){
    // document.querySelector('#root').style.overflow = 'hidden';
    // document.querySelector('#root').style.position = 'fixed';
}

function unlockBody(){
    // document.querySelector('#root').style.overflow = 'auto';
    // document.querySelector('#root').style.position = 'initial';
}

export function open(){
    lockBody();
    return { type: action_types.OPEN_NAV_MENU }
}

export function close(){
    unlockBody();
    return { type: action_types.CLOSE_NAV_MENU }
}

export function openListing(){
    lockBody();
    return { type: action_types.OPEN_LISTING_MENU}
}

export function closeListing(){
    unlockBody();
    return { type: action_types.CLOSE_LISTING_MENU }
}


export function changeActiveTab(index){
    return {
        type: action_types.CHANGE_NAV_MENU_ACTIVE_TAB,
        payload: index
    }
}

