import { combineReducers } from 'redux'
import cartReducer from './cart/cart.reducer'
import userReducer from './user/user.reducer'

import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'


const persistConfig={
    key:'root',
    storage:storageSession
}
const rootReducer=combineReducers({
    cart: cartReducer,
    user: userReducer
})

export default persistReducer(persistConfig, rootReducer) 


