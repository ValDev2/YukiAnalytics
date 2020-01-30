import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import NoteLineChart from '../Chart/NoteLineChart';

const styles = {
  Card: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  CardTitle: {
    marginBottom: "20px"
  }
}

class LineChartCard extends Component {

  render(){
    const { classes, title, data } = this.props;
    return(
      <Paper className={classes.Card}>
        <span className={classes.CardTitle}>
          {title}
        </span>
        <NoteLineChart
          dataset={data}
          title={title}
        />
      </Paper>
    )
  }
}


export default withStyles(styles)(LineChartCard);
