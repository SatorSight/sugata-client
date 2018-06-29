import * as action_types from '../constants/ActionTypes';


// import * as ResourceRoutes from "../components/Helpers/ResourceRoutes";
export function startLoading(){
    return {
        type: action_types.START_LOADING,
    }
}

export function stopLoading(){
    return {
        type: action_types.STOP_LOADING,
    }
}



export function loadAuthData(){
    return dispatch => {
        return fetch('/api/auth/load_auth_data', {credentials: 'include'})
            .then(data => data.json())
            .then(json => {
                return dispatch(receiveAuthData(json));
            });
    }
}

export function receiveAuthData(data){
    return {
        type: action_types.RECEIVE_AUTH_DATA,
        payload: data,
    }
}







export function loadResource(resource, page_prefix, self_id){
    return dispatch => {
        return fetch('/api/' + page_prefix + '/' + resource + (self_id ? `/${self_id}` : ''))
            .then(data => data.json())
            .then(json => {
                return dispatch(receiveResource(json, resource, self_id));
            });
    }
}

function receiveResource(data, resource, self_id){
    let payload = {
        data: data,
        resource: resource,
        self_id: self_id,
    };

    return {
        type: action_types.RECEIVE_RESOURCE,
        payload: payload,
    }
}











// export function fetchAuthData(){
//     return dispatch => {
//         dispatch(startLoading());
//
//         fetch('/api/auth/load_auth_data', {credentials: 'include'})
//             .then(r => r.json())
//             .then(data => dispatch(receiveAuthData(data)));
//     }
// }





// export function fetchBundles(){
//     return dispatch => {
//         // dispatch(startLoading());
//
//         return fetch('/api/index/bundles')
//             .then(response => response.json())
//             .then(bundles => dispatch(receiveBundles(bundles)))
//     }
// }
//
// function receiveBundles(bundles) {
//     return {
//         type: action_types.RECEIVE_BUNDLES,
//         payload: bundles,
//     }
// }

// export function loadBundles(){
//
//     return fetch()
//         .then(r => r.json());
//
//
//     // return {
//     //     type: action_types.OPEN_NAV_MENU
//     // }
// }

