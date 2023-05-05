import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import pokeReducer from './pokeDucks'

const rootReducer = combineReducers ({
    pokemones: pokeReducer,
   // autos: autoReducer ejemplo que no va
})

//configurar middleware dentro de generaStore
export default function generateStore () {
    const store = createStore (rootReducer,composeWithDevTools (applyMiddleware(thunk)) )
    return store;
}