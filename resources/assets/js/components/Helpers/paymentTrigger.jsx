export function paymentTrigger(bundle_id, user_bundles){

    // console.log('paymentTrigger');
    // console.log(bundle_id);
    // console.log(user_bundles);
    // return false;

    let has_bundle_access = false;
    user_bundles.map(b => {
        if(bundle_id){
            if(parseInt(b) === parseInt(bundle_id)){
                has_bundle_access = true;
            }
        }
    });

    if(!has_bundle_access){
        const current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.location = '/auth?return_url=' + current_url + (bundle_id ? '&bundle_id=' + bundle_id : '');
    }
}