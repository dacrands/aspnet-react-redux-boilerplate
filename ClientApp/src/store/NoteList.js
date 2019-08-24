const addNoteType = 'ADD_NOTE';
const initialState = { notes: [] }

export const actionCreators = {
    addNote: () => ({ type: addNoteType })
}