import {combineReducers, createStore} from "redux";
import serviceListReducer from "../reducers/service-list-reducer";
import editFormReducer from "../reducers/edit-form-reducer";

const reducer = combineReducers({
    servicesList: serviceListReducer,
    editForm: editFormReducer,
});

const store = createStore(reducer);

export default store;
