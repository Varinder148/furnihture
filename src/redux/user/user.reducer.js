import user from './user.types'

const INITIAL_STATE = {
    currUser: null,
    spinner:false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case user.SET_USER: return {
            ...state,
            currUser: action.payload
        }

        case user.UNSET_USER: return {
            ...state,
            currUser: null
        }

        case user.TOGGLE_SPINNER:return {
            ...state,
            spinner:!state.spinner
        }
        default: return state
    }
}

export default userReducer
