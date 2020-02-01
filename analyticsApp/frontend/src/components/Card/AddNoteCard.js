import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { addNote } from '../../actions/note';

const styles = {

}


class AddNoteCard extends Component {

  render(){
    const { classes, title } = this.props;
    return(
      <Paper className={classes.Card}>
        <button onClick={() => this.props.addNote()}>
          Add Note in {title}
        </button>
      </Paper>
    )
  }
}


export default connect(null, { addNote })(withStyles(styles)(AddNoteCard));
