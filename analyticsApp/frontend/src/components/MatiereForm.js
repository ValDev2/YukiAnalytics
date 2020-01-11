import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import { addMatiere } from '../actions/matiere.js';


const styles = {
  main : {

  }
}

class MatiereForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      nom: "",
      type: "",
      coefficient: "",
      difficulte: "Facile"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
    console.log(this.state);
  }

    handleSubmit = e => {
      e.preventDefault();
      let { nom, type, coefficient, difficulte } = this.state;
      coefficient = parseInt(coefficient);
      console.log("Ajout d'une matière ! ");
      this.props.addMatiere({
        nom,
        type,
        coefficient,
        difficulte,
        user: 1
      })
  }

  render(){

    const { classes } = this.props;

    return(
      <div className={classes.main}>
        <form>
          <label>Nom de la matière</label>
          <input name="nom" onChange={this.handleChange}/>
          <label>Type</label>
          <input name="type" onChange={this.handleChange}/>
          <label>coefficient</label>
          <input name="coefficient" onChange={this.handleChange}/>
          <label>Difficulte</label>
          <select name="difficulte" onChange={this.handleChange} value={this.state.difficulte}>
            <option value="FA">Facile</option>
            <option value="MO">Moyenne</option>
            <option value="DI">Difficile</option>
          </select>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}




export default withStyles(styles)(connect(null ,{addMatiere})(MatiereForm))
