import { combineReducers } from 'redux'
import {
    ADD_NOTE,
    FETCH_NOTES,
    addNote
} from "./action.js"

const initialState = {
    notes: {},
    notesList: [],
}

function noteList(state = [], action) {
    if (action.type === FETCH_NOTES) {     
        return [action];
    }
    return state;
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

const rootReducer = combineReducers({
    notes,
    noteList
})

export default rootReducer