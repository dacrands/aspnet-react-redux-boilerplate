import { combineReducers } from 'redux'
import {
    ADD_NOTE,
    addNote
} from "./action.js"

const initialState = {
    notes: {}
}


function notes(state = {}, action) {
    if (action.type === ADD_NOTE) {
        let id = action.id
        return Object.assign({}, state, {            
            [id]: {
                id,
                text: action.text
            }
        })
    }
    return state
}

const noteApp = notes

export default noteApp