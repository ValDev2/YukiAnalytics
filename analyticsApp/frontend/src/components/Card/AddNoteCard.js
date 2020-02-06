import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { addNote } from '../../actions/note';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = {
  Card: {
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 30px"
  },
  Form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px"
  },
  InputText: {
    marginBottom: "5px"
  }
};

class AddNoteCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      note: "",
      coefficient: "",
      error: ""
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
  }

  handleClickOpen = (e) => {
    e.preventDefault();
    this.setState({open: true});
  }

  handleInputChange = (e) => {
    (/^[0-9]{1,2}$/.test(e.target.value) || e.target.value === "") && this.setState({[e.target.name] : e.target.value});
    console.log(this.state);
  }

  handleClickClose = (e) => {
    e.preventDefault;
    this.setState({open: false})
  }

  handleAddNote = () => {
    const { note, coefficient } = this.state;
    const matiere_id = this.props.matiereId;
    (note && coefficient) && this.props.addNote(note, coefficient, matiere_id);
    this.setState({open: false});
  }

  render(){
    const { classes, title } = this.props;
    const { open, note, coefficient } = this.state;
    return(
      <Paper className={classes.Card}>
        <Button
          onClick={this.handleClickOpen}
          className={classes.Button}
          color="primary"
        >
          Ajouter une note !
        </Button>
        <Dialog
          open={open}
        >
          <DialogTitle>Ajouter une note en {title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ajoutez une note pour tracker vos performances.
            </DialogContentText>
            <div className={classes.Form}>
              <TextField
                id="standard-password-input"
                label="Note /20"
                name="note"
                placeholder=" /20"
                onChange={this.handleInputChange}
                value={note}
                className={classes.InputText}
              />
              <TextField
                id="standard-password-input"
                label="Coefficient"
                name="coefficient"
                onChange={this.handleInputChange}
                value={coefficient}
                className={classes.InputText}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={this.handleClickClose}
            >
              Annuler
            </Button>
            <Button
              color="primary"
              onClick={this.handleAddNote}
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}


export default connect(null, { addNote })(withStyles(styles)(AddNoteCard));
