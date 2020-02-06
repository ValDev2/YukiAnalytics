import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  CardTitle: {
    marginBottom: "17px",
    alignSelf: "self-start",
    fontSize: "17px",
    fontWeight: "400"
  },
  StatContent: {
    display: "flex",
    width: "100%",
    marginTop: "18px",
    justifyContent: "center"
  },
  Stat: {
    color: "#424242",
    fontWeight: "500",
    fontSize: "17px"
  },
  UpArrow: {
    color: "#00E676",
    marginRight: "20px",
    fontSize: "17px"
  },
  DownArrow: {
    color: "red",
    marginRight: "20px",
    fontSize: "17px",
    transform: "rotate(180deg)"
  },
  StatInfo: {
    color: "#b8b8b8",
    fontSize: "15px",
    marginLeft: "auto",
    alignSelf: "flex-end"
  },
  ProgressBar: {
    backgroundColor: "#eee",
    height: "5px",
    width: "100%",
    borderRadius: "20px"
  },
  CardFooter: {
    width: "100%",
    marginTop: "20px"
  }
}

class NoteNumberCard extends Component {
  render(){
    const { classes, noteNumber} = this.props;
    console.log(this.props);
    return(
      <Paper className={classes.Card}>
        <span className={classes.CardTitle}>
          Nombre de Notes
        </span>
        <div className={classes.StatContent}>
          <div className={classes.Stat}>
            { noteNumber }
          </div>
        </div>
        <div className={classes.CardFooter}>
          <LinearProgress
                  className={classes.ProgressBar}
                  variant="determinate"
                  value={100}
          />
        </div>
      </Paper>
    )
  }
}


export default withStyles(styles)(NoteNumberCard);
