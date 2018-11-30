import * as SUtils from "../Helpers/SUtils";

export default class AuthHelper{
    authorized = false;

    constructor(){
        // console.log('constructed');

        this.checkAuthorization();
    }

    checkAuthorization = () => {
        fetch('/api/auth/user_authorized', {credentials: 'include'})
            .then(data => data.json())
            .then(json => {
                // console.log(json)
                if(json['result'] === 'ok')
                    this.authorized = true;
            })
    };

    static checkCredentials = field => {
        if(field.length === 0){
            alert('Введите номер или email!');
            return false;
        }
        const bundle_id = SUtils.getGetParameterByName('bundle_id');
        const payload = {
            bundle_id: bundle_id,
            field: field
        };
        //writes session if its ok
        SUtils.makeQuery(payload, 'GET', 'api/auth/check_msisdn', AuthHelper.authorizeCheckCallback);
    };

    static authorizeCheckCallback = data => {
        const return_url = SUtils.getGetParameterByName('return_url') || SUtils.getIndexPageUrl();
        if(data.result === 'ok'){
            window.location = return_url;
        }else{
            if(data.result === 'redirect'){
                window.location = data.to + '?returnurl=' + return_url;
            }else {
                alert('Вы не подписаны!');
            }
        }
    };
}