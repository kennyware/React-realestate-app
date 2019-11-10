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
} from '../actions/types';

const initialState = {
    user: null,
    error: null,
    isAuthenticated: false,
    loading: true
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                error: null,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case REGISTER:
            return{
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                error: null,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case USER_CHECKED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false
            }
        case SAVE_HOME:
            return {
                ...state,
                user: {...state.user, saved_props: state.user.saved_props.concat(action.payload)},
                loading: false
            }
        case DELETE_SAVED_HOME:
            return {
                ...state,
                user: {...state.user, saved_props: state.user.saved_props.filter(prop => prop !== action.payload)},
                loading: false
            }
        default:
            return state
    }
}