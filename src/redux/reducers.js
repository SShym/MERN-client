import { combineReducers } from "redux";

import { appReducer } from './reducers/appReducer';
import { userReducer } from './reducers/userReducer';
import { mainReducer } from './reducers/mainReducer';

export const reducers = combineReducers({
    appReducer,
    userReducer,
    mainReducer
})