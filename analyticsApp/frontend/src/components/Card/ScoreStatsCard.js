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
  },
  UpArrow: {
    color: "#00E676",
    marginRight: "20px",
    fontSize: "15px"
  },
  DownArrow: {
    color: "red",
    marginRight: "20px",
    fontSize: "15px",
    transform: "rotate(180deg)"
  },
  Stat: {
    color: "#424242",
    fontWeight: "500",
    fontSize: "15px",
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
  },
  StatInfo: {
    color: "#b8b8b8",
    fontSize: "15px",
    marginLeft: "auto",
    alignSelf: "flex-end"
  }
}

class ScoreStatsCard extends Component {

  scoreToPercent(){
    return (this.props.moyenne/20)*100;
  }

  render(){
    const { classes, perf, moyenne } = this.props;
    console.log(this.props);
    return(
      <Paper className={classes.Card}>
        <span className={classes.CardTitle}>
          Votre Moyenne
        </span>
        <div className={classes.StatContent}>
          <div className={perf > 0 ? classes.UpArrow : classes.DownArrow}>
            <i class="fas fa-arrow-up"></i>
          </div>
          <div className={classes.Stat}>
            {perf > 0 && ('+')} { perf }
          </div>
          <div className={classes.StatInfo}>
            { moyenne }/20
          </div>
        </div>
        <div className={classes.CardFooter}>
          <LinearProgress
                  className={classes.ProgressBar}
                  variant="determinate"
                  value={this.scoreToPercent()}
          />
        </div>
      </Paper>
    )
  }
}


export default withStyles(styles)(ScoreStatsCard);
