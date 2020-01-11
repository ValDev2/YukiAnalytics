import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';


const styles = {
  main : {
    display: "flex",
    flexDirection: "column",
    border: "2px solid black",
    margin: "0 20px",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    borderRadius: "0.3em"
  }
}


class Note extends Component {

  render(){

    console.log(this.props)
    const { classes } = this.props
    return(
      <div className={classes.main}>
        <p>note : {this.props.note} / 20</p>
        <p>coef : {this.props.coefficient}</p>
        <p>{this.props.matiere}</p>
        <p id="date">{new Date(this.props.timestamp).toDateString()}</p>
      </div>
    )
  }
}

export default withStyles(styles)(Note);
