import update from 'react-addons-update';
import {AUTHORIZATION} from '../actions/authorizationActions';

const initialStore = {
    isUserAuthorized: false,
    currentUserName: '',
    currentUserSocialActivity: ''
};

export default function authorizationReducer(store = initialStore, action) {
    switch (action.type) {
        case AUTHORIZATION: {
            return update(store, {
                isUserAuthorized: {$set: true},
                currentUserName: {$set: action.userName},
                currentUserSocialActivity: {$set: action.userSocialActivity}
            });
        }
        default:
            return store;
    }
}
