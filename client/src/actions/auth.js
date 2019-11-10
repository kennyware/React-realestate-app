import axios from 'axios';
import { LOGIN, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTER, 
    REGISTER_FAILURE, 
    REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_CHECKED,
    LOGOUT,
    SAVE_HOME,
    DELETE_SAVED_HOME
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const checkUser = () => dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    } 

    return axios.get('/api/users/authenticate').then(res => {
        dispatch({
            type: USER_CHECKED,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: AUTH_ERROR
        })
    })
}

export const login = ({ email, password }) => dispatch => {
    dispatch({
        type: LOGIN
    })
    
    const data = {
        email,
        password
    }

    return axios.post('/api/users/login', data).then(res => {
        setAuthToken(res.data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: LOGIN_FAILURE,
            payload: err.response.data.error
        })
    })
}

export const register = ({username, email, password, confirmPassword}) => dispatch => {
    dispatch({
        type: REGISTER
    })
    const data = {
        username,
        email,
        password
    }

    if(password !== confirmPassword) return dispatch({type: REGISTER_FAILURE, payload: 'Passwords do not match.'})

    return axios.post('/api/users/register', data).then(res => {
        setAuthToken(res.data.token)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: REGISTER_FAILURE,
            payload: err.response.data.error
        })
    })
}

export const logout = () => dispatch => {
    return dispatch({type: LOGOUT})
}

export const saveHome = id => dispatch => {
    axios.post('/api/users/saved', {property: id}).then(res => {
        dispatch({
        type: SAVE_HOME,
        payload: id
    })}
    ).catch(err => console.log(err.response))
}

export const deleteSavedHome = id => dispatch => {
    axios.delete(`/api/users/saved/${id}`).then(res => {
        dispatch({
        type: DELETE_SAVED_HOME,
        payload: id
    })}
    ).catch(err => console.log(err.response))
}