  import React, { Component } from "react";
import { connect } from 'react-redux';
import { addNote } from '../actions/notes.js';
import { get_all_matieres } from '../actions/matiere.js';

class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      note: "",
      coef: "",
      matiere: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.get_all_matieres();
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let { note, coef, matiere} = this.state;
    note = parseInt(note);
    coef = parseInt(coef);
    const matiere_id = this.props.matieres.find( item => item.nom === matiere).id;
    this.props.addNote({
      "note": note,
      "coefficient": coef,
      "matiere": matiere_id
    });
  }

  render(){
    return(
      <div>
        <h1>Ajouter une note</h1>
        <form>
          <label>Votre Note</label>
          <input name="note" onChange={this.handleChange}/>
          <label>Votre coef</label>
          <input name="coef" onChange={this.handleChange}/>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
          <select name="matiere"
                  onChange={this.handleChange}
                  value={this.state.matiere}>
            {
              this.props.matieres.map((matiere, index) => (
                <option
                  value={`${matiere.nom}`}
                  key={index}
                >
                  {matiere.nom}
                </option>
              ))
            }
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes.notes,
  matieres: state.matieres.matieres
})


export default connect(mapStateToProps, {addNote, get_all_matieres})(AddNote);
