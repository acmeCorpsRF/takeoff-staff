import {combineReducers} from 'redux';
import authorizationReducer from './authorizationReducer';
import personalAreaReducer from './personalAreaReducer';

export default combineReducers({
    authorizationReducer,
    personalAreaReducer
});