import {combineReducers, createStore} from "redux";
import servicesListReducer from "../reducers/services-list-reducer";
import editPageReducer from "../reducers/edit-page-reducer";

const reducer = combineReducers({
    servicesList: servicesListReducer,
    editPage: editPageReducer,
});

const store = createStore(reducer);

export default store;
