import {createStore, combineReducers,  applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
 
//se importan los patos que se agreguen nuevos o componentes de reduux
import pedidosReducer from './pedidosDucks'
import productosReducer from './productosDucks'
import userReducer from './userDucks'
//en este objeto se van sumando los nuevos patos o objetos 
const rootReducer = combineReducers({
    pedidos: pedidosReducer,
    productos: productosReducer,
    logins:userReducer
})
 
export default function generateStore() {
    const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}
