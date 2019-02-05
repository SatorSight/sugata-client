import { empty } from './SUtils'

// get resources for page with id, static otherwise, resource name from params
export function getResources(state, props){
    let resources = [];
    const self_id = state.router.self_id;

    if(self_id){
        if(state.server[self_id])
            resources = state.server[self_id][props.resource];
    }else{
        resources = state.server[props.resource];
    }

    return resources || [];
}


// get named resource from state
export function getResource(state, resource){

    let data = [];
    const self_id = state.router.self_id;

    // if(self_id && state.server && state.server[self_id]) {
    //     console.log(self_id);
    //     console.log(state.server);
    //     console.log(state.server[self_id]);
    //     console.log(state.server[self_id][resource]);
    //     console.log('self_id');
    // }

    if(self_id){
        if(state.server[self_id])
            data = state.server[self_id][resource];
    }else{
        // console.log('only static?');
        // console.log(resource);
        // console.log(state.server);
        // console.log(state.server[self_id]);
        data = state.server[resource];
    }

    // for auth_data cause its non-static, but goes without id
    if(empty(data) && self_id) {
        // console.log('here');
        data = state.server[resource];
    }


    // if(resource === 'article') {
    //     console.log('getting resource');
    //     console.log(self_id);
    //     console.log(resource);
    //     console.log(state);
    //     console.log(data);
    //     console.log('-----');
    // }

    // console.log('data ...');
    // console.log(state.server[resource]);
    // console.log(data);

    return data || [];
}