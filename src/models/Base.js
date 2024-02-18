
const createAPIUrl = (URL, ID = false, DATA = {}, deleteKeys = []) => {
    ID ? URL = URL + '/' + ID : ''
    if (!isObjectEmpty(DATA)) {
        const params = { ...objectKeyDelete(DATA, deleteKeys) }
        URL = URL + (!isObjectEmpty(params) ? urlWithParams(params) : '')
    }
    return URL
};

const urlWithParams = (params) => {
    const urlParams = new URLSearchParams(params);
    return '?' + `${urlParams.toString()}`;
}

const objectKeyDelete = (data, keys = []) => {
    keys.length ? keys.forEach(e => delete data[e]) : ''
    Object.keys(data).forEach(key => data[key] === null || data[key] === '' ? delete data[key] : '');
    return data
}

const isObjectEmpty = (object) => { return JSON.stringify(object) === '{}' ? true : false };

export { createAPIUrl, urlWithParams, isObjectEmpty, objectKeyDelete }

export const ObjectAction = { createAPIUrl, urlWithParams, isObjectEmpty, objectKeyDelete };