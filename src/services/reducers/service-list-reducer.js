import {
    DELETE_SERVICE_FAILURE,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    FETCH_SERVICES_FAILURE,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
} from "../actions/actions";

const initialState = {
    items: [],
    loading: false,
    deleting: null,
    error: null,
};

export default function serviceListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICES_REQUEST:
            return {...state, loading: true, error: null};
        case (FETCH_SERVICES_FAILURE || DELETE_SERVICE_FAILURE):
            const {message} = action.payload;
            return {...state, loading: false, error: message};
        case FETCH_SERVICES_SUCCESS:
            const {items} = action.payload;
            return {...state, items, loading: false, error: null};

        case DELETE_SERVICE_REQUEST:
            return {...state, deleting: true, error: null};
        case DELETE_SERVICE_FAILURE: {
            const {message} = action.payload;
            return {...state, deleting: null, error: message};
        }
        case DELETE_SERVICE_SUCCESS:
            return {...state, deleting: null, error: null };

        default:
            return state;
    }
}
