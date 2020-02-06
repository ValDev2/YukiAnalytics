import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import NoteLineChart from '../Chart/NoteLineChart';

const styles = {
  Card: {
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 30px",
    height: "100%"
  },
  CardTitle: {
    marginBottom: "17px",
    alignSelf: "self-start",
    fontWeight: "500"
  }
}

class LineChartCard extends Component {

  render(){
    const { classes, title, data } = this.props;
    return(
      <Paper className={classes.Card}>
        <span className={classes.CardTitle}>
          Graph en {title}
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
