import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { getMatieres } from '../../actions/matiere';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import DashBoardMatiereContent from '../DashBoardMatiereContent/DashBoardMatiereContent';
import DashBoardMeContent from '../DashBoardMeContent/DashBoardMeContent';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const styles = {
  dashboard: {

  },
  dashBoardContainer: {
    display: "flex"
  }
}

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      darkMode: false
    };
    this.updateMatieresData = this.updateMatieresData.bind(this);
  }

  updateMatieresData(){
    console.log("UPDATING THE MATIERE ! ");
    return this.props.getMatieres();
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.dashboard}>
        <Header />
        <SideBar matieres={this.props.matieres}/>
        <Switch>
          <Route exact path="/profile/me" render={() => <DashBoardMeContent />}/>
          <Route exact path="/matière/:slug"
                 render={ (routeProps) => <DashBoardMatiereContent
                                            {...routeProps}
                                            updateMatieres={this.updateMatieresData}
                                            matiere={this.props.matieres.find(mat => {
                                              return mat.slug === routeProps.match.params.slug
                                          })}
                                        /> }
          />
        </Switch>
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

const mapDispatchToProps = dispatch => ({
  getMatieres: () => dispatch(getMatieres())
})



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
