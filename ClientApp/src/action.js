export const ADD_NOTE = "ADD_NOTE"

let nextNoteId = 0

export function addNote(text) {
    return {
        type: ADD_NOTE,
        id: nextNoteId++,
        text
    }
}