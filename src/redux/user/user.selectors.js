import {createSelector} from 'reselect'

const selectUser = state => state.user;

export const currUser = createSelector(
    [selectUser],
    user => user.currUser
)


