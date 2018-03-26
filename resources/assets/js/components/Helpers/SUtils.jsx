export function in_array(needle, haystack) {
    return haystack.indexOf(needle) !== -1;
}

export const OK_RESULT = 'ok';

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

export function empty(haystack) {
    if(haystack === undefined)
        return true;
    return haystack.length === 0
}

export function first(haystack) {
    return haystack.find(() => true);
}

export function clone_array(haystack) {
    return haystack.slice(0);
}

export function makeQuery(payload, method, query, callback) {
    if(method === 'GET' || method === 'get'){
        const query_string = `/${query}/${JSON.stringify({data: payload})}/`;
        fetch(query_string, {method: method, credentials: 'include'})
            .then(res => res.json())
            .then(data => callback());
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


export function buildParamStringFromObject(object){
    let params_array = [];
    Object.keys(object).map(key => params_array.push(`${key}=${object}`));
    let param_string = params_array.join('&');
    if(param_string.length > 0)
        param_string = `/?${param_string}`;
    return param_string;
}

export function loadAuthorizationToState(_this){
    fetch('/api/auth/user_authorized/', {credentials: 'include'})
        .then(data => data.json())
        .then(json => {
            if(json['result'] === 'ok'){
                _this.setState({authorized: true});
            }
        })
}


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


export function appendStateWithApiRequestFor(entity, page_prefix, api_route, _this, self_id = null, additional_params = []) {
    const current_data = _this.state.data[entity];
    const count = current_data.length;
    fetch('/api/' + page_prefix + '/' + api_route + '/' + (self_id ? (self_id + '/') : '') + count + '')
        .then(data => data.json())
        .then(json => {
            let data = { ..._this.state.data };
            data[entity] = data[entity].concat(json);
            _this.setState({ data });
        })
}
//
// export function load(resource, page_prefix, self_id) {
//     updateStateWithApiRequestFor(resource, this.page_prefix, this.state._this);
// }

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

export function load(route, _this){
    _this.setState({loading: true}, () => {
        loadAll(route, () => _this.setState({loading: false}), _this, _this.self_id);
    });
}
