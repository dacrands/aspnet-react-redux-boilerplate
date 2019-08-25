import React from "react"
import { connect } from 'react-redux';
import { addNote } from "../action"

let AddNote = props => {
    let input
    return (
        <div>
            <h1>Add a note</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    props.addNote(input.value);
                    input.value = ''
                }}
            >
                <div className="form-group">
                    <label for="note">Example textarea:</label>
                    <textarea className="form-control" ref={node => (input = node)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {
                    Object.keys(props.notes).map(p => (
                        <p>{props.notes[p].text}</p>                        
                    ))
                }
            </form>
        </div>
    )
}

function mapStateToProps (state){
    return {
        notes: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: note => dispatch(addNote(note))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNote)