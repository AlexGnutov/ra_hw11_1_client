import {
    CHANGE_SERVICE_FIELD,
    DELETE_SERVICE_FAILURE,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    FETCH_SERVICES_FAILURE,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    LOAD_SERVICE_FAILURE,
    LOAD_SERVICE_REQUEST,
    LOAD_SERVICE_SUCCESS,
    SAVE_SERVICE_FAILURE,
    SAVE_SERVICE_REQUEST,
    SAVE_SERVICE_SUCCESS,
} from "./actions";

// Loading (list) AC
export const fetchServicesRequest = () => ({
    type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = message => ({
    type: FETCH_SERVICES_FAILURE,
    payload: {
        message,
    }
});

export const fetchServicesSuccess = items => ({
    type: FETCH_SERVICES_SUCCESS,
    payload: {
        items,
    }
});

// Loading (one) AC
export const loadServiceReq = () => ({
    type: LOAD_SERVICE_REQUEST,
});

export const loadServiceFail = message => ({
    type: LOAD_SERVICE_FAILURE,
    payload: {
        message,
    }
});

export const loadServiceOk = data => ({
    type: LOAD_SERVICE_SUCCESS,
    payload: {
        data,
    }
});

// Editing AC
export const changeServiceField = (name, value) => ({
    type: CHANGE_SERVICE_FIELD,
    payload: {
        name,
        value,
    }
});

// Saving AC
export const saveServiceReq = () => ({
    type: SAVE_SERVICE_REQUEST
});

export const saveServiceFail = message => ({
    type: SAVE_SERVICE_FAILURE,
    payload: {
        message,
    }
});

export const saveServiceOk = data => ({
    type: SAVE_SERVICE_SUCCESS,
    payload: {
        data,
    }
});

// Deleting AC
export const deleteServiceReq = (id) => ({
    type: DELETE_SERVICE_REQUEST,
    payload: {
        id,
    }
});

export const deleteServiceFail = message => ({
    type: DELETE_SERVICE_FAILURE,
    payload: {
        message,
    }
});

export const deleteServiceOk = () => ({
    type: DELETE_SERVICE_SUCCESS,
});

// Fetch list of services (no-thunk)
export const fetchServices = async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
        console.log('do fetch');
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/services`);
        if (!response.ok) {
            dispatch(fetchServicesFailure(response.statusText));
        }
        const data = await response.json();
        dispatch(fetchServicesSuccess(data));
    } catch (e) {
        dispatch(fetchServicesFailure(e.message));
    }
}

// Getting exact service (no-thunk)
export const loadService = async (dispatch, id) => {
    dispatch(loadServiceReq());
    try {
        console.log('do load', id);
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/services/${id}`);
        if (!response.ok) {
            dispatch(loadServiceFail(response.statusText));
        }
        const data = await response.json();
        dispatch(loadServiceOk(data));
    } catch (e) {
        dispatch(loadServiceFail(e.message));
    }
}

// Save Service Fetch Function (no-thunk)
export const saveService = async (dispatch, data, cb) => {
    dispatch(saveServiceReq());
    try {
        console.log('do post');
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/services`, {
            method: 'POST',
            body: JSON.stringify({...data}),
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
            dispatch(saveServiceFail(response.statusText));
            return;
        }
        dispatch(saveServiceOk());
        dispatch(fetchServicesRequest());
        cb();
    } catch (e) {
        dispatch(saveServiceFail(e.message));
    }
}

// Delete Service Function (no-thunk)
export const deleteService = async (dispatch, id) => {
    dispatch(deleteServiceReq(id));

    try {
        console.log('do delete');
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/services/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            dispatch(deleteServiceFail(response.statusText));
            return;
        }
        dispatch(deleteServiceOk());

        const update = await fetch(`${process.env.REACT_APP_API_URL}api/services`);
        if (!update.ok) {
            dispatch(fetchServicesFailure(update.statusText));
            return;
        }
        const data = await update.json();
        dispatch(fetchServicesSuccess(data));

    } catch (e) {
        dispatch(deleteServiceFail(e.message));
    }
}
