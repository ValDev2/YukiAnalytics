import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import LineChartCard from '../Card/LineChartCard';
import AddNoteCard from '../Card/AddNoteCard';


const styles = {
  DashBoardMatiereContent: {
    backgroundColor: "#f5f5f5",
    marginLeft: "250px",
    minHeight: "100vh",
    height: "100%",
    paddingTop: "60px",
  },
  wrapper: {
    padding: "30px",
    flexGrow: "1"
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
                <Grid item
                    sm={6}
                >
                  <AddNoteCard
                    updateMatieres={this.props.updateMatieres}
                  />
                </Grid>
            </Grid>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(DashBoardMatiereContent);
