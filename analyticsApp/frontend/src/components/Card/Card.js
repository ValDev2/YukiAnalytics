import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import NoteLineChart from '../Chart/NoteLineChart';

const styles = {
  Card: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  }
}

class Card extends Component {

  render(){
    const { classes } = this.props;
    return(
      <Paper className={classes.Card}>
        <NoteLineChart />
      </Paper>
    )
  }
}


export default withStyles(styles)(Card);
