import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

const styles = {
  header: {
    height: "60px",
    width: "100%",
    display: "flex",
    backgroundColor: "#3c48a4",
    alignItems: "center"
  },
  headerWrapper: {
    maxWidth: "90%",
    margin: "0 auto",
    width: "100%"
  },
  headerContent: {
    display: "flex",
    justifyContent: "flex-end",
  },
  headerNavIconList: {
    display: "flex"
  },
  headerNavIcon: {
    fontSize: "18px",
    color: "#fff",
    marginLeft: "35px"
  }
}


class Header extends Component {

  render(){

    const { classes } = this.props

    return(
      <div className={classes.header}>
        <div className={classes.headerWrapper}>
          <div className={classes.headerContent}>
            <ul className={classes.headerNavIconList}>
              <li className={classes.headerNavIcon}>
                <i className="far fa-bell"></i>
              </li>
              <li className={classes.headerNavIcon}>
                <i className="fas fa-user"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Header);
