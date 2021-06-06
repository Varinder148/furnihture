import user from './user.types'

export const setUser=( currUser )=>({
    type   : user.SET_USER,
    payload: currUser
})

export const unsetUser= () =>({
    type : user.UNSET_USER
})

export const toggleSpinner=()=>({
    type: user.TOGGLE_SPINNER
})
