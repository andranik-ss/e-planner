import Immutable from 'immutable';
import auth from '../../../utils/auth';

// ------------------------------------
// Constants
// ------------------------------------
export const APP_LOADING = 'APP_LOADING';

export const SENDING_REQUEST              = 'SENDING_REQUEST';
export const LOGIN_REQUEST                = 'LOGIN_REQUEST';
export const LOGIN_WITH_PROVIDER_REQUEST  = 'LOGIN_WITH_PROVIDER_REQUEST';
export const REGISTER_REQUEST             = 'REGISTER_REQUEST';
export const FETCH_USER_INFO_REQUEST      = 'FETCH_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_REQUEST     = 'UPDATE_USER_INFO_REQUEST';
export const CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST';
export const REQUEST_ERROR                = 'REQUEST_ERROR';
export const LOGOUT                       = 'LOGOUT';
export const SET_USER_INFO                = 'SET_USER_INFO';
export const SET_AUTH                     = 'SET_AUTH';
export const CHANGE_FORM                  = 'CHANGE_FORM';
export const SET_MESSAGE                  = 'SET_MESSAGE';
export const SIDEBAR_OPEN_SET             = 'SIDEBAR_OPEN_SET';
export const SIDEBAR_DOCKED_SET           = 'SIDEBAR_DOCKED_SET';

// ------------------------------------
// Actions
// ------------------------------------
/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changeForm(newFormState) {
    return { type: CHANGE_FORM, newFormState };
}

/**
 * Sets the message state
 * @param  {string} message The new text of the error message on the form
 */
export function setMesssage(message) {
    return { type: SET_MESSAGE, message };
}

/**
 * Tells the app we want to fetch a user info
 */
export function fetchUserInfoRequest() {
    return { type: FETCH_USER_INFO_REQUEST };
}

/**
 * Tells the app we want to update a user info
 */
export function updateUserInfoRequest(data) {
    return { type: UPDATE_USER_INFO_REQUEST, data};
}

/**
 * Tells the app we want to change a user password
 */
export function changeUserPwdRequest(newPassword) {
    return { type: CHANGE_USER_PASSWORD_REQUEST, newPassword };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginRequest(data) {
    return { type: LOGIN_REQUEST, data };
}

/**
 * Tells the app we want to log in a user
 * @param  {string} provider          The provider which selected user
 */
export function loginWithProviderRequest(provider) {
    return { type: LOGIN_WITH_PROVIDER_REQUEST, provider };
}

/**
 * Tells the app we want to logout
 */
export function logoutRequest() {
    return { type: LOGOUT };
}

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.email    The email of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerRequest(data) {
    return { type: REGISTER_REQUEST, data };
}

export const onSetOpen = (open) => {
    return {
        type   : 'SIDEBAR_OPEN_SET',
        payload: open
    };
};

export const onSetDocked = (docked) => {
    return {
        type   : 'SIDEBAR_DOCKED_SET',
        payload: docked
    };
};


// The initial state of the App
const initialState = Immutable.fromJS({
    sidebar: {
        sidebarOpen: false,
        sidebarDocked: false
    },
    formState: {
        email         : '',
        password      : '',
        repeatPassword: '',
        rememberMe    : false,
        displayName   : ''
    },
    loading         : false,
    currentlySending: false,
    message         : '',
    currentUser     : null,
    loggedIn        : auth.loggedIn()
});

const APP_ACTION_HANDLERS = {
    [APP_LOADING]: (state) => {
        return state
            .set('loading', true)
            .set('message', '');
    },
    [CHANGE_FORM]: (state, action) => {
        return state
            .set('formState', action.newFormState);
    },
    [SET_AUTH]: (state, action) => {
        return state
            .set('loggedIn', action.newAuthState);
    },
    [SENDING_REQUEST]: (state, action) => {
        return state
            .set('currentlySending', action.sending);
    },
    [SET_USER_INFO]: (state, action) => {
        return state
            .set('currentUser', action.userInfo);
    },
    [REQUEST_ERROR]: (state, action) => {
        return state
            .set('message', action.error);
    },
    [SET_MESSAGE]: (state, action) => {
        return state
            .set('message', action.message);
    },
    [SIDEBAR_OPEN_SET]: (state, action) => {
        return state.setIn(['sidebar', 'sidebarOpen'], action.payload);
    },
    [SIDEBAR_DOCKED_SET]: (state, action) => {
        return state.setIn(['sidebar', 'sidebarDocked'], !action.payload);
    }
};

export default function appReducer(state = initialState, action) {
    const handler = APP_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
