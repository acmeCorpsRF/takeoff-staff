import update from 'react-addons-update';
import {
    SUCCESS_CONTACTS_LOADING,
    ESTABLISH_DESIRED_CONTACT,
    SET_SEARCH_VALUE
} from '../actions/personalAreaActions';

const initialStore = {
    userContacts: [],
    desiredContactId: 0,
    currentSearchString: ''
};

export default function personalAreaReducer(store = initialStore, action) {
    switch (action.type) {
        case SUCCESS_CONTACTS_LOADING: {
            return update(store, {
                userContacts: {$set: action.payload}
            });
        }
        case ESTABLISH_DESIRED_CONTACT: {
            return update(store, {
                desiredContactId: {$set: action.id}
            });
        }
        case SET_SEARCH_VALUE: {
            return update(store, {
                currentSearchString: {$set: action.value}
            });
        }
        default:
            return store;
    }
}
