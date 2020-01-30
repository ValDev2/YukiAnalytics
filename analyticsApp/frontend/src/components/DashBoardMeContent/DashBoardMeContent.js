import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';


const styles = {
  DashBoardMeContent: {
    backgroundColor: "#f5f5f5",
    marginLeft: "250px",
    minHeight: "100vh",
    height: "100%",
    paddingTop: "60px",
    flexGrow: "1"
  },
  wrapper: {
    padding: "30px",
    display: "row"
  }
}

class DashBoardMeContent extends Component {
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.DashBoardMeContent}>
        <div className={classes.wrapper}>
          Me
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DashBoardMeContent);
