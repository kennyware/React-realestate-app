import { SET_LOAD } from "./types";

export const startLoading = () => dispatch => {
    dispatch({
        type: SET_LOAD,
        loading: true
    })
}

export const stopLoading = () => dispatch => {
    dispatch({
        type: SET_LOAD,
        loading: false
    })
}