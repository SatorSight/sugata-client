export function in_array(needle, haystack) {
    if(!haystack || !needle)
        return false;
    return haystack.indexOf(needle) !== -1;
}

export const OK_RESULT = 'ok';

//to remove
export function merge_data(data1, data2) {
    let dates_array = [];
    let result_array = [];

    const whole_data = data1.concat(data2);
    whole_data.map((element) => {
        dates_array = push_if_not_there(element['date'], dates_array)
    });

    dates_array.map((date) => {
        let element = {};
        element['date'] = date;

        whole_data.map((data_piece) => {
            if (data_piece['date'] === date)
                Object.keys(data_piece).map((key) => {
                    if (key.indexOf('date') === -1)
                        element[key] = data_piece[key];
                });
        });

        result_array.push(element);
    });
    return result_array;
}

// +79999999999 => +7 (999) 999-99-99
export function beautifyTel(tel){
    if(empty(tel))
        return tel;
    const arr = tel.split('');
    if(empty(arr) || arr.length < 12)
        return tel;

    return arr[0] + arr[1]
        + ' ('
        + arr[2] + arr[3] + arr[4]
        + ') '
        + arr[5] + arr[6] + arr[7]
        + '-'
        + arr[8] + arr[9]
        + '-'
        + arr[10] + arr[11];
}

export function push_if_not_there(needle, haystack) {
    if (!in_array(needle, haystack))
        haystack.push(needle);
    return haystack;
}

export function toggle_array_element(needle, haystack) {
    if (!in_array(needle, haystack))
        haystack.push(needle);
    else
        haystack = remove_array_element(needle, haystack);

    return haystack;
}

export function remove_array_element(needle, haystack) {
    let resulting_array = [];
    haystack.map((element) => {
        if (element !== needle)
            resulting_array.push(element);
    });
    return resulting_array;
}

export function not_single(haystack) {
    return haystack.length !== 1
}

export function single(haystack) {
    return haystack.length === 1
}

export function any(haystack) {
    if(haystack === undefined)
        return false;
    if(haystack.length === 1 && (first(haystack) === 'null' || first(haystack) === null))
        return false;
    return haystack.length > 0
}

export function inclineRuWordByNumber(word_stem, number){
    number = parseInt(number);
    const last_tone = parseInt(number.toString().split('').pop());

    if(number < 11 || number > 20) {
        if (last_tone === 1 )
            return word_stem;
        if (last_tone > 1 && last_tone < 5)
            return word_stem + 'а';
        if (last_tone > 4 || last_tone === 0)
            return word_stem + 'ов';
    }else
        return word_stem + 'ов';
}

// PHP-like empty
export function empty(haystack){
    if(!haystack)
        return true;
    // ???
    if(Number.isInteger(haystack) && isNaN(haystack))
        return true;
    if(haystack === null)
        return true;
    if(haystack === undefined)
        return true;
    if(haystack === '')
        return true;
    if(haystack === false)
        return true;
    if(haystack.length === 0)
        return true;
    if(haystack.constructor === Object && Object.keys(haystack).length === 0)
        return true;
    return haystack instanceof DateRange && empty(haystack.from) && empty(haystack.to);
}

export function first(haystack) {
    return !empty(haystack) ? haystack.find(() => true) : null;
}

export function clone_array(haystack) {
    return haystack.slice(0);
}

