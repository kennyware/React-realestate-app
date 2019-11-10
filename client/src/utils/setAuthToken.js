import axios from "axios";

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['access_token'] = token
    } else {
        delete axios.defaults.headers.common['access_token']
    }
}

export default setAuthToken;