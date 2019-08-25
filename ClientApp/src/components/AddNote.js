import React from "react"
import { connect } from 'react-redux';
import { postNote, addNote, fetchNotes, postNoteResult } from "../action"
import { ListGroup, ListGroupItem } from 'react-bootstrap'

let AddNote = props => {
    let input
    return (
        <div>
            <h1>Add a note</h1>
            <form                
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return
                    }
                    props.postNote(input.value);
                    input.value = ''
                }}
            >
                <div className="form-group">
                    <label for="note">Example textarea:</label>
                    <textarea required className="form-control" ref={node => (input = node)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <ListGroup style={{ marginTop: "2rem" }}>
                {
                    Object.keys(props.notes).map(p => (
                        <ListGroupItem>
                            <p>{props.notes[p].text}</p>                        
                        </ListGroupItem>
                    ))
                }
                </ListGroup>
            </form>
            <div>
                <h2>Existing notes</h2>
                <button className="btn" onClick={props.fetchNotes}>Fetch</button>
                <hr />
                {
                    props.noteList[0]
                    ? props.noteList[0].arr.map(note => (
                        <ListGroupItem>
                            <p>{note.body}</p>
                        </ListGroupItem>
                    ))
                    : null
                }
            </div>
        </div>
    )
}

function mapStateToProps (state){
    return {
        notes: state.notes,
        noteList: state.noteList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: note => dispatch(addNote(note)),
        fetchNotes: () => dispatch(fetchNotes()),
        postNote: note => dispatch(postNote(note))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNote)