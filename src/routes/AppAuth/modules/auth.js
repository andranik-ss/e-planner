import { fromJS } from 'immutable';
import auth from '../../../utils/auth';
import * as actionTypes from './actionTypes';


// The initial state of the App
const initialState = fromJS({
    formState: {
        email         : '',
        password      : '',
        repeatPassword: '',
        rememberMe    : false,
        displayName   : ''
    },
    currentUser          : null,
    message              : '',
    loggedIn             : auth.loggedIn(),
    sendEmailVerification: false
});

const AUTH_ACTION_HANDLERS = {
    [actionTypes.CHANGE_FORM]: (state, action) => {
        return state
            .setIn(['formState', action.name], action.value);
    },
    [actionTypes.SET_AUTH]: (state, action) => {
        return state
            .set('loggedIn', action.payload);
    },
    [actionTypes.SET_AUTH_INFO]: (state, action) => {
        return state
            .set('currentUser', fromJS(action.payload));
    },
    [actionTypes.SET_ERROR_MESSAGE]: (state, action) => {
        return state
            .set('message', action.error);
    },
    [actionTypes.REGISTER_VERIFICATION_SUCCESS]: (state) => {
        return state
            .set('sendEmailVerification', true);
    },
    [actionTypes.REGISTER_VERIFICATION_FAILURE]: (state, action) => {
        return state
            .set('sendEmailVerification', false)
            .set('message', action.error.message);
    }
};

export default function authReducer(state = initialState, action) {
    const handler = AUTH_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}