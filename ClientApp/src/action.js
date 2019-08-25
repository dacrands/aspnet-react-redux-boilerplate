import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers"

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export const ADD_NOTE = "ADD_NOTE"
export const FETCH_NOTES = "FETCH_NOTES"
export const POST_NOTE = "POST_NOTE"

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

export function postNoteResult(bool) {
    return {
        type: POST_NOTE,
        result: bool
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
            .catch(e => console.error(e))
    }   
}

export function postNote(note) {
    return function (dispatch) {
        return fetch(
            "/api/Notes",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: note })
            },
        )
        .then(res => dispatch(postNoteResult(true)))
        .catch(err => dispatch(postNoteResult(false)))
    }
}