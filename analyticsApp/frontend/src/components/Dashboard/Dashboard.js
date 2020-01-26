import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import Chart from '../Chart/Chart';
import { getMatieres } from '../../actions/matiere';

const styles = {
  dashboard: {

  }
}


class Dashboard extends Component {

  componentDidMount(){
    this.props.getMatieres()
  }

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

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  error: state.authentication.error,
  user: state.authentication.user
})


export default connect(null, { getMatieres })(withStyles(styles)(Dashboard));
