import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers"

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export const ADD_NOTE = "ADD_NOTE"
export const FETCH_NOTES = "FETCH_NOTES"

let nextNoteId = 0

export function addNote(text) {
    return {
        type: ADD_NOTE,
        id: nextNoteId++,
        text
    }
}

export function getNotes(arr) {
    return {
        type: FETCH_NOTES,
        arr
    }
}


//-------------- 
//     AJAX
//--------------


export function fetchNotes() {
    return function (dispatch) {
        return fetch("/api/Notes")
            .then(res => {                               
                return res.json()
            })
            .then(json => {
                dispatch(getNotes(json))
            })
    }   
}

