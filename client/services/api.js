import axios from "axios";

let urls = {
    development: 'https://accounts.koompi.com/',
    production: 'https://accounts.koompi.com/'
}

const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;