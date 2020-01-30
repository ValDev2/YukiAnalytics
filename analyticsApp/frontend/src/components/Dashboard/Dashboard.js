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

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.dashboard}>
        <Header />
        <SideBar />
        <Switch>
          <Route exact path="/profile/me" render={() => <DashBoardMeContent />}/>
          <Route exact path="/matière/:slug"
                 render={ (routeProps) => <DashBoardMatiereContent
                                            {...routeProps}
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


export default connect(mapStateToProps, { getMatieres })(withStyles(styles)(Dashboard));
