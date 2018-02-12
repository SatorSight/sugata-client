export function in_array(needle, haystack) {
    // let result = false;
    // haystack.map((element) => {
    //     if (needle === element)
    //         result = true;
    // });
    // return result;

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
    return haystack.length > 0
}

export function empty(haystack) {
    return haystack.length === 0
}

export function first(haystack) {
    return haystack.find(() => true);
}

export function clone_array(haystack) {
    return haystack.slice(0);
}

export function makeQuery(payload, method, query, callback) {
    let data = new FormData();
    data.append("json", JSON.stringify(payload));

    fetch(`/${query}/`,
        {
            method: method,
            body: data,
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => callback())
}

export function updateStateWithApiRequestFor(entity, _this) {
    fetch('/api/' + entity)
        .then(data => data.json())
        .then(json => {
            let data = { ..._this.state.data };
            data[entity] = json;
            _this.setState({ data });
        })
}