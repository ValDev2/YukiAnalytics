import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import Chart from '../Chart/Chart';



const styles = {
  dashboard: {

  }
}


class Dashboard extends Component {
  render(){
    const { classes } = this.props
    return(
      <div className={classes.dashboard}>
        <h2>Hello I'm the Dashboard </h2>
        <NavLink to="/login">
          Login
        </NavLink>
        <Chart />
      </div>
    )
  }
}


export default connect()(withStyles(styles)(Dashboard));
