import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNotes } from "../action"
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class Home extends Component {
    componentDidMount() {
        this.props.fetchNotes();
    }
    render() {
        return (
          <div>
            <h1>Note App</h1>
                <Link to={`/addNote`}> Add a note</Link>
                <hr />
                {
                    this.props.noteList[0]
                        ? this.props.noteList[0].arr.map(note => (
                            <ListGroupItem key={note.noteId}>
                                <p>{note.body}</p>                                
                            </ListGroupItem>
                        ))
                        : null
                }
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        notes: state.notes,
        noteList: state.noteList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => dispatch(fetchNotes()),        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
