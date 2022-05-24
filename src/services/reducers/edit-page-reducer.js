import {
    LOAD_SERVICE_FAILURE,
    LOAD_SERVICE_REQUEST,
    LOAD_SERVICE_SUCCESS, SAVE_SERVICE_FAILURE,
    SAVE_SERVICE_REQUEST, SAVE_SERVICE_SUCCESS
} from "../actions/actions";

const initialState = {
    id: null,
    name: '',
    price: '',
    content: '',
    loading: true,
    error: null,
}

export default function editPageReducer(state = initialState, action) {
    switch (action.type) {
        /*Loading data*/
        case LOAD_SERVICE_REQUEST:
            return { ...initialState, loading: true, error: null };
        case LOAD_SERVICE_FAILURE: {
            const { message } = action.payload;
            return { ...state, loading: false, error: message};
        }
        case LOAD_SERVICE_SUCCESS:
            const {data} = action.payload;
            return {...state, ...data, loading: false, error: null};

        /*Saving data*/
        case SAVE_SERVICE_REQUEST:
            return { ...state, error: null };
        case SAVE_SERVICE_FAILURE: {
            const { message } = action.payload;
            return { ...state, error: message }
        }
        case SAVE_SERVICE_SUCCESS:
            return { ...initialState, loading: true }
        default:
            return state;
    }
}
