export const START_CONTACTS_LOADING = 'START_CONTACTS_LOADING';
export const SUCCESS_CONTACTS_LOADING = 'SUCCESS_CONTACTS_LOADING';
export const ERROR_CONTACTS_LOADING = 'ERROR_CONTACTS_LOADING';
export const ESTABLISH_DESIRED_CONTACT = 'ESTABLISH_DESIRED_CONTACT';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
import {RSAA, getJSON} from 'redux-api-middleware';

export const updateContacts = () => ({
    [RSAA]: {
        endpoint: 'http://localhost:3000/contacts',
        method: 'GET',
        types: [
            START_CONTACTS_LOADING,
            {
                type: SUCCESS_CONTACTS_LOADING,
                payload: (action, state, response) => getJSON(response).then(response => response)
            },
            ERROR_CONTACTS_LOADING
        ]
    }
});

export const establishDesiredContact = (id) => ({
    type: ESTABLISH_DESIRED_CONTACT,
    id
});

export const setSearchValue = (value) => ({
    type: SET_SEARCH_VALUE,
    value
});