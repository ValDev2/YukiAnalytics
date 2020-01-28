import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { getMatieres } from '../../actions/matiere';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
const styles = {
  dashboard: {

  }
}


class Dashboard extends Component {

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.dashboard}>
        <Header />
        <SideBar />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  error: state.authentication.error,
  user: state.authentication.user,
  matieres: state.matieres.matieres
});


export default connect(mapStateToProps, { getMatieres })(withStyles(styles)(Dashboard));
