import { GET_HOMES_REQUEST,
    GET_HOMES_SUCCESS, 
    GET_SINGLE_HOME_SUCCESS, 
    GET_HOMES_FAILURE, 
    GET_SINGLE_HOME_FAILURE,
    CLEAR_HOMES,
    FILTER_HOMES_BY_PRICE,
    FILTER_HOMES_BY_BEDS,
    FILTER_HOMES_BY_BATHS,
    SORT_HOMES_BY_PRICE_LH,
    SORT_HOMES_BY_PRICE_HL,
    SORT_HOMES_BY_DATE,
    SORT_HOMES_BY_BEDS,
    SORT_HOMES_BY_BATHS
} from '../actions/types';

const initialState = {
    homes: [],
    filteredHomes: [],
    filterParams: {
        search: '',
        price: {
            minPrice: 0,
            maxPrice: Infinity
        },
        beds: 0,
        baths: 0
    },
    home: null,
    error: null,
    loading: true,
    results: true
};

let sortedHomes = [];
let filteredHomes = [];
let filterParams = {};
let results = true;

const filterHomes = (homeArray, params) => {
    return homeArray.filter(home =>
        home.property.bedrooms >= params.beds 
        && home.property.bathsFull >= params.baths 
        && params.price.minPrice <= home.listPrice && home.listPrice <= params.price.maxPrice
    )
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_HOMES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_HOMES_SUCCESS:
            return {
                ...state,
                homes: action.payload,
                filterParams: {...state.filterParams, search: action.search},
                loading: false
            }
        case GET_SINGLE_HOME_SUCCESS:
            return {
                ...state,
                home: action.payload,
                loading: false
            }
        case GET_HOMES_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case GET_SINGLE_HOME_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case CLEAR_HOMES:
            return {
                ...state,
                homes: [],
                loading: false
            }
        case FILTER_HOMES_BY_PRICE:
            filterParams = {...state.filterParams, price: action.payload}
            filteredHomes = filterHomes(state.homes, filterParams)
            filteredHomes.length === 0 ? results = false : results = true
            return {
                ...state,
                filteredHomes,
                filterParams,
                results
            }
        case FILTER_HOMES_BY_BEDS:
            filterParams = {...state.filterParams, beds: action.payload}
            filteredHomes = filterHomes(state.homes, filterParams)
            filteredHomes.length === 0 ? results = false : results = true
            return {
                ...state,
                filteredHomes,
                filterParams,
                results
            }
        case FILTER_HOMES_BY_BATHS:
            filterParams = {...state.filterParams, baths: action.payload}
            filteredHomes = filterHomes(state.homes, filterParams)
            filteredHomes.length === 0 ? results = false : results = true
            return {
                ...state,
                filteredHomes,
                filterParams,
                results
            }
        case SORT_HOMES_BY_PRICE_LH:
            filteredHomes = filteredHomes.sort((a,b) => a.listPrice - b.listPrice);
            sortedHomes = state.homes.sort((a,b) => a.listPrice - b.listPrice)
            return {
                ...state,
                homes: sortedHomes,
                filteredHomes
            }
        case SORT_HOMES_BY_PRICE_HL:
            sortedHomes = state.homes.sort((a,b) => b.listPrice - a.listPrice);
            filteredHomes = filteredHomes.sort((a,b) => b.listPrice - a.listPrice);
            return {
                ...state,
                homes: sortedHomes,
                filteredHomes
            }
        case SORT_HOMES_BY_DATE:
            sortedHomes = state.homes.sort((a,b) => new Date(a.listDate) - new Date(b.listDate)) 
            filteredHomes = filteredHomes.sort((a,b) => new Date(a.listDate) - new Date(b.listDate));
            return {
                ...state,
                homes: sortedHomes,
                filteredHomes
            }
        case SORT_HOMES_BY_BEDS:
            sortedHomes = state.homes.sort((a,b) => a.property.bedrooms - b.property.bedrooms).reverse();
            filteredHomes = filteredHomes.sort((a,b) => a.property.bedrooms - b.property.bedrooms).reverse();
            return {
                ...state,
                homes: sortedHomes,
                filteredHomes
            }
        case SORT_HOMES_BY_BATHS:
            sortedHomes = state.homes.sort((a,b) => a.property.bathsFull - b.property.bathsFull).reverse();
            filteredHomes = filteredHomes.sort((a,b) => a.property.bathsFull - b.property.bathsFull).reverse();
            return {
                ...state,
                homes: sortedHomes,
                filteredHomes
            }
        default:
            return state
    }
}