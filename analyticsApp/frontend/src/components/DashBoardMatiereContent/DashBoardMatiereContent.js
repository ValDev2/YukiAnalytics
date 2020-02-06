import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import LineChartCard from '../Card/LineChartCard';
import AddNoteCard from '../Card/AddNoteCard';
import ScoreStatsCard from '../Card/ScoreStatsCard';
import HoursStatsCard from '../Card/HoursStatsCard';
import NoteNumberCard from '../Card/NoteNumberCard';
import FeelingCard from '../Card/FeelingCard';

const styles = {
  DashBoardMatiereContent: {
    backgroundColor: "#f5f5f5",
    marginLeft: "250px",
    minHeight: "100vh",
    height: "100%",
    paddingTop: "60px",
  },
  wrapper: {
    padding: "40px",
    flexGrow: "1"
  },
  greedItem: {
    padding: "0 12px"
  }
}

class DashBoardMatiereContent extends Component {
  render(){
    const { classes, matiere } = this.props;
    return(
      <div className={classes.DashBoardMatiereContent}>
        <div className={classes.wrapper}>
            <Grid container
                  spacing={3}
            >
              <Grid item
                  sm={6}
              >
                <LineChartCard
                  title={matiere.nom}
                  data={matiere.notes}
                />
              </Grid>
              <Grid item sm={6}>
                <Grid container spacing={3}>
                  <Grid item sm={6} className={classes.greedItem}>
                    <ScoreStatsCard
                      perf={matiere.moyenne.perf}
                      moyenne={matiere.moyenne.moyenne}
                    />
                  </Grid>
                  <Grid item sm={6} className={classes.greedItem}>
                    <HoursStatsCard
                      totalTime={matiere.total_work_hour.total_work_hour}
                      perf={matiere.total_work_hour.perf}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <NoteNumberCard
                      noteNumber={matiere.notes.length}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <FeelingCard
                      perf={matiere.satisfaction.perf}
                      satisfaction={matiere.satisfaction.satisfaction}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>


            <Grid container
                  spacing={3}
            >
              <Grid item sm={6}>
                <AddNoteCard
                  title={matiere.nom}
                  matiereId={matiere.id}
                />
              </Grid>
            </Grid>


        </div>
      </div>
    )
  }
}


export default withStyles(styles)(DashBoardMatiereContent);
