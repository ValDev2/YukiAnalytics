import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getNotes } from '../actions/notes.js';
import { withStyles } from '@material-ui/styles';
import Note from './Note.js';
import MatiereForm from './MatiereForm.js';
import Chart from './Chart.js';


const styles = {
  noteList: {
    padding: "20px",
    display: "flex"
  }
}

class NotesStream extends Component {

  componentDidMount(){
    this.props.getNotes();
  }

  render(){
    const {classes} = this.props;
    return(
      <div>
        <ul className={classes.noteList}>
          { this.props.notes.map( (note, index) => (
            <Note note={note.note}
                  coefficient={note.coefficient}
                  matiere={note.matiere_infos.nom}
                  key={index}
                  timestamp={note.timestamp}
            />
          ))}
        </ul>
        <Chart notes={this.props.notes}/>
        <MatiereForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes.notes
})


export default withStyles(styles)(connect(mapStateToProps, {getNotes})(NotesStream));
