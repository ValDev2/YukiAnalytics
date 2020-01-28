import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = {
  BrandLogo: {
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px"
  },
  SideBar: {
    maxWidth: "250px",
    width: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#2b2b2b"
  },
  SideBarContent: {
    color: "#b5b5b5"
  },
  ListItemText: {

  },
  ListItem: {
    margin: "5px 0",
    paddingTop: "5px",
    paddingBottom: "5px"
  },
  ListItemText: {
    fontSize: "16px"
  },
  subListItemText: {
    marginLeft: "20px",
    fontSize: "12px"
  }
};

const matiere_type = {
  Mathématiques: "calculator",
  Littérature: "pen-fancy",
  Physique: "atom",
  Biologie: "seedling",
  Histoire: "globe-europe",
  Langue: "language"
};


class SideBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      openMatieres: false
    }
    this.handleOpenMatieres = this.handleOpenMatieres.bind(this);
  }

  handleOpenMatieres(e){
    this.setState({openMatieres : !this.state.openMatieres});
  }

  render(){

    console.log(matiere_type["Mathématiques"])
    const { classes } = this.props;
    const { openMatieres } = this.state;
    return(
      <div className={classes.SideBar}>
        <div className={classes.BrandLogo}>
          <Link to="/">LOGO</Link>
        </div>
        <List disablePadding dense className={classes.SideBarContent}>
          <ListItem
            button
            dense
            className={classes.ListItem}
          >
            <ListItemText className={classes.ListItemText}>
              <i className="fas fa-home" style={{marginRight: "30px"}}></i>
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            button
            dense
            className={classes.ListItem}
          >
            <ListItemText className={classes.ListItemText}>
              <i className="fas fa-user" style={{marginRight: "30px"}}></i>
              Me
            </ListItemText>
          </ListItem>
          <ListItem
            button
            dense
            className={classes.ListItem}
            onClick={this.handleOpenMatieres}
          >
            <ListItemText className={classes.ListItemText}>
              <i className="fas fa-book" style={{marginRight: "30px"}}></i>
              Matieres
            </ListItemText>
            { openMatieres ? <ExpandLess /> : <ExpandMore/> }
          </ListItem>
          <Collapse in={openMatieres} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                this.props.matieres.map(mat => {
                  return (
                    <ListItem button>
                      <ListItemText
                        className={classes.subListItemText}
                        key={`${mat.id}`}
                      >
                        <i
                          className={`fas fa-${matiere_type[mat.type]}`}
                          style={{marginRight: "30px"}}
                        ></i>
                        {mat.nom}
                      </ListItemText>
                    </ListItem>
                  )
                })
              }
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    matieres: state.matieres.matieres,
    user: state.authentication.user
  }
)

export default connect(mapStateToProps)(withStyles(styles)(SideBar));
