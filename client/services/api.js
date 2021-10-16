import Axios from "axios";

let urls = {
    development: 'http://localhost:3500/',
    production: 'https://accounts.koompi.com/'
}

const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;