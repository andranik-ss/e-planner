import { fromJS } from 'immutable';


// ------------------------------------
// Constants
// ------------------------------------
export const SIDEBAR_OPEN_SET             = 'SIDEBAR_OPEN_SET';
export const SIDEBAR_DOCKED_SET           = 'SIDEBAR_DOCKED_SET';
export const SIDEBAR_PULL_RIGHT_SET       = 'SIDEBAR_PULL_RIGHT_SET';


// ------------------------------------
// Actions
// ------------------------------------
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

export const onChangeSide = (pullRight) => {
    return {
        type   : 'SIDEBAR_PULL_RIGHT_SET',
        payload: pullRight
    };
};


// The initial state of the App
const initialState = fromJS({
    sidebarOpen  : false,
    sidebarDocked: (window.innerWidth > 800),
    pullRight    : true
});

const APP_ACTION_HANDLERS = {
    [SIDEBAR_OPEN_SET]: (state, action) => {
        return state.set('sidebarOpen', action.payload);
    },
    [SIDEBAR_DOCKED_SET]: (state, action) => {
        return state.set('sidebarDocked', !action.payload);
    },
    [SIDEBAR_PULL_RIGHT_SET]: (state, action) => {
        return state.set('pullRight', action.payload);
    }
};

export default function sidebarReducer(state = initialState, action) {
    const handler = APP_ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