// universal GET-POST api fetch call
export function makeQuery(payload, method, query, callback) {
    if(method === 'GET' || method === 'get'){
        const query_string = `/${query}/${JSON.stringify({data: payload})}/`;
        fetch(query_string, {method: method, credentials: 'include'})
            .then(res => res.json())
            .then(data => callback(data));
    }else {
        let data = new FormData();
        data.append("json", JSON.stringify(payload));

        fetch(`/${query}/`,
            {
                method: method,
                body: data,
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => callback(data))
    }
}

// build GET param string from obj properties
export function buildParamStringFromObject(object){
    let params_array = [];
    Object.keys(object).map(key => params_array.push(`${key}=${object}`));
    let param_string = params_array.join('&');
    if(param_string.length > 0)
        param_string = `/?${param_string}`;
    return param_string;
}
// to remove
export function loadAuthorizationToState(_this){
    fetch('/api/auth/user_authorized', {credentials: 'include'})
        .then(data => data.json())
        .then(json => {
            if(json['result'] === 'ok'){
                _this.setState({authorized: true});
            }
        })
}

// to remove
export function updateStateWithApiRequestFor(entity, page_prefix, _this, params = {}, self_id = null) {
    const params_string = buildParamStringFromObject(params);
    return fetch('/api/' + page_prefix + '/' + entity + (self_id ? `/${self_id}` : '') + params_string + '')
        .then(data => data.json())
        .then(json => {
            let data = { ..._this.state.data };
            data[entity] = json;
            _this.setState({ data });
        })
}

// to remove
export function appendStateWithApiRequestFor(entity, page_prefix, api_route, _this, self_id = null, additional_params = []) {
    const current_data = _this.state.data[entity];
    const count = current_data.length;
    return fetch('/api/' + page_prefix + '/' + api_route + '/' + (self_id ? (self_id + '/') : '') + count + '')
        .then(data => data.json())
        .then(json => {
            let data = { ..._this.state.data };
            data[entity] = data[entity].concat(json);
            _this.setState({ data });
        })
}

// to remove
//loads all given routes from ResourceRoutes
export function loadAll(routes, callback, _this, self_id = null){

    let promises = [];

    if(routes.hasOwnProperty('static'))
        promises = promises.concat(routes.static.map(resource =>
            updateStateWithApiRequestFor(resource, routes.page_prefix, _this)));

    // if(routes.hasOwnProperty('with_from'))
    //     promises = promises.concat(routes.with_from.map(resource => appendStateWithApiRequestFor(resource, routes.page_prefix, _this)));

    if(routes.hasOwnProperty('with_self_id'))
        promises = promises.concat(routes.with_self_id.map(resource =>
            updateStateWithApiRequestFor(resource, routes.page_prefix, _this, {}, self_id)));

    Promise.all(promises).then(() => callback());
}

// to remove
export function loadAuthDataToState(_this){
    fetch('/api/auth/load_auth_data', {credentials: 'include'})
        .then(r => r.json())
        .then(data => {
            console.log('---------------data-------------');
            console.log(data);
            _this.setState({auth_data: data});
        });
}

// to remove
export function load(route, _this){
    _this.setState({loading: true}, () => {
        loadAll(route, () => _this.setState({loading: false}), _this, _this.self_id);
    });
}

// array with url parts
export function getUrlPath(){
    const path = window.location.pathname;
    return path.split('/');
}

export function capitalize(string){
    console.log('WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
    const dummy = 1;

    if(string.charAt(0) === '"')
        string = string.slice(1);
    if(string.charAt(string.length - 1) === '"')
        string = string.slice(0, string.length - 1);

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

// ???
export function getGetParameterByName(name){
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// ???
export function getIndexPageUrl(){
    const url = window.location.href;
    const parts = url.split('/');
    return parts[0] + '/' + parts[1] + '/' + parts[2];
}

export function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, timing){
    let date = new Date;
    date.setDate(date.getDate() + timing);
    document.cookie = name+'='+value+'; path=/; expires='+date.toUTCString();
}

// Y-m-d => Март 2018
export function toRuMonthYearLocale(date_string){
    let date = new Date(date_string);
    const options = {
        year: 'numeric',
        month: 'long',
    };

    let ru_date = date.toLocaleString('ru', options);
    ru_date = ru_date.replace(' г.', '');
    ru_date = capitalize(ru_date);

    return ru_date;
}

export function last(haystack) {
    if(haystack && haystack.length > 0)
        return haystack[haystack.length - 1];
    else
        return false;
}

export function propOrNull(obj, prop){
    if(!obj)
        return null;
    if(!obj.hasOwnProperty(prop))
        return null;
    return obj[prop];
}

//second url part after slash
export function idFromUrl(url){
    return url.split('/')[1];
}

//first url part after slash
export function entityFromUrl(url){
    return url.split('/')[0];
}

// [1,2,3] => false, [1,2,4] => true
export function sequenceBroken(array){
    return undefined !== array.find((el, key, _array) => {
        if(_array[key + 1]){
            if(el + 1 !== _array[key + 1]){
                return true;
            }
        }
        return false;
    });
}

export class DateRange{
    constructor(from = null, to = null){
        this.from = from || '';
        this.to = to || '';
    }

    static plain(){
        return {
            from: this.from,
            to: this.to
        }
    }
}

// js wtf ...
export function dateToFormattedInputString(date){
    return date
        .toLocaleDateString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'})
        .split('.')
        .reverse()
        .join('-');
}