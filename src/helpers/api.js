import axios from 'axios'
axios.defaults.baseURL = 'https://bitbucket.org/ilakhmotkin/front-end-assesment-ru/raw/525e8e2fbee5cd98a80499c400f569e77b4f6ffd/server-response.json';

export function get(_this, url, payload, successCallback, errorCallback) {
    let headers = '';

    return axios({
        method: 'GET',
        url: url,
        params: payload.params,
        headers: headers
    }).then(response => {
        successCallback( response );
    }).catch(error => {
        if(errorCallback)
            errorCallback( error );
    });
}