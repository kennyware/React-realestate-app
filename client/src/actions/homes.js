import { GET_HOMES_REQUEST, 
    GET_HOMES_SUCCESS, 
    GET_SINGLE_HOME_SUCCESS, 
    GET_HOMES_FAILURE, 
    GET_SINGLE_HOME_FAILURE, 
    CLEAR_HOMES,
    FILTER_HOMES_BY_PRICE,
    SORT_HOMES_BY_PRICE_LH,
    SORT_HOMES_BY_PRICE_HL,
    SORT_HOMES_BY_DATE,
    SORT_HOMES_BY_BEDS,
    SORT_HOMES_BY_BATHS,
    FILTER_HOMES_BY_BEDS,
    FILTER_HOMES_BY_BATHS
} from './types';
import axios from 'axios';

let sorting = '';

export const getHome = id => dispatch => {
    dispatch({type: GET_HOMES_REQUEST})
    return axios.get(`/api/properties/${id}`).then(res => {
        dispatch({
            type: GET_SINGLE_HOME_SUCCESS,
            payload: res.data
        })
    }).catch(err => dispatch({
        type: GET_SINGLE_HOME_FAILURE,
        error: err.response.data.error
    }))
}

export const getHomes = query => dispatch => {
    dispatch({type: GET_HOMES_REQUEST})
    if(query) {
        return axios.get(`/api/properties?q=${query}&sort=${sorting}`).then(res => {
            dispatch({
                type: GET_HOMES_SUCCESS,
                payload: res.data,
                search: query
            })
        }).catch(err => dispatch({
            type: GET_HOMES_FAILURE,
            error: err.response.data.error
        }))
    } else {
        return axios.get(`/api/properties`).then(res => {
            dispatch({
                type: GET_HOMES_SUCCESS,
                payload: res.data,
                search: ''
            })
        }).catch(err => dispatch({
            type: GET_HOMES_FAILURE,
            error: err.response.data.error
        }))
    }
}

export const searchForHomes = query => dispatch => {
    dispatch({type: GET_HOMES_REQUEST})

    return axios.get(`/api/properties?q=${query}`).then(res => {
        dispatch({
            type: GET_HOMES_SUCCESS,
            payload: res.data
        })
    }).catch(err => dispatch({
        type: GET_HOMES_FAILURE,
        error: err.response.data.error
    }))
}

export const filterHomesByPrice = ({minPrice, maxPrice}) => dispatch => {
    minPrice = minPrice > 0 ? minPrice : 0;
    maxPrice = maxPrice > 0 ? maxPrice : Infinity;
    minPrice = Math.min(minPrice, maxPrice)
    maxPrice = Math.max(minPrice, maxPrice)
    dispatch({type: FILTER_HOMES_BY_PRICE, payload: {minPrice, maxPrice}})
}

export const filterHomesByBeds = beds => dispatch => {
    dispatch({
        type: FILTER_HOMES_BY_BEDS,
        payload: beds
    })
}

export const filterHomesByBaths = baths => dispatch => {
    dispatch({
        type: FILTER_HOMES_BY_BATHS,
        payload: baths
    })
}

export const sortHomes = sortOrder => dispatch => {
    sorting = sortOrder;
    switch(sortOrder){
        case 'listprice':
            dispatch({ type: SORT_HOMES_BY_PRICE_LH })
            break;
        case '-listprice':
            dispatch({type: SORT_HOMES_BY_PRICE_HL })
            break;
        case 'listdate':
                dispatch({type: SORT_HOMES_BY_DATE })
            break;
        case 'beds':
                dispatch({type: SORT_HOMES_BY_BEDS })
            break;
        case 'baths':
                dispatch({type: SORT_HOMES_BY_BATHS })
            break;
        default:
            return;

    }
}

export const clearHomes = () => dispatch => {
    dispatch({type: CLEAR_HOMES})
}