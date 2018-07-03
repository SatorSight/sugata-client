export function paymentTrigger(bundle_id, user_bundles){
    if(!userHasAccess(bundle_id, user_bundles))
        redirectToAuth(bundle_id);
}

export function userHasAccess(bundle_id, user_bundles){
    let has_bundle_access = false;
    user_bundles.map(b => {
        if(bundle_id){
            if(parseInt(b) === parseInt(bundle_id)){
                has_bundle_access = true;
            }
        }
    });
    return has_bundle_access;
}

export function redirectToAuth(bundle_id){
    const current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.location = '/auth?return_url=' + current_url + (bundle_id ? '&bundle_id=' + bundle_id : '');
}