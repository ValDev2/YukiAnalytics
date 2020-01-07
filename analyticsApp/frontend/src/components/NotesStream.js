import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getNotes } from '../actions/notes.js';


class NotesStream extends Component {

  componentDidMount(){
    this.props.getNotes();
  }

  render(){
    return(
      <div>
        <p>List</p>
        <ul>
          { this.props.notes.map( note => (
            <div>
              <p>{note.note} / 20</p>
              <p>{note.coefficient}</p>
              <p>{note.matiere.nom}</p>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes.notes
})


export default connect(mapStateToProps, {getNotes})(NotesStream);
