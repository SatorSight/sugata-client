import * as action_types from '../constants/ActionTypes';
import { getCookie, setCookie } from '../components/Helpers/SUtils';

export function pageVisit(){
    const page_visits = parseInt(getCookie('pages_visited')) || 0;
    setCookie('pages_visited', page_visits + 1, 1000);

    return {
        type: action_types.PAGE_VISITED,
        payload: page_visits + 1,
    }
}